(function () {
  'use strict';

  var pagina = document.querySelector('.progresso');
  var feedback = pagina.querySelector('.pc-feedback');
  var opcoes = pagina.querySelectorAll('[name="seguranca"]');
  var cartoes = pagina.querySelectorAll('[data-trilha]');

  function mensagem(texto, salvo) {
    feedback.textContent = texto;
    feedback.classList.toggle('salvo', salvo);
  }

  function atualizar() {
    var dados = progressoLocal.ler();
    var concluidas = 0;
    var proxima = null;

    cartoes.forEach(function (cartao) {
      var barra = cartao.querySelector('progress');
      var feitas = progressoLocal.lerTrilha(cartao.dataset.trilha).completed.length;
      barra.value = Math.min(barra.max, feitas);
      var completa = barra.value === barra.max;
      var iniciada = barra.value > 0 && !completa;
      if (completa) concluidas++;
      if (iniciada && !proxima) proxima = cartao;
      cartao.classList.toggle('concluida', completa);
      cartao.classList.toggle('em-andamento', iniciada);
      cartao.querySelector('.pc-estado').textContent = completa ? 'Concluída' : iniciada ? 'Em andamento' : 'Não começou';
      cartao.querySelector('.pc-licoes').textContent = barra.value + ' de ' + barra.max + ' lições';
    });

    var contagem = concluidas + ' de ' + cartoes.length;
    document.getElementById('pc-contagem').textContent = contagem;
    document.getElementById('pc-total').textContent = 'Você concluiu ' + contagem + ' trilhas';
    document.getElementById('pc-incentivo').textContent = concluidas || proxima ? 'Muito bem!' : 'Primeiro passo';
    pagina.querySelector('.pc-anel').style.setProperty('--parte', (100 * concluidas / cartoes.length) + '%');
    var link = document.getElementById('pc-continuar');
    var orientacao = document.getElementById('pc-proxima');
    link.href = proxima ? proxima.querySelector('a').href : '#minhas-trilhas';
    link.textContent = proxima ? 'Continuar agora' : 'Ver minhas trilhas';
    orientacao.textContent = proxima ? 'Continue de onde parou: ' + proxima.querySelector('h3').textContent + '.' :
      concluidas === cartoes.length ? 'Você pode rever as trilhas quando quiser.' : 'Escolha uma trilha para começar no seu ritmo.';

    document.getElementById('pc-agendas').textContent = dados.agendamentos || 0;
    document.getElementById('pc-vezes').textContent = dados.agendamentos === 1 ? 'vez' : 'vezes';
    document.getElementById('pc-acertos').textContent = dados.acertos || 0;
    document.getElementById('pc-perguntas').textContent = dados.perguntas || 3;
    opcoes.forEach(function (opcao) { opcao.checked = Number(opcao.value) === dados.seguranca; });
    var respondido = Boolean(pagina.querySelector('input:checked'));
    mensagem(respondido ? 'Resposta guardada. Obrigado por contar.' : '', respondido);
  }

  pagina.querySelector('.pc-opcoes').addEventListener('change', function (evento) {
    var salvo = progressoLocal.responder(Number(evento.target.value));
    mensagem(salvo ? 'Resposta guardada. Obrigado por contar.' : 'Não foi possível guardar sua resposta neste aparelho.', salvo);
  });

  document.getElementById('pc-apagar').addEventListener('click', function () {
    if (!window.confirm('Apagar as trilhas, os resultados dos treinos e sua resposta neste aparelho?')) return;
    var apagado = progressoLocal.apagar();
    atualizar();
    document.getElementById('aviso').textContent = apagado ? 'Seu progresso foi apagado.' : 'Não foi possível apagar o progresso.';
    mensagem(document.getElementById('aviso').textContent, false);
  });

  window.addEventListener('pageshow', atualizar);
  window.addEventListener('storage', atualizar);
  atualizar();
}());