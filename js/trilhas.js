"use strict";

/* ---------- "Backend" sem banco: um JSON + localStorage ---------- */
const URL_DADOS = "data/trilhas.json";
const CHAVE = "passoCertoProgressoV1";   // mesma chave das outras páginas

let trilhas = [];
let t = 0, l = 0, p = 0;                 // índices atuais: trilha, lição, passo

const $ = (s) => document.querySelector(s);
const telas = { catalogo: $("#tela-catalogo"), licao: $("#tela-licao"), fim: $("#tela-fim") };

/* ---------- Progresso salvo no aparelho ---------- */
function lerTudo() {
  try { return JSON.parse(localStorage.getItem(CHAVE)) || {}; } catch { return {}; }
}
function lerTrilha(id) {
  return lerTudo()[id] || { completed: [], lastLesson: 0, lastStep: 0, finished: false };
}
function salvarTrilha(id, dados) {
  try {
    const tudo = lerTudo(); tudo[id] = dados;
    localStorage.setItem(CHAVE, JSON.stringify(tudo));
  } catch { /* armazenamento bloqueado: a página segue funcionando */ }
}

/* ---------- Utilidades ---------- */
function criar(tag, texto, classe) {
  const el = document.createElement(tag);
  if (texto) el.textContent = texto;
  if (classe) el.className = classe;
  return el;
}
function anunciar(msg) {            // fala para o leitor de tela
  const a = $("#anuncio"); a.textContent = "";
  setTimeout(() => { a.textContent = msg; }, 50);
}
function focar(...ids) {            // foca o primeiro botão visível e ativo
  const el = ids.map((i) => $(i)).find((e) => e && !e.hidden && !e.disabled);
  if (el) el.focus();
}

/* ---------- Troca de tela + migalhas ---------- */
function mostrar(nome) {
  Object.entries(telas).forEach(([k, el]) => { el.hidden = k !== nome; });
  const dentro = nome !== "catalogo";
  $("#mig-aprender").hidden = !dentro;
  $("#mig-aprender-atual").hidden = dentro;
  $("#mig-trilha-li").hidden = !dentro;
  if (dentro) $("#mig-trilha").textContent = trilhas[t].titulo;
  pararAudio();
  const titulo = { catalogo: "#titulo-pagina", licao: "#titulo-trilha-h", fim: "#titulo-fim" }[nome];
  $(titulo).setAttribute("tabindex", "-1"); $(titulo).focus();
  window.scrollTo({ top: 0 });
}
function irParaCatalogo() { desenharCatalogo(); mostrar("catalogo"); }

/* ---------- Tela 1: catálogo ---------- */
function copiarIcone(nome) {          // pega um SVG pronto do <template id="icones">
  const modelo = $("#icones").content.querySelector(`[data-icone="${nome}"]`);
  return modelo ? modelo.cloneNode(true) : null;
}

function desenharCatalogo() {
  const caixa = $("#lista-trilhas"); caixa.replaceChildren();
  trilhas.forEach((tr, i) => {
    const prog = lerTrilha(tr.id);
    const feitas = prog.completed.length, total = tr.licoes.length;
    const card = criar("article", null, "trilha");

    // painel da ilustração; mostra um selo só se a pessoa já começou
    const arte = criar("div", null, "trilha-arte");
    const desenho = copiarIcone(tr.id);
    if (desenho) arte.append(desenho);
    else { const e = criar("span", tr.icone, "trilha-emoji"); e.setAttribute("aria-hidden", "true"); arte.append(e); }
    if (prog.finished) arte.append(criar("span", "Concluída", "selo concluida"));
    else if (feitas > 0) arte.append(criar("span", `Em andamento: lição ${Math.min(feitas + 1, total)} de ${total}`, "selo"));

    // rodapé: duração curta + botão
    const minutos = (tr.duracao.match(/(\d+)\s*min/) || [])[1];
    const curta = minutos ? `${total} ${total === 1 ? "lição" : "lições"} • ${minutos} min` : tr.duracao;
    const meta = criar("p", null, "meta");
    const visivel = criar("span", curta); visivel.setAttribute("aria-hidden", "true");
    meta.append(copiarIcone("relogio"), visivel, criar("span", tr.duracao, "sr-only"));

    const rotulo = prog.finished ? "Rever" : feitas > 0 ? "Continuar" : "Começar";
    const botao = criar("button", rotulo, "botao");
    botao.type = "button";
    botao.setAttribute("aria-label", `${rotulo}: ${tr.titulo}`);
    botao.addEventListener("click", () => abrirTrilha(i));

    card.append(arte, criar("h3", tr.titulo), criar("p", tr.descricao, "trilha-desc"),
                Object.assign(criar("div", null, "trilha-rodape"), {}));
    card.lastElementChild.append(meta, botao);
    caixa.append(card);
  });
}

