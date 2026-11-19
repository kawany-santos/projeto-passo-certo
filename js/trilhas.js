const DATA_URL = "./data/trilhas.json";
const STORAGE_KEY = "passoCertoProgressoV1";
const PREF_KEY = "passoCertoPreferenciasV1";

let trilhas = [];
let trilhaIndex = 0;
let licaoIndex = 0;
let passoIndex = 0;
let toastTimer;

const $ = (selector) => document.querySelector(selector);
const catalogView = $("#catalog-view");
const lessonView = $("#lesson-view");
const completionView = $("#completion-view");

function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}
function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}
function getTrailProgress(trail) {
  const all = getProgress();
  return all[trail.id] || { completed: [], lastLesson: 0, lastStep: 0, finished: false };
}
function totalLessons(trail) { return trail.licoes.length; }
function completedCount(trail) { return getTrailProgress(trail).completed.length; }
function totalSteps(trail) { return trail.licoes.reduce((sum, lesson) => sum + lesson.passos.length, 0); }

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function renderCatalog() {
  const grid = $("#trail-grid");
  grid.innerHTML = "";
  trilhas.forEach((trail, index) => {
    const progress = getTrailProgress(trail);
    const done = progress.completed.length;
    const percent = Math.round(done / totalLessons(trail) * 100);
    const status = progress.finished ? "Concluída" : done ? "Em andamento" : "Não começou";
    const statusClass = progress.finished ? "done" : done ? "progress" : "";
    const card = document.createElement("article");
    card.className = `trail-card ${progress.finished ? "is-done" : ""}`;
    card.innerHTML = `
      <div class="trail-art ${trail.cor}">
        <span class="trail-art-icon" aria-hidden="true">${trail.icone}</span>
        <span class="art-label">${done ? `${done} de ${totalLessons(trail)} lições` : "Comece por aqui"}</span>
      </div>
      <div class="trail-card-content">
        <span class="trail-status ${statusClass}">${status}</span>
        <h3>${trail.titulo}</h3>
        <p>${trail.descricao}</p>
        <div class="trail-meta"><span>◷</span>${trail.duracao}</div>
        <div class="progress-track" role="progressbar" aria-label="Progresso de ${trail.titulo}" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100"><span style="width:${percent}%"></span></div>
        <span class="trail-progress-label">${done} de ${totalLessons(trail)} lições concluídas</span>
        <button class="button ${done ? "button-primary" : "button-outline"}" data-open-trail="${index}">${progress.finished ? "Rever trilha" : done ? "Continuar" : "Começar"} <span aria-hidden="true">→</span></button>
      </div>`;
    grid.appendChild(card);
  });
  grid.querySelectorAll("[data-open-trail]").forEach(button => {
    button.addEventListener("click", () => openTrail(Number(button.dataset.openTrail)));
  });
}

