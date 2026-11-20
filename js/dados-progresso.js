/* Somente resultados de aprendizagem. Os dados do formulário de treino ficam fora deste registro. */
var progressoLocal = (function () {
  'use strict';

  var chave = 'passo-certo:progresso';
  var memoria = {};

  function ler() {
    try {
      var dados = JSON.parse(localStorage.getItem(chave));
      memoria = dados && typeof dados === 'object' ? dados : {};
    } catch (erro) { /* Armazenamento indisponível nesta visita. */ }
    return memoria;
  }

  function salvar(dados) {
    memoria = dados;
    try {
      localStorage.setItem(chave, JSON.stringify(dados));
      return true;
    } catch (erro) { return false; }
  }

  return {
    ler: ler,
    registrarAgendamento: function () {
      var dados = ler();
      dados.agendamentos = (Number(dados.agendamentos) || 0) + 1;
      salvar(dados);
    },
    registrarQuiz: function (acertos, total) {
      var dados = ler();
      dados.acertos = Math.max(Number(dados.acertos) || 0, acertos);
      dados.perguntas = total;
      salvar(dados);
    },
    responder: function (valor) {
      var dados = ler();
      dados.seguranca = valor;
      return salvar(dados);
    },
    apagar: function () {
      try {
        localStorage.removeItem(chave);
        memoria = {};
        return true;
      } catch (erro) { return false; }
    }
  };
}());