/* ---------- Tela 2: lição ---------- */
function abrirTrilha(i) {
  t = i;
  const prog = lerTrilha(trilhas[t].id);
  const ultima = trilhas[t].licoes.length - 1;
  // retoma de onde parou; se já terminou, começa do início para rever
  l = prog.finished ? 0 : Math.min(prog.lastLesson, ultima);
  p = prog.finished ? 0 : prog.lastStep;
  $("#titulo-trilha-h").textContent = trilhas[t].titulo;
  mostrar("licao"); desenharLicao();
}

function desenharLicao() {
  const tr = trilhas[t], licao = tr.licoes[l];
  p = Math.min(p, licao.passos.length - 1);
  const passo = licao.passos[p];
  const prog = lerTrilha(tr.id);
  const feitas = prog.completed.length;

  $("#subtitulo").textContent = `Lição ${l + 1} de ${tr.licoes.length} · ${licao.titulo}`;

  // lista de lições com status (concluída / você está aqui / próxima)
  const lista = $("#lista-licoes"); lista.replaceChildren();
  tr.licoes.forEach((li, i) => {
    const feita = prog.completed.includes(i), atual = i === l;
    const estado = atual ? (feita ? "Você está aqui · Concluída" : "Você está aqui")
                 : feita ? "Concluída" : i === l + 1 ? "Próxima lição" : "Para fazer";
    const b = criar("button", null, "licao-item"); b.type = "button";
    if (feita) b.classList.add("feita");
    if (atual) b.setAttribute("aria-current", "step");
    const marca = criar("span", feita ? "✓" : String(i + 1), "marca-licao");
    marca.setAttribute("aria-hidden", "true");
    const textos = criar("span", null, "licao-textos");
    textos.append(criar("span", li.titulo, "licao-nome"), criar("span", estado, "licao-estado"));
    b.append(marca, textos);
    b.addEventListener("click", () => { l = i; p = 0; desenharLicao(); });
    const item = document.createElement("li"); item.append(b); lista.append(item);
  });

  // barra de progresso da trilha
  $("#barra-preenchida").style.width = `${(feitas / tr.licoes.length) * 100}%`;
  const barra = document.querySelector(".barra");
  barra.setAttribute("aria-valuemax", tr.licoes.length); barra.setAttribute("aria-valuenow", feitas);
  $("#legenda-barra").textContent = `${feitas} de ${tr.licoes.length} ${feitas === 1 ? "lição concluída" : "lições concluídas"}`;

  // passo atual
  $("#posicao").textContent = `Passo ${p + 1} de ${licao.passos.length}`;
  const seg = $("#segmentos"); seg.replaceChildren();
  licao.passos.forEach((_, i) => { const s = document.createElement("span"); if (i <= p) s.className = "on"; seg.append(s); });
  $("#titulo-passo").textContent = passo.titulo || licao.titulo;
  $("#texto-passo").textContent = passo.texto;
  $("#icone").textContent = passo.icone;
  $("#ilustracao").setAttribute("aria-label", passo.alt);

  // botões
  const ultimo = p === licao.passos.length - 1;
  $("#anterior").disabled = l === 0 && p === 0;
  $("#proximo").hidden = ultimo;
  $("#concluir").hidden = !ultimo;

  salvarTrilha(tr.id, { ...prog, lastLesson: l, lastStep: p });   // guarda onde parou
  pararAudio();
}