function openTrail(index) {
  stopSpeech();
  trilhaIndex = index;
  const trail = trilhas[index];
  const progress = getTrailProgress(trail);
  licaoIndex = Math.min(progress.lastLesson || 0, trail.licoes.length - 1);
  passoIndex = Math.min(progress.lastStep || 0, trail.licoes[licaoIndex].passos.length - 1);
  if (progress.finished) { licaoIndex = 0; passoIndex = 0; }
  catalogView.hidden = true;
  completionView.hidden = true;
  lessonView.hidden = false;
  renderLesson();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderLesson() {
  const trail = trilhas[trilhaIndex];
  const lesson = trail.licoes[licaoIndex];
  const step = lesson.passos[passoIndex];
  $("#lesson-title").textContent = trail.titulo;
  $("#breadcrumb-trail").textContent = trail.titulo;
  $("#lesson-subtitle").textContent = `Lição ${licaoIndex + 1} de ${trail.licoes.length} · ${lesson.titulo}`;
  $("#step-counter").textContent = `Passo ${passoIndex + 1} de ${lesson.passos.length}`;
  $("#step-title").textContent = step.alt.replace(/[.!]$/, "");
  $("#step-text").textContent = step.texto;
  $("#illustration-symbol").textContent = step.icone;
  $("#illustration-caption").textContent = `Etapa ${passoIndex + 1} · ${lesson.titulo}`;
  $("#step-illustration").setAttribute("aria-label", step.alt);

  const progress = getTrailProgress(trail);
  const completed = progress.completed.length;
  $("#lesson-progress-caption").textContent = `${completed} de ${trail.licoes.length} lições concluídas`;
  $("#lesson-progress-fill").style.width = `${completed / trail.licoes.length * 100}%`;

  const list = $("#lesson-list");
  list.innerHTML = "";
  trail.licoes.forEach((item, i) => {
    const isDone = progress.completed.includes(i);
    const isCurrent = i === licaoIndex;
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.className = `${isDone ? "completed" : ""} ${isCurrent ? "current" : ""}`;
    button.type = "button";
    button.innerHTML = `<span class="lesson-number">${isDone ? "✓" : i + 1}</span><span class="lesson-label"><strong>${item.titulo}</strong><small>${isDone ? "Concluída" : isCurrent ? "Você está aqui" : i === licaoIndex + 1 ? "Próxima lição" : "Lição"}</small></span>`;
    button.addEventListener("click", () => {
      if (i <= licaoIndex || progress.completed.includes(i)) {
        licaoIndex = i; passoIndex = 0; persistPosition(); renderLesson(); stopSpeech();
      } else {
        showToast("Conclua a lição atual para avançar.");
      }
    });
    li.appendChild(button); list.appendChild(li);
  });

  const stepProgress = $("#step-progress");
  stepProgress.innerHTML = "";
  lesson.passos.forEach((_, i) => {
    const segment = document.createElement("span");
    if (i <= passoIndex) segment.classList.add("active");
    stepProgress.appendChild(segment);
  });

  $("#previous-step").disabled = licaoIndex === 0 && passoIndex === 0;
  $("#next-step").hidden = passoIndex === lesson.passos.length - 1;
  $("#complete-lesson").hidden = passoIndex !== lesson.passos.length - 1;
  persistPosition();
}

function persistPosition() {
  const trail = trilhas[trilhaIndex];
  const all = getProgress();
  const current = all[trail.id] || { completed: [], lastLesson: 0, lastStep: 0, finished: false };
  current.lastLesson = licaoIndex;
  current.lastStep = passoIndex;
  all[trail.id] = current;
  saveProgress(all);
}

function previousStep() {
  stopSpeech();
  if (passoIndex > 0) passoIndex--;
  else if (licaoIndex > 0) { licaoIndex--; passoIndex = trilhas[trilhaIndex].licoes[licaoIndex].passos.length - 1; }
  renderLesson();
}
function nextStep() {
  stopSpeech();
  const lesson = trilhas[trilhaIndex].licoes[licaoIndex];
  if (passoIndex < lesson.passos.length - 1) passoIndex++;
  renderLesson();
}
function completeLesson() {
  stopSpeech();
  const trail = trilhas[trilhaIndex];
  const all = getProgress();
  const progress = all[trail.id] || { completed: [], lastLesson: 0, lastStep: 0, finished: false };
  if (!progress.completed.includes(licaoIndex)) progress.completed.push(licaoIndex);
  progress.completed.sort((a,b) => a-b);
  if (licaoIndex < trail.licoes.length - 1) {
    progress.lastLesson = licaoIndex + 1;
    progress.lastStep = 0;
    all[trail.id] = progress;
    saveProgress(all);
    licaoIndex++;
    passoIndex = 0;
    renderLesson();
    showToast("Lição concluída! Vamos para a próxima.");
  } else {
    progress.finished = true;
    progress.lastLesson = 0;
    progress.lastStep = 0;
    all[trail.id] = progress;
    saveProgress(all);
    lessonView.hidden = true;
    completionView.hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function backToCatalog() {
  stopSpeech();
  lessonView.hidden = true;
  completionView.hidden = true;
  catalogView.hidden = false;
  renderCatalog();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function speak(text) {
  if (!("speechSynthesis" in window)) {
    showToast("A leitura em voz alta não está disponível neste navegador.");
    return;
  }
  stopSpeech();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "pt-BR";
  utterance.rate = 0.88;
  utterance.pitch = 1;
  utterance.onstart = () => $("#stop-audio").hidden = false;
  utterance.onend = () => $("#stop-audio").hidden = true;
  utterance.onerror = () => $("#stop-audio").hidden = true;
  window.speechSynthesis.speak(utterance);
  showToast("O áudio está tocando.");
}
function stopSpeech() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  const stop = $("#stop-audio");
  if (stop) stop.hidden = true;
}

function loadPreferences() {
  try {
    const prefs = JSON.parse(localStorage.getItem(PREF_KEY)) || {};
    if (prefs.fontScale) document.documentElement.style.setProperty("--font-scale", prefs.fontScale);
    if (prefs.contrast) {
      document.body.classList.add("high-contrast");
      $("#contrast-toggle").setAttribute("aria-pressed", "true");
    }
  } catch {}
}
function savePreferences() {
  const scale = getComputedStyle(document.documentElement).getPropertyValue("--font-scale").trim() || "1";
  localStorage.setItem(PREF_KEY, JSON.stringify({ fontScale: scale, contrast: document.body.classList.contains("high-contrast") }));
}
function changeFont(delta) {
  const current = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--font-scale")) || 1;
  const next = Math.min(1.35, Math.max(.9, +(current + delta).toFixed(2)));
  document.documentElement.style.setProperty("--font-scale", next);
  savePreferences();
  showToast(delta > 0 ? "Letra aumentada." : "Letra diminuída.");
}
function toggleContrast() {
  const enabled = document.body.classList.toggle("high-contrast");
  $("#contrast-toggle").setAttribute("aria-pressed", String(enabled));
  savePreferences();
  showToast(enabled ? "Alto contraste ativado." : "Contraste normal ativado.");
}

function setupNavigation() {
  const menu = $("#main-nav"), toggle = $("#menu-toggle");
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.innerHTML = open ? "× <span>Fechar</span>" : "☰ <span>Menu</span>";
  });
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    menu.classList.remove("open"); toggle.setAttribute("aria-expanded", "false");
  }));
  const panel = $("#mobile-access-panel");
  $("#mobile-access").addEventListener("click", () => { panel.hidden = false; $("#mobile-access").setAttribute("aria-expanded","true"); });
  $("#close-access").addEventListener("click", () => { panel.hidden = true; $("#mobile-access").setAttribute("aria-expanded","false"); });
  $("#mobile-increase").addEventListener("click", () => changeFont(.1));
  $("#mobile-decrease").addEventListener("click", () => changeFont(-.1));
  $("#mobile-contrast").addEventListener("click", toggleContrast);
  $("#mobile-read").addEventListener("click", () => speak(document.querySelector("main").innerText));
}

