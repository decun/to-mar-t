const loader = document.querySelector("#loader");
const progress = document.querySelector("#progress");
const percent = document.querySelector("#percent");
const scene = document.querySelector("#scene");
const stage = document.querySelector("#stage");
const toggle = document.querySelector("#letter-toggle");
const title = document.querySelector("#title");
const hint = document.querySelector("#hint");
const letter = document.querySelector("#letter");
const seal = document.querySelector("#seal");
const close = document.querySelector("#close");
const pagePrevious = document.querySelector("#page-previous");
const pageNext = document.querySelector("#page-next");
const pageStatus = document.querySelector("#page-status");
const readingZoomTrigger = document.querySelector("#reading-zoom-trigger");
const letterReader = document.querySelector("#letter-reader");
const readerSheet = document.querySelector("#reader-sheet");
const readerTitle = document.querySelector("#reader-title");
const readerBody = document.querySelector("#reader-body");
const readerClose = document.querySelector("#reader-close");
const readerPrevious = document.querySelector("#reader-previous");
const readerNext = document.querySelector("#reader-next");
const readerPageStatus = document.querySelector("#reader-page-status");
const readerSmaller = document.querySelector("#reader-smaller");
const readerLarger = document.querySelector("#reader-larger");
const readerZoomStatus = document.querySelector("#reader-zoom-status");
const responseInstruction = document.querySelector("#response-instruction");
const responseStampTrigger = document.querySelector("#response-stamp-trigger");
const responseDialog = document.querySelector("#response-dialog");
const responseClose = document.querySelector("#response-close");
const responseQuestion = document.querySelector("#response-question");
const responseFinal = document.querySelector("#response-final");
const responseDate = document.querySelector("#response-date");
const responseSend = document.querySelector("#response-send");
const responseTease = document.querySelector("#response-tease");
const responseDone = document.querySelector("#response-done");
const tapProgress = [...document.querySelectorAll("#tap-progress i")];
const tapSounds = [
  document.querySelector("#sound-una"),
  document.querySelector("#sound-huh"),
  document.querySelector("#sound-iyaha")
];
let tapCount = 0;
let tapLocked = false;
let openingQueued = false;
let closeReadyTimer;
let currentLetterPage = 0;
let readerZoomIndex = 1;
let readerOpenedFrom = null;
let responseReadyTimer;
let responseUnlocked = false;
let responseOpenedFrom = null;
let responseSendClicks = 0;
let responseResolved = false;
const readerZoomLevels = [1, 1.2, 1.4, 1.6];
const readerPageHeadings = ["¡Hola, Martina!", "También quería contarte…"];
const letterPageCount = Math.max(1, ...[...letter.querySelectorAll("[data-letter-page]")]
  .map((element) => Number(element.dataset.letterPage) + 1));
close.disabled = true;

function updateReader() {
  readerTitle.textContent = readerPageHeadings[currentLetterPage] ?? readerPageHeadings[0];
  const pageParagraphs = [...letter.querySelectorAll(`[data-letter-page="${currentLetterPage}"]`)];
  const renderedParagraphs = pageParagraphs.map((paragraph) => {
    const rendered = document.createElement("p");
    rendered.textContent = paragraph.textContent;
    if (paragraph.classList.contains("signature")) rendered.classList.add("reader-signature");
    return rendered;
  });
  readerBody.replaceChildren(...renderedParagraphs);
  readerPageStatus.textContent = `${currentLetterPage + 1} / ${letterPageCount}`;
  readerPrevious.disabled = currentLetterPage === 0;
  readerNext.disabled = currentLetterPage === letterPageCount - 1;
}

function updateReaderZoom() {
  const scale = readerZoomLevels[readerZoomIndex];
  readerSheet.style.setProperty("--reader-body-size", `${20 * scale}px`);
  readerSheet.style.setProperty("--reader-heading-size", `${36 * scale}px`);
  readerZoomStatus.textContent = `${Math.round(scale * 100)}%`;
  readerSmaller.disabled = readerZoomIndex === 0;
  readerLarger.disabled = readerZoomIndex === readerZoomLevels.length - 1;
}

function openReader() {
  if (!toggle.checked) return;
  readerOpenedFrom = document.activeElement;
  updateReader();
  updateReaderZoom();
  letterReader.hidden = false;
  document.body.classList.add("reader-open");
  stage.setAttribute("aria-hidden", "true");
  requestAnimationFrame(() => readerClose.focus());
}