function proximoPasso() { p++; desenharLicao(); focar("#proximo", "#concluir"); }
function passoAnterior() {
  if (p > 0) p--;
  else if (l > 0) {                       // volta para o último passo da lição anterior
    l--; p = trilhas[t].licoes[l].passos.length - 1;
    anunciar(`Lição ${l + 1}: ${trilhas[t].licoes[l].titulo}.`);
  }
  desenharLicao(); focar("#anterior", "#proximo", "#concluir");
}

function concluirLicao() {
  const tr = trilhas[t], prog = lerTrilha(tr.id);
  if (!prog.completed.includes(l)) prog.completed.push(l);
  if (prog.completed.length === tr.licoes.length) {
    salvarTrilha(tr.id, { completed: prog.completed, lastLesson: 0, lastStep: 0, finished: true });
    mostrar("fim");
    return;
  }
  // vai para a próxima lição ainda não feita
  const depois = tr.licoes.findIndex((_, i) => i > l && !prog.completed.includes(i));
  l = depois !== -1 ? depois : tr.licoes.findIndex((_, i) => !prog.completed.includes(i));
  p = 0;
  salvarTrilha(tr.id, { ...prog, lastLesson: l, lastStep: 0, finished: false });
  desenharLicao();
  anunciar(`Lição concluída. Agora, lição ${l + 1}: ${tr.licoes[l].titulo}.`);
  $("#titulo-passo").setAttribute("tabindex", "-1"); $("#titulo-passo").focus();
}

/* ---------- Ouvir (Web Speech API) ---------- */
const temVoz = "speechSynthesis" in window;
function pararAudio() {
  if (temVoz) speechSynthesis.cancel();
  $("#ouvir").setAttribute("aria-pressed", "false");
  $("#ouvir-texto").textContent = "Ouvir este passo";
}
function alternarAudio() {
  if ($("#ouvir").getAttribute("aria-pressed") === "true") { pararAudio(); anunciar("Áudio parado."); return; }
  const fala = new SpeechSynthesisUtterance(`${$("#titulo-passo").textContent}. ${$("#texto-passo").textContent}`);
  fala.lang = "pt-BR"; fala.rate = .9; fala.onend = pararAudio;
  speechSynthesis.cancel(); speechSynthesis.speak(fala);
  $("#ouvir").setAttribute("aria-pressed", "true");
  $("#ouvir-texto").textContent = "Parar áudio";
  anunciar("O áudio está tocando.");
}

/* ---------- Início: carrega o JSON (ou a cópia embutida) ---------- */
async function iniciar() {
  const caixa = $("#lista-trilhas");
  try {
    let dados;
    try {
      const resp = await fetch(URL_DADOS);          // 1º: servidor local / GitHub Pages
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      dados = await resp.json();
    } catch (erroFetch) {
      if (!window.TRILHAS_DADOS) throw erroFetch;   // 2º: cópia embutida (duplo clique)
      dados = window.TRILHAS_DADOS;
    }
    trilhas = dados.trilhas;
    desenharCatalogo();
  } catch (erro) {
    caixa.replaceChildren();
    const msg = criar("p", "Não foi possível carregar as trilhas. Confira se as pastas css, js e data estão ao lado do trilhas.html.", "aviso");
    const novamente = criar("button", "Tentar de novo", "botao botao-principal");
    novamente.type = "button"; novamente.addEventListener("click", iniciar);
    caixa.append(msg, novamente); console.error(erro);
  }
}

$("#proximo").addEventListener("click", proximoPasso);
$("#anterior").addEventListener("click", passoAnterior);
$("#concluir").addEventListener("click", concluirLicao);
$("#ouvir").addEventListener("click", alternarAudio);
$("#mig-aprender").addEventListener("click", irParaCatalogo);
$("#outra-trilha").addEventListener("click", irParaCatalogo);
if (!temVoz) $("#ouvir").hidden = true;   // sem suporte, o texto continua visível
iniciar();