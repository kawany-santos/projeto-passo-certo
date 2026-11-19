/* =========================================================
   Passo Certo | interações da página Praticar
   1. Abas Agendamento e É golpe ou não é?
   2. Formulário de treino: máscara, erros e resumo
   3. Revisão e mensagem de sucesso do treino
   4. Quiz de golpes
   ========================================================= */
(function () {
  'use strict';

  var aviso = document.getElementById('aviso');

  function anunciar(mensagem) {
    if (window.PassoCerto && window.PassoCerto.anunciar) {
      window.PassoCerto.anunciar(mensagem);
      return;
    }
    if (!aviso) return;
    aviso.textContent = '';
    window.setTimeout(function () { aviso.textContent = mensagem; }, 60);
  }

  function pararLeitura() {
    if (window.PassoCerto && window.PassoCerto.pararLeitura) window.PassoCerto.pararLeitura(false);
    else if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }

  /* =======================================================
     1. Abas
     ======================================================= */

  var abas = Array.prototype.slice.call(document.querySelectorAll('.aba'));

  function trocarAba(indice, focar) {
    pararLeitura();
    abas.forEach(function (aba, posicao) {
      var ativa = posicao === indice;
      aba.setAttribute('aria-selected', String(ativa));
      aba.tabIndex = ativa ? 0 : -1;
      var painel = document.getElementById(aba.getAttribute('aria-controls'));
      if (painel) painel.hidden = !ativa;
    });

    var atual = abas[indice].id === 'aba-golpe' ? 'golpe' : 'agendamento';
    Array.prototype.slice.call(document.querySelectorAll('[data-aba]')).forEach(function (cartao) {
      cartao.hidden = cartao.getAttribute('data-aba') !== atual;
    });

    if (focar) abas[indice].focus();
    anunciar(abas[indice].textContent.trim() + ' selecionado.');
  }

  if (abas.length) {
    abas.forEach(function (aba, posicao) {
      aba.tabIndex = posicao === 0 ? 0 : -1;
      aba.addEventListener('click', function () { trocarAba(posicao, false); });
    });

    document.querySelector('.abas').addEventListener('keydown', function (evento) {
      var passo = 0;
      if (evento.key === 'ArrowRight' || evento.key === 'ArrowDown') passo = 1;
      else if (evento.key === 'ArrowLeft' || evento.key === 'ArrowUp') passo = -1;
      else if (evento.key === 'Home') passo = -abas.length;
      else if (evento.key === 'End') passo = abas.length;
      else return;
      evento.preventDefault();
      var atual = abas.indexOf(document.activeElement);
      if (atual < 0) atual = 0;
      var alvo = (atual + passo + abas.length * 2) % abas.length;
      if (evento.key === 'Home') alvo = 0;
      if (evento.key === 'End') alvo = abas.length - 1;
      trocarAba(alvo, true);
    });
  }

  /* =======================================================
     2. Formulário de treino
     ======================================================= */

  var form = document.getElementById('form-treino');
  var campoNome = document.getElementById('nome');
  var campoCpf = document.getElementById('cpf');
  var blocoNome = campoNome ? campoNome.closest('.campo') : null;
  var blocoCpf = campoCpf ? campoCpf.closest('.campo') : null;
  var msgNome = document.getElementById('nome-msg');
  var msgCpf = document.getElementById('cpf-msg');
  var msgAtendimento = document.getElementById('atendimento-msg');
  var msgDia = document.getElementById('dia-msg');
  var msgHorario = document.getElementById('horario-msg');
  var alerta = document.getElementById('alerta-form');
  var alertaTitulo = document.getElementById('alerta-titulo');

  function formatarCpf(texto) {
    var digitos = texto.replace(/\D/g, '').slice(0, 11);
    if (digitos.length <= 3) return digitos;
    if (digitos.length <= 6) return digitos.slice(0, 3) + '.' + digitos.slice(3);
    if (digitos.length <= 9) return digitos.slice(0, 3) + '.' + digitos.slice(3, 6) + '.' + digitos.slice(6);
    return digitos.slice(0, 3) + '.' + digitos.slice(3, 6) + '.' + digitos.slice(6, 9) + '-' + digitos.slice(9);
  }

  function resultadoNome() {
    var valor = campoNome.value.trim();
    if (!valor) return { estado: 'erro', mensagem: 'Escreva seu nome completo.' };
    if (valor.split(/\s+/).length < 2) return { estado: 'erro', mensagem: 'Escreva também o seu sobrenome.' };
    return { estado: 'ok', mensagem: 'Nome completo preenchido.' };
  }

  function resultadoCpf() {
    var digitos = campoCpf.value.replace(/\D/g, '');
    if (!digitos) return { estado: 'erro', mensagem: 'Escreva um CPF de treino.' };
    if (digitos.length !== 11) return { estado: 'erro', mensagem: 'O CPF de treino precisa ter 11 números.' };
    return { estado: 'ok', mensagem: 'CPF de treino certo.' };
  }

  function pintarCampo(bloco, caixaMensagem, resultado) {
    bloco.setAttribute('data-estado', resultado.estado);
    caixaMensagem.textContent = resultado.mensagem;
  }

  function validarNome() { if (!blocoNome) return; pintarCampo(blocoNome, msgNome, resultadoNome()); }
  function validarCpf() { if (!blocoCpf) return; pintarCampo(blocoCpf, msgCpf, resultadoCpf()); }

  function marcado(nome) { return form ? form.querySelector('input[name="' + nome + '"]:checked') : null; }

  function rotuloDe(nome) {
    var escolhido = marcado(nome);
    return escolhido ? escolhido.getAttribute('data-rotulo') : '';
  }

  function atualizarResumo() {
    [['atendimento', 'resumo-atendimento'], ['dia', 'resumo-dia'], ['horario', 'resumo-horario']]
      .forEach(function (par) {
        var destino = document.getElementById(par[1]);
        if (!destino) return;
        var valor = rotuloDe(par[0]);
        destino.textContent = valor || 'Falta escolher';
        if (valor) destino.removeAttribute('data-vazio');
        else destino.setAttribute('data-vazio', 'true');
      });
  }

  function mostrarMensagemGrupo(elemento, texto) {
    if (!elemento) return;
    elemento.textContent = texto || '';
    if (texto) elemento.setAttribute('data-tipo', 'erro');
    else elemento.removeAttribute('data-tipo');
  }

  function marcarGrupo(seletor, comErro) {
    var grupo = form ? form.querySelector(seletor) : null;
    if (grupo) grupo.setAttribute('data-erro', comErro ? 'true' : 'false');
  }

  if (campoNome && campoCpf && form) {
    campoCpf.addEventListener('input', function () {
      var posicaoNoFim = campoCpf.selectionStart === campoCpf.value.length;
      campoCpf.value = formatarCpf(campoCpf.value);
      if (posicaoNoFim) campoCpf.setSelectionRange(campoCpf.value.length, campoCpf.value.length);
      if (blocoCpf.getAttribute('data-estado')) validarCpf();
      else if (campoCpf.value.replace(/\D/g, '').length === 11) validarCpf();
    });

    campoNome.addEventListener('input', function () {
      if (blocoNome.getAttribute('data-estado')) validarNome();
    });
    campoNome.addEventListener('blur', validarNome);
    campoCpf.addEventListener('blur', validarCpf);

    form.addEventListener('change', function (evento) {
      if (evento.target.type !== 'radio') return;
      atualizarResumo();
      /* Depois de um erro, a mensagem some assim que a pessoa escolhe */
      if (evento.target.name === 'atendimento') {
        marcarGrupo('[data-grupo="atendimento"]', false);
        mostrarMensagemGrupo(msgAtendimento, '');
      }
      if (evento.target.name === 'dia') {
        marcarGrupo('[data-grupo="dia"]', false);
        mostrarMensagemGrupo(msgDia, '');
      }
      if (evento.target.name === 'horario') {
        marcarGrupo('[data-grupo="horario"]', false);
        mostrarMensagemGrupo(msgHorario, '');
      }
    });

    campoNome.addEventListener('keydown', function (evento) {
      if (evento.key === 'Enter') { evento.preventDefault(); form.requestSubmit(); }
    });
    campoCpf.addEventListener('keydown', function (evento) {
      if (evento.key === 'Enter') { evento.preventDefault(); form.requestSubmit(); }
    });
  }

  /* ---------- Telas do cartão ---------- */
  var telas = {
    formulario: document.getElementById('tela-formulario'),
    revisao: document.getElementById('tela-revisao'),
    sucesso: document.getElementById('tela-sucesso')
  };

  function mostrarTela(nome, focar) {
    Object.keys(telas).forEach(function (chave) {
      if (telas[chave]) telas[chave].hidden = chave !== nome;
    });
    if (focar === false) return;
    var alvo = telas[nome] ? telas[nome].querySelector('.tela__titulo') : null;
    if (alvo) {
      alvo.setAttribute('tabindex', '-1');
      alvo.focus();
    }
  }

  function montarLista(destino, linhas) {
    if (!destino) return;
    destino.textContent = '';
    linhas.forEach(function (linha) {
      var item = document.createElement('div');
      var rotulo = document.createElement('dt');
      var valor = document.createElement('dd');
      rotulo.textContent = linha[0];
      valor.textContent = linha[1];
      item.appendChild(rotulo);
      item.appendChild(valor);
      destino.appendChild(item);
    });
  }

  function codigoDoTreino() {
    return 'PC-' + String(Math.floor(1000 + Math.random() * 9000));
  }

  var revisaoDados = document.getElementById('revisao-dados');
  var sucessoDados = document.getElementById('sucesso-dados');
  var btnConfirmar = document.getElementById('btn-confirmar');
  var btnCorrigir = document.getElementById('btn-corrigir');
  var btnRecomecar = document.getElementById('btn-recomecar');
  var painelAgendamento = document.getElementById('painel-agendamento');

  if (form) {
    form.addEventListener('submit', function (evento) {
      evento.preventDefault();

      var nome = resultadoNome();
      var cpf = resultadoCpf();
      pintarCampo(blocoNome, msgNome, nome);
      pintarCampo(blocoCpf, msgCpf, cpf);

      var faltaAtendimento = !marcado('atendimento');
      var faltaDia = !marcado('dia');
      var faltaHorario = !marcado('horario');

      marcarGrupo('[data-grupo="atendimento"]', faltaAtendimento);
      marcarGrupo('[data-grupo="dia"]', faltaDia);
      marcarGrupo('[data-grupo="horario"]', faltaHorario);
      mostrarMensagemGrupo(msgAtendimento, faltaAtendimento ? 'Escolha um atendimento.' : '');
      mostrarMensagemGrupo(msgDia, faltaDia ? 'Escolha um dia.' : '');
      mostrarMensagemGrupo(msgHorario, faltaHorario ? 'Escolha um horário livre. Os horários em cinza estão ocupados.' : '');

      var total = (nome.estado === 'erro' ? 1 : 0) + (cpf.estado === 'erro' ? 1 : 0) +
        (faltaAtendimento ? 1 : 0) + (faltaDia ? 1 : 0) + (faltaHorario ? 1 : 0);

      if (total > 0) {
        alerta.hidden = false;
        alertaTitulo.textContent = total === 1 ? 'Falta 1 informação' : 'Faltam ' + total + ' informações';

        var primeiro = nome.estado === 'erro' ? campoNome
          : cpf.estado === 'erro' ? campoCpf
          : faltaAtendimento ? form.querySelector('input[name="atendimento"]')
          : faltaDia ? form.querySelector('input[name="dia"]')
          : form.querySelector('input[name="horario"]:not(:disabled)');
        if (primeiro) primeiro.focus();

        anunciar(alertaTitulo.textContent + '. Veja as mensagens abaixo de cada campo.');
        return;
      }

      alerta.hidden = true;

      var local = 'Unidade de Saúde Vila Esperança';
      montarLista(revisaoDados, [
        ['Nome', campoNome.value.trim()],
        ['CPF de treino', campoCpf.value],
        ['Atendimento', rotuloDe('atendimento')],
        ['Dia', rotuloDe('dia')],
        ['Horário', rotuloDe('horario')],
        ['Local', local]
      ]);

      mostrarTela('revisao');
      anunciar('Confira seus dados antes de confirmar.');
    });
  }

  if (btnCorrigir) {
    btnCorrigir.addEventListener('click', function () {
      mostrarTela('formulario', false);
      if (campoNome) campoNome.focus();
      anunciar('Corrija o que precisar e toque em Revisar meus dados.');
    });
  }

  if (btnConfirmar && painelAgendamento) {
    btnConfirmar.addEventListener('click', function () {
      btnConfirmar.disabled = true;
      btnConfirmar.textContent = 'Confirmando…';
      painelAgendamento.setAttribute('aria-busy', 'true');

      window.setTimeout(function () {
        btnConfirmar.disabled = false;
        btnConfirmar.textContent = 'Confirmar treino';
        painelAgendamento.removeAttribute('aria-busy');

        montarLista(sucessoDados, [
          ['Nome', campoNome.value.trim()],
          ['Atendimento', rotuloDe('atendimento')],
          ['Dia', rotuloDe('dia')],
          ['Horário', rotuloDe('horario')],
          ['Local', 'Unidade de Saúde Vila Esperança'],
          ['Código do treino', codigoDoTreino()]
        ]);

        progressoLocal.registrarAgendamento();
        mostrarTela('sucesso');
        anunciar('Treino concluído. O atendimento de treino foi marcado e nada foi enviado de verdade.');
      }, 700);
    });
  }

  function limparFormulario() {
    if (!form) return;
    form.reset();
    [blocoNome, blocoCpf].forEach(function (bloco) {
      if (bloco) bloco.removeAttribute('data-estado');
    });
    [msgNome, msgCpf, msgAtendimento, msgDia, msgHorario].forEach(function (elemento) {
      if (!elemento) return;
      elemento.textContent = '';
      elemento.removeAttribute('data-tipo');
    });
    marcarGrupo('[data-grupo="atendimento"]', false);
    marcarGrupo('[data-grupo="dia"]', false);
    marcarGrupo('[data-grupo="horario"]', false);
    if (alerta) alerta.hidden = true;
    atualizarResumo();
  }

  if (btnRecomecar) {
    btnRecomecar.addEventListener('click', function () {
      limparFormulario();
      mostrarTela('formulario', false);
      if (campoNome) campoNome.focus();
      anunciar('Treino reiniciado. Preencha seus dados.');
    });
  }

  atualizarResumo();

  /* =======================================================
     3. Quiz: é golpe ou não é?
     ======================================================= */

  var MENSAGENS = [
    {
      de: 'Banco Segur@',
      remetente: '(11) 9 8888-7766 · número desconhecido',
      texto: 'URGENTE: seu CPF foi usado em uma compra de R$ 4.290. Para cancelar agora, acesse bit.ly/seguranca-conta e informe sua senha.',
      golpe: true,
      explicacao: 'Isto é golpe. O banco não pede senha por mensagem e não manda link para cancelar compra. Se você não fez a compra, procure o banco pelo aplicativo oficial ou vá até a agência.',
      sinais: ['Pede pressa, com a palavra URGENTE', 'Pede a sua senha', 'Tem um link curto e estranho']
    },
    {
      de: 'Vila Esperança',
      remetente: 'Aplicativo que você instalou',
      texto: 'Lembrete do seu agendamento: quarta-feira, às 10h, na Unidade de Saúde Vila Esperança. Não é preciso levar nada além de um documento com foto. Para remarcar, abra o aplicativo.',
      golpe: false,
      explicacao: 'Esta é de verdade. Não pede senha, não pede dinheiro e manda abrir o aplicativo que você já usa. Também confere com um atendimento que você mesma marcou.',
      sinais: ['Não pede senha nem código', 'Não tem link para clicar', 'Confere com algo que você marcou']
    },
    {
      de: 'Auxílio Cidadão',
      remetente: 'Número desconhecido',
      texto: 'Parabéns! Você tem R$ 1.200 de auxílio para receber. Para liberar, envie a foto do seu documento e o código de 6 números que chegou por SMS.',
      golpe: true,
      explicacao: 'Isto é golpe. Ninguém pede foto de documento por mensagem, e o código do SMS é a chave da sua conta. Quem pede esse código quer entrar no seu nome.',
      sinais: ['Prêmio que você não pediu', 'Pede foto de documento', 'Pede o código que chega por SMS']
    }
  ];

  var quizNumero = document.getElementById('quiz-numero');
  var quizDe = document.getElementById('quiz-de');
  var quizRemetente = document.getElementById('quiz-remetente');
  var quizTexto = document.getElementById('quiz-texto');
  var quizRespostas = document.getElementById('quiz-respostas');
  var quizFeedback = document.getElementById('quiz-feedback');
  var quizFeedbackTitulo = document.getElementById('quiz-feedback-titulo');
  var quizFeedbackTexto = document.getElementById('quiz-feedback-texto');
  var quizSinais = document.getElementById('quiz-sinais');
  var quizSeguir = document.getElementById('quiz-seguir');
  var quizResultado = document.getElementById('quiz-resultado');
  var quizPlacar = document.getElementById('quiz-placar');
  var quizFinal = document.getElementById('quiz-final');
  var quizReiniciar = document.getElementById('quiz-reiniciar');
  var quizBarras = Array.prototype.slice.call(document.querySelectorAll('.quiz__barra'));

  var indiceQuiz = 0;
  var acertos = 0;
  var respondida = false;

  function mostrarMensagem() {
    var mensagem = MENSAGENS[indiceQuiz];
    quizNumero.textContent = String(indiceQuiz + 1);
    quizDe.textContent = mensagem.de;
    quizRemetente.textContent = mensagem.remetente;
    quizTexto.textContent = mensagem.texto;

    quizBarras.forEach(function (barra, posicao) {
      if (posicao <= indiceQuiz) barra.classList.add('on');
      else barra.classList.remove('on');
    });

    quizRespostas.hidden = false;
    quizFeedback.hidden = true;
    quizResultado.hidden = true;
    respondida = false;
  }

  function responder(escolheuGolpe) {
    if (respondida) return;
    respondida = true;

    var mensagem = MENSAGENS[indiceQuiz];
    var acertou = escolheuGolpe === mensagem.golpe;
    if (acertou) acertos++;

    quizFeedback.setAttribute('data-acerto', acertou ? 'sim' : 'nao');
    quizFeedbackTitulo.textContent = acertou ? 'Isso mesmo! Você percebeu.' : 'Quase! Vamos ver por quê.';
    quizFeedbackTexto.textContent = mensagem.explicacao;

    quizSinais.textContent = '';
    mensagem.sinais.forEach(function (sinal) {
      var item = document.createElement('li');
      item.textContent = sinal;
      quizSinais.appendChild(item);
    });

    var ultima = indiceQuiz === MENSAGENS.length - 1;
    quizSeguir.textContent = ultima ? 'Ver meu resultado' : 'Próxima mensagem';

    quizRespostas.hidden = true;
    quizFeedback.hidden = false;
    quizSeguir.focus();
    anunciar(quizFeedbackTitulo.textContent + ' ' + mensagem.explicacao);
  }

  if (quizRespostas) {
    quizRespostas.addEventListener('click', function (evento) {
      var botao = evento.target.closest('[data-resposta]');
      if (!botao) return;
      responder(botao.getAttribute('data-resposta') === 'golpe');
    });

    quizSeguir.addEventListener('click', function () {
      if (indiceQuiz === MENSAGENS.length - 1) {
        progressoLocal.registrarQuiz(acertos, MENSAGENS.length);
        quizFeedback.hidden = true;
        quizPlacar.textContent = acertos === MENSAGENS.length
          ? 'Você acertou as 3 mensagens!'
          : 'Você acertou ' + acertos + ' de ' + MENSAGENS.length + '.';
        quizFinal.textContent = acertos === MENSAGENS.length
          ? 'Muito bem. Você já sabe reconhecer os sinais mais comuns de golpe.'
          : 'Tudo bem errar no treino. Leia os sinais com calma e tente de novo quantas vezes quiser.';
        quizResultado.hidden = false;
        quizReiniciar.focus();
        anunciar(quizPlacar.textContent);
        return;
      }

      indiceQuiz++;
      mostrarMensagem();
      anunciar('Mensagem ' + (indiceQuiz + 1) + ' de ' + MENSAGENS.length + '.');
    });
  }

  if (quizReiniciar) {
    quizReiniciar.addEventListener('click', function () {
      indiceQuiz = 0;
      acertos = 0;
      mostrarMensagem();
      anunciar('Quiz reiniciado. Mensagem 1 de ' + MENSAGENS.length + '.');
    });
  }

  if (quizTexto) mostrarMensagem();
})();