function closeReader() {
  if (letterReader.hidden) return;
  letterReader.hidden = true;
  document.body.classList.remove("reader-open");
  stage.removeAttribute("aria-hidden");
  if (toggle.checked) readerOpenedFrom?.focus?.();
}

function setStampHighlight(active) {
  stage.dispatchEvent(new CustomEvent("letter-stamp-highlight", { detail: { active } }));
}

function hideResponseInvite() {
  window.clearTimeout(responseReadyTimer);
  stage.classList.remove("response-ready");
  responseInstruction.setAttribute("aria-hidden", "true");
  responseStampTrigger.disabled = true;
  setStampHighlight(false);
}

function showResponseInvite() {
  if (!toggle.checked || currentLetterPage !== letterPageCount - 1) return;
  responseUnlocked = true;
  stage.classList.add("response-ready");
  responseInstruction.setAttribute("aria-hidden", "false");
  responseStampTrigger.disabled = false;
}

function updateResponseInvite() {
  hideResponseInvite();
  if (!toggle.checked || currentLetterPage !== letterPageCount - 1) return;
  if (responseUnlocked) {
    showResponseInvite();
    return;
  }
  responseReadyTimer = window.setTimeout(showResponseInvite, 7000);
}

function openResponseDialog() {
  if (responseStampTrigger.disabled || !toggle.checked) return;
  responseOpenedFrom = document.activeElement;
  responseDialog.hidden = false;
  document.body.classList.add("response-open");
  stage.setAttribute("aria-hidden", "true");
  requestAnimationFrame(() => (responseResolved ? responseDone : responseDate).focus());
}

function closeResponseDialog() {
  if (responseDialog.hidden) return;
  responseDialog.hidden = true;
  document.body.classList.remove("response-open");
  stage.removeAttribute("aria-hidden");
  responseOpenedFrom?.focus?.();
}

function showResponseFinal() {
  responseResolved = true;
  responseQuestion.hidden = true;
  responseFinal.hidden = false;
  requestAnimationFrame(() => responseDone.focus());
}

function setLetterPage(page) {
  currentLetterPage = Math.max(0, Math.min(letterPageCount - 1, page));
  letter.dataset.currentPage = String(currentLetterPage);
  pageStatus.textContent = `${currentLetterPage + 1} / ${letterPageCount}`;
  pagePrevious.disabled = currentLetterPage === 0;
  pageNext.disabled = currentLetterPage === letterPageCount - 1;
  updateReader();
  updateResponseInvite();
  stage.dispatchEvent(new CustomEvent("letter-page-change", { detail: { page: currentLetterPage } }));
}

pagePrevious.addEventListener("click", () => setLetterPage(currentLetterPage - 1));
pageNext.addEventListener("click", () => setLetterPage(currentLetterPage + 1));
readerPrevious.addEventListener("click", () => setLetterPage(currentLetterPage - 1));
readerNext.addEventListener("click", () => setLetterPage(currentLetterPage + 1));
readingZoomTrigger.addEventListener("click", openReader);
readerClose.addEventListener("click", closeReader);
readerSmaller.addEventListener("click", () => { readerZoomIndex = Math.max(0, readerZoomIndex - 1); updateReaderZoom(); });
readerLarger.addEventListener("click", () => { readerZoomIndex = Math.min(readerZoomLevels.length - 1, readerZoomIndex + 1); updateReaderZoom(); });
letterReader.addEventListener("click", (event) => { if (event.target === letterReader) closeReader(); });
responseStampTrigger.addEventListener("pointerenter", () => setStampHighlight(true));
responseStampTrigger.addEventListener("pointerleave", () => setStampHighlight(false));
responseStampTrigger.addEventListener("focus", () => setStampHighlight(true));
responseStampTrigger.addEventListener("blur", () => setStampHighlight(false));
responseStampTrigger.addEventListener("pointerdown", () => setStampHighlight(true));
responseStampTrigger.addEventListener("click", openResponseDialog);
responseClose.addEventListener("click", closeResponseDialog);
responseDone.addEventListener("click", closeResponseDialog);
responseDialog.addEventListener("click", (event) => { if (event.target === responseDialog) closeResponseDialog(); });
responseDate.addEventListener("click", () => {
  playTapSound(2);
  showResponseFinal();
});
responseSend.addEventListener("click", () => {
  playTapSound(1);
  responseSendClicks += 1;
  responseTease.textContent = Array.from({ length: responseSendClicks }, () => "Huh…").join(" ");
  if (responseSendClicks >= 6) {
    responseSend.disabled = true;
    window.setTimeout(showResponseFinal, 520);
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (!responseDialog.hidden) closeResponseDialog();
  else if (!letterReader.hidden) closeReader();
});
setLetterPage(0);
updateReaderZoom();

const started = performance.now();
const duration = 2200;
function load(now) {
  const value = Math.min(100, Math.round(((now - started) / duration) * 100));
  progress.style.width = `${value}%`;
  percent.textContent = `${value}%`;
  if (value < 100) requestAnimationFrame(load);
  else setTimeout(() => {
    loader.classList.add("loader-away");
    scene.classList.add("scene-ready");
    stage.classList.add("is-arriving");
    hint.textContent = "Tu carta está llegando…";
    const reduceArrivalMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => {
      stage.dataset.sceneReady = "true";
      stage.dispatchEvent(new CustomEvent("scene-ready"));
    }, reduceArrivalMotion ? 0 : 180);
    const arrivalDelay = reduceArrivalMotion ? 50 : 2280;
    window.setTimeout(() => {
      stage.classList.remove("is-arriving");
      if (!toggle.checked && tapCount === 0) hint.textContent = "Toca a Usagi 3 veces para abrirla";
    }, arrivalDelay);
  }, 350);
}
requestAnimationFrame(load);

