/* =========================================================
   Passo Certo | interações da home
   1. Ajustes de leitura (tamanho da letra e alto contraste)
   2. Leitura em voz alta
   3. Menu e painel de ajustes no celular
   ========================================================= */
(function () {
  'use strict';

  var raiz = document.documentElement;
  var aviso = document.getElementById('aviso');
  var ESCALAS = [1, 1.125, 1.25, 1.375];
  var CHAVE = 'passo-certo:preferencias';
  var estado = { escala: 0, contraste: false };

  /* Mensagem para o leitor de tela (região aria-live) */
  function anunciar(mensagem) {
    aviso.textContent = '';
    window.setTimeout(function () { aviso.textContent = mensagem; }, 60);
  }

  function todos(seletor) {
    return Array.prototype.slice.call(document.querySelectorAll(seletor));
  }

  /* ---------- 1. Ajustes de leitura ---------- */

  function carregarPreferencias() {
    try {
      var salvo = JSON.parse(window.localStorage.getItem(CHAVE));
      if (salvo) {
        var escala = parseInt(salvo.escala, 10);
        estado.escala = isNaN(escala) ? 0 : Math.min(Math.max(escala, 0), ESCALAS.length - 1);
        estado.contraste = Boolean(salvo.contraste);
      }
    } catch (erro) {
      /* Sem acesso ao armazenamento: segue com o padrão */
    }
  }

  function salvarPreferencias() {
    try {
      window.localStorage.setItem(CHAVE, JSON.stringify(estado));
    } catch (erro) {
      /* Se não der para salvar, o ajuste vale só nesta visita */
    }
  }

  function aplicarPreferencias() {
    raiz.style.setProperty('--escala', ESCALAS[estado.escala]);
    raiz.setAttribute('data-contraste', estado.contraste ? 'alto' : 'normal');

    todos('[data-acao="letra-maior"]').forEach(function (botao) {
      botao.setAttribute('aria-checked', String(estado.escala > 0));
    });
    todos('[data-acao="contraste"]').forEach(function (botao) {
      var atributo = botao.getAttribute('role') === 'switch' ? 'aria-checked' : 'aria-pressed';
      botao.setAttribute(atributo, String(estado.contraste));
    });
    todos('[data-acao="aumentar"]').forEach(function (botao) {
      botao.setAttribute('aria-disabled', String(estado.escala === ESCALAS.length - 1));
    });
    todos('[data-acao="diminuir"]').forEach(function (botao) {
      botao.setAttribute('aria-disabled', String(estado.escala === 0));
    });
    verificarCabecalho();
  }

  /* Com letra grande, o menu do desktop pode não caber.
     Nesse caso o cabeçalho passa a usar os botões Aa e Menu, como no celular. */
  function verificarCabecalho() {
    raiz.classList.remove('menu-compacto');
    var linhas = todos('.nav-linha, .barra-acess__linha');
    var naoCabe = linhas.some(function (linha) {
      if (linha.offsetParent === null) return false;
      var estilo = window.getComputedStyle(linha);
      var disponivel = linha.clientWidth - parseFloat(estilo.paddingLeft) - parseFloat(estilo.paddingRight);
      var filhos = Array.prototype.slice.call(linha.children).filter(function (f) { return f.offsetParent !== null; });
      var necessario = filhos.reduce(function (soma, f) { return soma + f.scrollWidth; }, 0) +
        (parseFloat(estilo.columnGap) || 0) * Math.max(filhos.length - 1, 0);
      return necessario > disponivel;
    });
    if (naoCabe) raiz.classList.add('menu-compacto');
  }

  function mudarEscala(novaEscala) {
    var limite = Math.min(Math.max(novaEscala, 0), ESCALAS.length - 1);
    if (limite === estado.escala) {
      anunciar(limite === 0 ? 'A letra já está no menor tamanho.' : 'A letra já está no maior tamanho.');
      return;
    }
    var aumentou = limite > estado.escala;
    estado.escala = limite;
    aplicarPreferencias();
    salvarPreferencias();
    anunciar(aumentou ? 'Letra aumentada.' : 'Letra diminuída.');
  }

  function alternarContraste() {
    estado.contraste = !estado.contraste;
    aplicarPreferencias();
    salvarPreferencias();
    anunciar(estado.contraste ? 'Alto contraste ativado.' : 'Contraste normal ativado.');
  }

  /* ---------- 2. Leitura em voz alta ---------- */

  var voz = 'speechSynthesis' in window ? window.speechSynthesis : null;
  var modoLeitura = null;
  var falaAtual = null;

  function textosDaPagina(modo) {
    var seletor = modo === 'ouvir-passo' ? '#titulo-passo, #texto-passo' :
      '#conteudo h1, #conteudo h2, #conteudo h3, #conteudo h4, #conteudo p, #conteudo li strong, #conteudo small';
    return todos(seletor)
      .filter(function (el) {
        return el.offsetParent !== null && !el.closest('[aria-hidden="true"]');
      })
      .map(function (el) { return el.textContent.replace(/\s+/g, ' ').trim(); })
      .filter(Boolean);
  }

  function vozEmPortugues() {
    var vozes = voz.getVoices();
    return vozes.filter(function (v) { return v.lang === 'pt-BR'; })[0] ||
      vozes.filter(function (v) { return v.lang && v.lang.indexOf('pt') === 0; })[0] ||
      null;
  }

  function atualizarBotoesOuvir() {
    todos('[data-acao="ouvir"], [data-acao="ouvir-passo"]').forEach(function (botao) {
      var lendo = botao.dataset.acao === modoLeitura;
      var atributo = botao.getAttribute('role') === 'switch' ? 'aria-checked' : 'aria-pressed';
      botao.setAttribute(atributo, String(lendo));
      var rotulo = botao.querySelector('[data-rotulo]');
      if (rotulo) {
        rotulo.textContent = lendo ? rotulo.getAttribute('data-rotulo-parar') : rotulo.getAttribute('data-rotulo');
      }
    });
  }

  function pararLeitura(avisar) {
    var ativa = falaAtual;
    falaAtual = null;
    modoLeitura = null;
    if (ativa) voz.cancel();
    atualizarBotoesOuvir();
    if (avisar) anunciar('Leitura parada.');
  }

  function alternarLeitura(modo) {
    if (modoLeitura === modo) {
      pararLeitura(true);
      return;
    }
    pararLeitura(false);
    if (!voz || !window.SpeechSynthesisUtterance) {
      anunciar('Leitura em voz alta indisponível neste navegador.');
      return;
    }
    var trechos = textosDaPagina(modo);
    if (!trechos.length) {
      anunciar('Nenhum texto disponível para leitura.');
      return;
    }
    var vozPt = vozEmPortugues();
    modoLeitura = modo;
    atualizarBotoesOuvir();

    function falar(indice) {
      var fala = new SpeechSynthesisUtterance(trechos[indice]);
      falaAtual = fala;
      fala.lang = 'pt-BR';
      fala.rate = 0.9;
      if (vozPt) fala.voice = vozPt;
      fala.onend = function () {
        if (falaAtual !== fala) return;
        falaAtual = null;
        if (indice + 1 < trechos.length) falar(indice + 1);
        else pararLeitura(false);
      };
      fala.onerror = function () {
        if (falaAtual !== fala) return;
        falaAtual = null;
        pararLeitura(false);
        anunciar('Não foi possível reproduzir a leitura neste navegador.');
      };
      voz.speak(fala);
    }

    anunciar('Leitura iniciada.');
    falar(0);
  }

  /* ---------- 3. Menu e painel de ajustes ---------- */

  var aberto = null;
  var gatilhoAnterior = null;
  var SELETOR_FOCAVEL = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

  function focaveis(container) {
    return Array.prototype.slice.call(container.querySelectorAll(SELETOR_FOCAVEL))
      .filter(function (el) { return el.offsetParent !== null; });
  }

  function gatilhosDe(painel) {
    return todos('[aria-controls="' + painel.id + '"]');
  }

  function abrirPainel(painel, gatilho) {
    if (aberto) fecharPainel(false);
    gatilhoAnterior = gatilho || document.activeElement;
    painel.hidden = false;
    document.body.classList.add('sem-rolagem');
    gatilhosDe(painel).forEach(function (g) { g.setAttribute('aria-expanded', 'true'); });
    aberto = painel;

    /* O próximo quadro garante que a animação de entrada aconteça */
    window.requestAnimationFrame(function () {
      painel.classList.add('aberto');
      var primeiro = focaveis(painel)[0];
      if (primeiro) primeiro.focus();
    });
  }

  function fecharPainel(devolverFoco) {
    if (!aberto) return;
    var painel = aberto;
    painel.classList.remove('aberto');
    painel.hidden = true;
    document.body.classList.remove('sem-rolagem');
    gatilhosDe(painel).forEach(function (g) { g.setAttribute('aria-expanded', 'false'); });
    aberto = null;
    if (devolverFoco !== false && gatilhoAnterior && document.body.contains(gatilhoAnterior)) {
      gatilhoAnterior.focus();
    }
  }

  /* Mantém o foco do teclado dentro do painel aberto */
  function prenderFoco(evento) {
    if (!aberto || evento.key !== 'Tab') return;
    var lista = focaveis(aberto);
    if (!lista.length) return;
    var primeiro = lista[0];
    var ultimo = lista[lista.length - 1];
    if (evento.shiftKey && document.activeElement === primeiro) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
      evento.preventDefault();
      primeiro.focus();
    }
  }

  /* ---------- Cliques e teclado ---------- */

  document.addEventListener('click', function (evento) {
    var alvo = evento.target.closest('[data-acao]');

    /* Link do menu leva para outra parte: fecha o menu antes */
    if (!alvo) {
      if (aberto && evento.target.closest('.menu-lista a')) fecharPainel(false);
      return;
    }

    if (alvo.getAttribute('aria-disabled') === 'true') {
      evento.preventDefault();
      var acaoBloqueada = alvo.getAttribute('data-acao');
      anunciar(acaoBloqueada === 'aumentar' ? 'A letra já está no maior tamanho.' : 'A letra já está no menor tamanho.');
      return;
    }

    switch (alvo.getAttribute('data-acao')) {
      case 'aumentar': mudarEscala(estado.escala + 1); break;
      case 'diminuir': mudarEscala(estado.escala - 1); break;
      case 'letra-maior': mudarEscala(estado.escala > 0 ? 0 : 2); break;
      case 'contraste': alternarContraste(); break;
      case 'ouvir':
      case 'ouvir-passo': alternarLeitura(alvo.dataset.acao); break;
      case 'abrir': {
        var painel = document.getElementById(alvo.getAttribute('aria-controls'));
        if (painel === aberto) fecharPainel();
        else abrirPainel(painel, alvo);
        break;
      }
      case 'fechar': fecharPainel(); break;
    }
  });

  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && aberto) {
      evento.preventDefault();
      fecharPainel();
      return;
    }
    if (evento.key === 'Escape' && modoLeitura) {
      pararLeitura(true);
      return;
    }
    prenderFoco(evento);
  });

  /* Se a tela ficar larga com o menu aberto (celular girado, janela maior), o menu fecha */
  var telaLarga = window.matchMedia('(min-width: 1101px)');
  function aoMudarTela(mudanca) {
    verificarCabecalho();
    if (mudanca.matches && aberto && !raiz.classList.contains('menu-compacto')) fecharPainel(false);
  }

  var esperaRedimensionar = null;
  window.addEventListener('resize', function () {
    window.cancelAnimationFrame(esperaRedimensionar);
    esperaRedimensionar = window.requestAnimationFrame(verificarCabecalho);
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(verificarCabecalho);
  if (telaLarga.addEventListener) telaLarga.addEventListener('change', aoMudarTela);
  else if (telaLarga.addListener) telaLarga.addListener(aoMudarTela);

  /* Para a leitura ao sair da página */
  window.addEventListener('pagehide', function () { pararLeitura(false); });

  /* ---------- Início ---------- */
  carregarPreferencias();
  aplicarPreferencias();
  atualizarBotoesOuvir();

  /* Outras páginas, como a Praticar, usam o mesmo aviso e a mesma leitura */
  window.PassoCerto = {
    anunciar: anunciar,
    pararLeitura: pararLeitura
  };
})();