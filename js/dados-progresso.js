/* Somente resultados de aprendizagem. Os dados do formulário de treino ficam fora deste registro. */
var progressoLocal = (function () {
  'use strict';

  var chave = 'passo-certo:progresso';
  var chaveTrilhas = 'passoCertoProgressoV1';
  var memoriaTrilhas = {};
  var memoria = {};

  function lerTrilhas() {
    try {
      memoriaTrilhas = JSON.parse(localStorage.getItem(chaveTrilhas)) || {};
    } catch (erro) { /* Usa a memória desta visita. */ }
    return memoriaTrilhas;
  }

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
    lerTrilha: function (id) {
      return lerTrilhas()[id] || { completed: [], lastLesson: 0, lastStep: 0, finished: false };
    },
    salvarTrilha: function (id, progresso) {
      var trilhas = lerTrilhas();
      trilhas[id] = progresso;
      try {
        localStorage.setItem(chaveTrilhas, JSON.stringify(trilhas));
      } catch (erro) { /* A página continua funcionando nesta visita. */ }
    },
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
        localStorage.removeItem(chaveTrilhas);
        memoriaTrilhas = {};
        localStorage.removeItem(chave);
        memoria = {};
        return true;
      } catch (erro) { return false; }
    }
  };
}());