function setOpen(open) {
  window.clearTimeout(closeReadyTimer);
  close.disabled = true;
  letter.setAttribute("aria-hidden", String(!open));
  title.textContent = open ? "Esta cartita es para ti" : "Tienes una carta";
  hint.textContent = open ? "Espero que te saque una sonrisa" : "Toca a Usagi 3 veces para abrirla";
  stage.classList.toggle("is-open", open);
  close.classList.toggle("visible", open);

  if (open) {
    const closeDelay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 50 : 3250;
    closeReadyTimer = window.setTimeout(() => { close.disabled = false; }, closeDelay);
  }

  if (!open) {
    closeReader();
    closeResponseDialog();
    hideResponseInvite();
    responseUnlocked = false;
    responseSendClicks = 0;
    responseResolved = false;
    responseQuestion.hidden = false;
    responseFinal.hidden = true;
    responseSend.disabled = false;
    responseTease.textContent = "";
    setLetterPage(0);
    tapCount = 0;
    openingQueued = false;
    tapProgress.forEach((dot) => dot.classList.remove("is-filled"));
    seal.disabled = false;
    seal.setAttribute("aria-label", "Tocar a Usagi: faltan 3 toques");
  }
}
toggle.addEventListener("change", () => setOpen(toggle.checked));

function playTapSound(index) {
  tapSounds.forEach((sound, soundIndex) => {
    if (soundIndex !== index) {
      sound.pause();
      sound.currentTime = 0;
    }
  });
  const sound = tapSounds[index];
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

function tapUsagi() {
  if (toggle.checked || openingQueued || tapLocked || stage.classList.contains("is-arriving")) return;
  tapLocked = true;
  window.setTimeout(() => { tapLocked = false; }, 170);

  playTapSound(tapCount);
  tapCount += 1;
  tapProgress[tapCount - 1]?.classList.add("is-filled");
  stage.dispatchEvent(new CustomEvent("seal-tap", { detail: { step: tapCount } }));

  const remaining = 3 - tapCount;
  seal.setAttribute("aria-label", remaining ? `Tocar a Usagi: faltan ${remaining} toques` : "Abriendo la carta");
  hint.textContent = tapCount === 1 ? "Una… faltan 2 toques" : tapCount === 2 ? "¿Huh?… falta 1 toque" : "¡IYAHAAA!";

  if (tapCount === 3) {
    openingQueued = true;
    seal.disabled = true;
    window.setTimeout(() => {
      toggle.checked = true;
      toggle.dispatchEvent(new Event("change", { bubbles: true }));
    }, 620);
  }
}

seal.addEventListener("click", tapUsagi);
close.addEventListener("click", () => {
  tapSounds.forEach((sound) => { sound.pause(); sound.currentTime = 0; });
  toggle.checked = false;
  toggle.dispatchEvent(new Event("change", { bubbles: true }));
});

tapSounds.forEach((sound) => sound.load());