async function init() {
  loadPreferences();
  setupNavigation();
  $("#increase-font").addEventListener("click", () => changeFont(.1));
  $("#decrease-font").addEventListener("click", () => changeFont(-.1));
  $("#contrast-toggle").addEventListener("click", toggleContrast);
  $("#read-page").addEventListener("click", () => speak(document.querySelector("main").innerText));
  $("#stop-audio").addEventListener("click", () => { stopSpeech(); showToast("Áudio parado."); });
  $("#read-step").addEventListener("click", () => speak($("#step-text").textContent));
  $("#previous-step").addEventListener("click", previousStep);
  $("#next-step").addEventListener("click", nextStep);
  $("#complete-lesson").addEventListener("click", completeLesson);
  $("#back-to-trails").addEventListener("click", backToCatalog);
  $("#choose-another").addEventListener("click", backToCatalog);

  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error("Falha ao carregar o arquivo de trilhas.");
    const data = await response.json();
    trilhas = data.trilhas || [];
    if (!trilhas.length) throw new Error("Nenhuma trilha foi encontrada.");
    renderCatalog();
  } catch (error) {
    $("#trail-grid").innerHTML = `<div class="loading-card">Não foi possível carregar as trilhas. Confira se está usando um servidor local, como o Live Server, e tente atualizar a página.</div>`;
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", init);
