const loader = document.querySelector("#loader");
const progress = document.querySelector("#progress");
const percent = document.querySelector("#percent");
const portalGate = document.querySelector("#portal-gate");
const portalWorld = document.querySelector("#portal-world");
const portalHandleTrigger = document.querySelector("#portal-handle-trigger");
const portalKeypad = document.querySelector("#portal-keypad");
const portalKeyInput = document.querySelector("#portal-key-input");
const portalStatus = document.querySelector("#portal-status");
const scene = document.querySelector("#scene");
const stage = document.querySelector("#stage");
const toggle = document.querySelector("#letter-toggle");
const title = document.querySelector("#title");
const hint = document.querySelector("#hint");
const letterEyebrow = document.querySelector("#letter-eyebrow");
const letterArchive = document.querySelector("#letter-archive");
const letterDateToggle = document.querySelector("#letter-date-toggle");
const letterDateList = document.querySelector("#letter-date-list");
const selectedLetterDate = document.querySelector("#selected-letter-date");
const letterDateOptions = [...document.querySelectorAll("[data-letter-model]")];
const letter = document.querySelector("#letter");
const letterDate = document.querySelector("#letter-date");
const letterHeading = document.querySelector("#letter-heading");
const seal = document.querySelector("#seal");
const sealImage = seal.querySelector(".rose-image");
const close = document.querySelector("#close");
const pagePrevious = document.querySelector("#page-previous");
const pageNext = document.querySelector("#page-next");
const pageStatus = document.querySelector("#page-status");
const readingZoomTrigger = document.querySelector("#reading-zoom-trigger");
const letterReader = document.querySelector("#letter-reader");
const readerSheet = document.querySelector("#reader-sheet");
const readerKicker = document.querySelector("#reader-kicker");
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
const responseResultKicker = document.querySelector("#response-result-kicker");
const responseResultTitle = document.querySelector("#response-result-title");
const responseResultImage = document.querySelector("#response-result-image");
const responseResultCopy = document.querySelector("#response-result-copy");
const responseDate = document.querySelector("#response-date");
const responseSend = document.querySelector("#response-send");
const responseTease = document.querySelector("#response-tease");
const responseDone = document.querySelector("#response-done");
const pageTurnSound = document.querySelector("#sound-page-turn");
const wrongPasswordSound = document.querySelector("#sound-wrong-password");
const doorOpeningSound = document.querySelector("#sound-door-opening");
const tapProgress = [...document.querySelectorAll("#tap-progress i")];
const particles = [...document.querySelectorAll(".particles i")];
const tapSounds = [
  document.querySelector("#sound-una"),
  document.querySelector("#sound-huh"),
  document.querySelector("#sound-iyaha")
];
const letterModels = {
  "2026-08-23": {
    route: "23-08-2026",
    dateLabel: "23 AGO 2026",
    eyebrow: "PARA MARTINA · 23/08/2026",
    letterDate: "23/08/2026",
    headings: ["Querida Martina,", "Aquel día en la playa,", "Y algo que quiero decirte,"],
    pages: [
      [
        "Hay muchas cosas de ti que he ido descubriendo y que admiro. Me encanta lo decidida que eres: cuando quieres hacer algo, simplemente vas y lo haces, sin esperar la validación de nadie. Esa seguridad y esa manera tan tuya de avanzar me parecen muy bonitas.",
        "También me gusta esa ternura que a veces se te escapa sin avisar. Cuando dices algo bonito y después intentas disimularlo, como si de pronto te hubieras dado cuenta de que fuiste demasiado tierna. Quizás tú no lo notes, pero esos momentos me hacen sonreír muchísimo."
      ],
      [
        "Recuerdo con mucho cariño el día que estuvimos conversando en la playa sobre nuestras metas. El sol me pegaba tan fuerte que apenas podía abrir los ojos, pero aun así me encantó estar ahí contigo, escucharte y conocerte un poquito más. También recuerdo a alguien tocando un bolero cerca de nosotros y lo nervioso que me puse. Creo que, en el fondo, una parte de mí quería que nos quedáramos un rato más mirando el mar, aunque en ese momento los nervios no me dejaran decirlo."
      ],
      [
        "Me gustas, de verdad. Me gusta la forma en que te expresas; cómo miras a los ojos, tu sonrisa, tu presencia, tu voz y tu inteligencia. Desde que te conocí me pareciste bonita, aunque al principio no tenía el coraje para acercarme.",
        "Gracias por darme un poquito de tu coraje para poder decirte esto. Quisiera compartir más contigo, Martina. No quiero convertirme en una carga ni interponerme en tus deseos profesionales o de desarrollo personal; solo quiero que sepas que, siempre que lo necesites, puedes acudir a mí.",
        { text: "Con deseos de que tus deseos se cumplan, Farid", signature: true }
      ]
    ],
    openTitle: "yanodoimas",
    openHint: "Espero que te saque una sonrisa",
    tapCountRequired: 1,
    tapSoundSequence: [2],
    tapHints: ["¡IYAHAAA!"],
    particles: ["♥", "✦", "♡", "★", "♥", "✦", "♡", "★"],
    responseEnabled: false,
    interaction: {
      type: "reveal",
      delay: 5000,
      instruction: "Presiona el sello de la rosa",
      ariaLabel: "Abrir la sorpresa del sello de la rosa",
      kicker: "",
      title: "Sorpresa",
      copy: "",
      image: "./assets/kitten-rose.png",
      imageAlt: "Un gatito blanco sosteniendo una rosa"
    },
    visual: {
      theme: "heart",
      sealSrc: "./assets/usagi-heart-sticker.png",
      sealScale: 0.94,
      envelope: {
        paper: "#9fdcf2",
        light: "#d8f4ff",
        shade: "#70b9d7",
        inner: "#5d9fbd",
        edge: "#3d7898"
      },
      letter: {
        top: "#ca465b",
        bottom: "#8e2035",
        border: "rgba(255,235,225,.38)",
        accent: "#ffd0c7",
        meta: "rgba(255,246,235,.72)",
        ink: "#fff6eb",
        signature: "#ffd3dc",
        showStamp: true,
        stampSrc: "./assets/rose-letter-stamp.png",
        stampTint: false,
        stampGlyphs: false,
        stampComposite: "source-over",
        stampSize: 180,
        stampOffsetY: 30,
        stampHighlightColor: "rgba(255,239,151,.54)"
      }
    }
  },
  "2026-08-04": {
    route: "04-08-2026",
    dateLabel: "04 AGO 2026",
    eyebrow: "PARA MARTINA · 04/08/2026",
    letterDate: "una cartita para ti · 04/08/2026",
    headings: ["Estimada Martina:", "¡Feliz cumpleaños atrasado! D:", "Sobre cierto regalo…", "Y una última opción…"],
    pages: [
      [
        "Le escribo esta carta, formalmente, para pedirle disculpas por cómo actué ante la situación acontecida el pasado mes de junio. Sé que ya le he pedido disculpas varias veces; simplemente sentía que todavía necesitaba expresar esto con calma.",
        "Dicho esto, surgió otro problema que me acongojaba el corazón, porque no me gusta dejar pasar este tipo de fechas."
      ],
      [
        "Para el 29 de junio estaba demasiado enredado como para escribir algo de manera congruente. Aun así, no quería dejar que siguiera pasando más tiempo sin desearle un feliz cumpleaños; que cumpla muchos más, que se cumplan todos sus deseos y todoooo."
      ],
      [
        "También quería contarle que, desde que me dijo cuándo era su cumpleaños, empecé a planear su regalo. Por lo mismo, lo tengo guardado desde hace un rato y, como tampoco quiero condicionarla con él, me gustaría saber cómo prefiere recibirlo: por alguna aplicación como Uber o DiDi, mediante drones, teletransportación o el método que le acomode más."
      ],
      [
        "Por otro lado, está la opción de que nos juntemos y usemos esto como excusa para celebrar su cumpleaños y que pasó todos sus ramos, jeje. Felicitaciones, por cierto; espero que le vaya muy bien este semestre.",
        "Y ahora sí: atenta al Usagi de aquí abajo.",
        { text: "Con cariño, Farid", signature: true }
      ]
    ],
    openTitle: "Esta cartita es para ti",
    openHint: "Espero que te saque una sonrisa",
    tapCountRequired: 3,
    tapSoundSequence: [0, 1, 2],
    tapHints: ["Una… faltan 2 toques", "¿Huh?… falta 1 toque", "¡IYAHAAA!"],
    particles: ["🌹", "✦", "🌹", "★", "🌹", "✦", "🌹", "★"],
    responseEnabled: true,
    interaction: {
      type: "response",
      delay: 7000,
      instruction: "Presiona el sello de Usagi para responder",
      ariaLabel: "Responder usando el sello de Usagi"
    },
    visual: {
      theme: "classic",
      sealSrc: "./assets/usagi-sticker.png",
      sealScale: 1,
      envelope: {
        paper: "#f1e4cc",
        light: "#fff2dc",
        shade: "#d7c3a4",
        inner: "#cdb89a",
        edge: "#b8a184"
      },
      letter: {
        top: "#eefaff",
        bottom: "#c7e6f5",
        border: "rgba(61,111,146,.28)",
        accent: "#d58b92",
        meta: "rgba(23,58,90,.72)",
        ink: "#173a5a",
        signature: "#6f5878",
        showStamp: true,
        stampSrc: "./assets/usagi-letter-stamp-v2.png",
        stampTint: true,
        stampGlyphs: true,
        stampComposite: "multiply"
      }
    }
  }
};
const PORTAL_CODE = "ez";
let enteredPortalCode = "";
let portalUnlocking = false;
let portalKeypadVisible = false;
let portalDeniedTimer;
let tapCount = 0;
let tapLocked = false;
let openingQueued = false;
let closeReadyTimer;
let arrivalReadyTimer;
let arrivalEndTimer;
let currentLetterPage = 0;
let readerZoomIndex = 1;
let readerOpenedFrom = null;
let responseReadyTimer;
let responseUnlocked = false;
let responseOpenedFrom = null;
let responseSendClicks = 0;
let responseResolved = false;
let responseSubmitting = false;
let activeLetterModelId = null;
let activeLetterModel = null;
let envelopeModulePromise = null;
let hasSelectedLetter = false;
const responseEndpoint = "https://formspree.io/f/xbgrreow";
const readerZoomLevels = [1, 1.2, 1.4, 1.6];
let readerPageHeadings = [];
let letterPageCount = 1;
close.disabled = true;

function setLetterArchiveOpen(open) {
  const nextOpen = Boolean(open) && !letterDateToggle.disabled;
  letterArchive.classList.toggle("is-open", nextOpen);
  letterDateToggle.setAttribute("aria-expanded", String(nextOpen));
  letterDateList.hidden = !nextOpen;
}

function getLetterModelFromRoute() {
  const route = window.location.hash.replace(/^#\/?/, "").trim();
  return Object.entries(letterModels).find(([, model]) => model.route === route)?.[0] ?? null;
}

function updateLetterRoute(model) {
  try {
    const url = new URL(window.location.href);
    url.search = "";
    url.hash = `/${model.route}`;
    window.history.replaceState({}, "", url);
  } catch (_) {
    // La carta sigue funcionando aunque el navegador local no permita editar la dirección.
  }
}

function showLetterArchive() {
  scene.classList.remove("has-letter");
  scene.classList.add("is-choosing-letter");
  letterArchive.classList.add("is-choosing");
  stage.setAttribute("aria-hidden", "true");
  letterEyebrow.textContent = "ARCHIVO PARA MARTINA";
  title.textContent = "Elige una carta";
  hint.textContent = "Cada fecha guarda algo distinto";
  selectedLetterDate.textContent = "ELIGE UNA FECHA";
  letterDateOptions.forEach((option) => option.setAttribute("aria-selected", "false"));
  setLetterArchiveOpen(true);
}

function clearPortalCode(message = "FASILITO") {
  if (portalUnlocking) return;
  enteredPortalCode = "";
  portalKeyInput.value = "";
  portalStatus.textContent = message;
}

function denyPortalAccess() {
  window.clearTimeout(portalDeniedTimer);
  wrongPasswordSound.pause();
  wrongPasswordSound.currentTime = 0;
  wrongPasswordSound.volume = 0.62;
  wrongPasswordSound.play().catch(() => {});
  portalGate.classList.remove("is-denied");
  requestAnimationFrame(() => portalGate.classList.add("is-denied"));
  portalStatus.textContent = "Esa llave no encaja… intenta otra vez";
  portalDeniedTimer = window.setTimeout(() => {
    portalGate.classList.remove("is-denied");
    clearPortalCode();
    portalKeyInput.focus();
  }, 900);
}

function enterLetterArchive() {
  try {
    const archiveUrl = new URL(window.location.href);
    archiveUrl.search = "";
    archiveUrl.hash = "";
    window.history.replaceState({}, "", archiveUrl);
  } catch (_) {
    // La entrada sigue funcionando aunque el navegador no permita limpiar la ruta.
  }
  showLetterArchive();
  scene.inert = false;
  scene.removeAttribute("aria-hidden");
  scene.classList.add("scene-ready");
  portalGate.classList.add("portal-away");
  portalGate.setAttribute("aria-hidden", "true");
  window.setTimeout(() => letterDateToggle.focus(), 620);
}

function unlockPortal() {
  if (portalUnlocking) return;
  portalUnlocking = true;
  doorOpeningSound.pause();
  doorOpeningSound.currentTime = 0;
  doorOpeningSound.volume = 0.56;
  doorOpeningSound.play().catch(() => {});
  window.clearTimeout(portalDeniedTimer);
  portalGate.classList.remove("is-denied");
  portalGate.classList.add("is-unlocked");
  portalGate.dispatchEvent(new CustomEvent("portal-unlock"));
  portalStatus.textContent = "♡";
  portalKeyInput.disabled = true;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.setTimeout(() => {
    portalGate.classList.add("is-entering");
    portalGate.dispatchEvent(new CustomEvent("portal-enter"));
  }, reduceMotion ? 160 : 1850);
  window.setTimeout(enterLetterArchive, reduceMotion ? 380 : 3050);
}

function validatePortalCode() {
  if (portalUnlocking) return;
  enteredPortalCode = portalKeyInput.value.trim().toLowerCase();
  if (enteredPortalCode === PORTAL_CODE) unlockPortal();
  else denyPortalAccess();
}

function revealPortal() {
  scene.inert = true;
  scene.setAttribute("aria-hidden", "true");
  portalKeypadVisible = false;
  portalKeyInput.disabled = false;
  clearPortalCode();
  portalGate.classList.remove("is-keypad-visible");
  portalKeypad.setAttribute("aria-hidden", "true");
  portalGate.setAttribute("aria-hidden", "false");
  requestAnimationFrame(() => portalGate.classList.add("portal-ready"));
}

function revealPortalKeypad() {
  if (portalKeypadVisible || portalUnlocking) return;
  portalKeypadVisible = true;
  portalGate.classList.add("is-keypad-visible");
  portalKeypad.setAttribute("aria-hidden", "false");
  window.setTimeout(() => portalKeyInput.focus(), 420);
}

portalGate.addEventListener("portal-keypad-request", revealPortalKeypad);
portalHandleTrigger.addEventListener("click", revealPortalKeypad);
portalKeyInput.addEventListener("input", () => {
  portalStatus.textContent = "FASILITO";
});
portalKeyInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  validatePortalCode();
});
portalKeypad.addEventListener("submit", (event) => {
  event.preventDefault();
  validatePortalCode();
});

function resetResponseState() {
  closeResponseDialog();
  hideResponseInvite();
  responseUnlocked = false;
  responseSendClicks = 0;
  responseResolved = false;
  responseSubmitting = false;
  responseQuestion.hidden = false;
  responseFinal.hidden = true;
  responseDialog.classList.remove("is-reveal");
  responseDialog.setAttribute("aria-labelledby", "response-title");
  responseDialog.removeAttribute("aria-label");
  responseDialog.removeAttribute("tabindex");
  responseClose.setAttribute("aria-label", "Cerrar la pregunta");
  responseResultKicker.textContent = "tenemos un plan";
  responseResultCopy.textContent = "Respuesta enviada ♡";
  responseDate.disabled = false;
  responseResultImage.removeAttribute("src");
  responseResultImage.alt = "";
  responseSend.disabled = false;
  responseTease.textContent = "";
}

function getTapRequirement() {
  return activeLetterModel?.tapCountRequired ?? 3;
}

function getClosedHint() {
  const requiredTaps = getTapRequirement();
  return requiredTaps === 1 ? "Toca el sello para abrirla" : `Toca a Usagi ${requiredTaps} veces para abrirla`;
}

function updateTapInterface() {
  const requiredTaps = getTapRequirement();
  tapProgress.forEach((dot, index) => {
    dot.hidden = index >= requiredTaps;
    dot.classList.toggle("is-filled", index < tapCount);
  });
  stage.dataset.tapRequirement = String(requiredTaps);
  seal.setAttribute("aria-label", requiredTaps === 1
    ? "Abrir la carta"
    : `Tocar a Usagi: faltan ${Math.max(0, requiredTaps - tapCount)} toques`);
}

function applyParticles(model) {
  const symbols = model.particles ?? ["🌹", "✦", "🌹", "★", "🌹", "✦", "🌹", "★"];
  particles.forEach((particle, index) => {
    const symbol = symbols[index % symbols.length];
    particle.textContent = symbol;
    particle.classList.toggle("rose-particle", symbol === "🌹");
    particle.classList.toggle("heart-particle", symbol === "♥" || symbol === "♡");
  });
}

function ensureEnvelopeModule() {
  if (!envelopeModulePromise) envelopeModulePromise = import("./three-envelope.js?v=letter-final-2");
  return envelopeModulePromise;
}

function startLetterArrival() {
  window.clearTimeout(arrivalReadyTimer);
  window.clearTimeout(arrivalEndTimer);
  stage.classList.remove("is-arriving");
  stage.dataset.sceneReady = "false";
  requestAnimationFrame(() => {
    stage.classList.add("is-arriving");
    hint.textContent = "Tu carta está llegando…";
    const reduceArrivalMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    arrivalReadyTimer = window.setTimeout(() => {
      stage.dataset.sceneReady = "true";
      stage.dispatchEvent(new CustomEvent("scene-ready"));
    }, reduceArrivalMotion ? 0 : 180);
    arrivalEndTimer = window.setTimeout(() => {
      stage.classList.remove("is-arriving");
      if (!toggle.checked && tapCount === 0) hint.textContent = getClosedHint();
    }, reduceArrivalMotion ? 50 : 2280);
  });
}

async function applyLetterModel(modelId) {
  const model = letterModels[modelId];
  if (!model) return;
  const firstSelection = !hasSelectedLetter;

  if (toggle.checked) {
    toggle.checked = false;
    setOpen(false);
  }
  closeReader();
  resetResponseState();
  activeLetterModelId = modelId;
  activeLetterModel = model;
  updateLetterRoute(model);
  readerPageHeadings = model.headings;
  letterPageCount = model.pages.length;

  letterEyebrow.textContent = model.eyebrow;
  selectedLetterDate.textContent = model.dateLabel;
  letterDate.textContent = model.letterDate;
  readerKicker.textContent = model.letterDate;
  letterHeading.textContent = model.headings[0];
  title.textContent = "Tienes una carta";
  hint.textContent = getClosedHint();
  sealImage.src = model.visual.sealSrc;
  applyParticles(model);
  responseInstruction.textContent = model.interaction?.instruction ?? "";
  responseStampTrigger.setAttribute("aria-label", model.interaction?.ariaLabel ?? "Abrir el sello de la carta");
  tapCount = 0;
  updateTapInterface();

  letter.querySelectorAll("[data-letter-page]").forEach((element) => element.remove());
  model.pages.forEach((page, pageIndex) => {
    page.forEach((entry) => {
      const paragraph = document.createElement("p");
      const normalizedEntry = typeof entry === "string" ? { text: entry } : entry;
      paragraph.textContent = normalizedEntry.text;
      paragraph.dataset.letterPage = String(pageIndex);
      if (normalizedEntry.signature) paragraph.classList.add("signature");
      letter.append(paragraph);
    });
  });

  stage.dataset.letterTheme = model.visual.theme;
  letterReader.dataset.letterTheme = model.visual.theme;
  stage.letterModelDetail = {
    id: modelId,
    pageHeadings: [...model.headings],
    responseEnabled: model.responseEnabled,
    interaction: model.interaction,
    ...model.visual
  };
  letterDateOptions.forEach((option) => {
    option.setAttribute("aria-selected", String(option.dataset.letterModel === modelId));
  });
  setLetterArchiveOpen(false);
  setLetterPage(0);
  stage.removeAttribute("aria-hidden");
  await ensureEnvelopeModule();
  stage.dispatchEvent(new CustomEvent("letter-model-change", { detail: stage.letterModelDetail }));
  if (firstSelection) {
    hasSelectedLetter = true;
    letterArchive.classList.remove("is-choosing");
    scene.classList.remove("is-choosing-letter");
    scene.classList.add("has-letter");
    startLetterArrival();
  }
}

letterDateToggle.addEventListener("click", () => {
  setLetterArchiveOpen(!letterArchive.classList.contains("is-open"));
});
letterDateOptions.forEach((option) => {
  option.addEventListener("click", () => applyLetterModel(option.dataset.letterModel));
});
document.addEventListener("click", (event) => {
  if (!letterArchive.contains(event.target)) setLetterArchiveOpen(false);
});

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
  if (!activeLetterModel?.interaction || !toggle.checked || currentLetterPage !== letterPageCount - 1) return;
  responseUnlocked = true;
  stage.classList.add("response-ready");
  responseInstruction.setAttribute("aria-hidden", "false");
  responseStampTrigger.disabled = false;
}

function updateResponseInvite() {
  hideResponseInvite();
  if (!activeLetterModel?.interaction || !toggle.checked || currentLetterPage !== letterPageCount - 1) return;
  if (responseUnlocked) {
    showResponseInvite();
    return;
  }
  responseReadyTimer = window.setTimeout(showResponseInvite, activeLetterModel.interaction.delay ?? 7000);
}

function openResponseDialog() {
  const interaction = activeLetterModel?.interaction;
  if (!interaction || responseStampTrigger.disabled || !toggle.checked) return;
  responseOpenedFrom = document.activeElement;
  if (interaction.type === "reveal") {
    responseResolved = true;
    responseDialog.classList.add("is-reveal");
    responseDialog.removeAttribute("aria-labelledby");
    responseDialog.setAttribute("aria-label", interaction.imageAlt ?? "Sorpresa");
    responseDialog.tabIndex = -1;
    responseClose.setAttribute("aria-label", "Cerrar la sorpresa");
    responseQuestion.hidden = true;
    responseFinal.hidden = false;
    responseResultKicker.textContent = interaction.kicker ?? "una pequeña sorpresa";
    responseResultTitle.textContent = interaction.title ?? "Para ti ♡";
    responseResultCopy.textContent = interaction.copy ?? "";
    responseResultImage.src = interaction.image;
    responseResultImage.alt = interaction.imageAlt ?? "Una sorpresa";
  }
  responseDialog.hidden = false;
  document.body.classList.add("response-open");
  stage.setAttribute("aria-hidden", "true");
  requestAnimationFrame(() => {
    if (interaction.type === "reveal") responseDialog.focus();
    else (responseResolved ? responseDone : responseDate).focus();
  });
}

function closeResponseDialog() {
  if (responseDialog.hidden) return;
  responseDialog.hidden = true;
  document.body.classList.remove("response-open");
  stage.removeAttribute("aria-hidden");
  responseOpenedFrom?.focus?.();
}

function showResponseFinal(result) {
  responseResolved = true;
  responseSubmitting = false;
  const choseDate = result === "date";
  responseResultTitle.textContent = choseDate ? "¡Yahaaa!" : "Okk…";
  responseResultImage.src = choseDate ? "./assets/usagi-happy.gif" : "./assets/usagi-emo.jpg";
  responseResultImage.alt = choseDate ? "Usagi corriendo feliz" : "Usagi emo";
  responseResultKicker.textContent = "tenemos un plan";
  responseResultCopy.textContent = "Respuesta enviada ♡";
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

function turnLetterPage(direction) {
  const nextPage = Math.max(0, Math.min(letterPageCount - 1, currentLetterPage + direction));
  if (nextPage === currentLetterPage) return;
  pageTurnSound.pause();
  pageTurnSound.currentTime = 0;
  pageTurnSound.volume = 0.58;
  pageTurnSound.playbackRate = direction > 0 ? 1 : 0.94;
  pageTurnSound.play().catch(() => {});
  setLetterPage(nextPage);
}

pagePrevious.addEventListener("click", () => turnLetterPage(-1));
pageNext.addEventListener("click", () => turnLetterPage(1));
readerPrevious.addEventListener("click", () => turnLetterPage(-1));
readerNext.addEventListener("click", () => turnLetterPage(1));
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
async function submitResponse(choice) {
  if (responseSubmitting || responseResolved) return;
  responseSubmitting = true;
  responseDate.disabled = true;
  responseSend.disabled = true;
  responseTease.textContent = "Enviando respuesta…";

  const formData = new FormData();
  formData.append("respuesta", choice === "date" ? "Salir conmigo" : "Que le envíes el regalo");
  formData.append("destinataria", "Martina");
  formData.append("_subject", "Martina respondió la carta");

  try {
    const formResponse = await fetch(responseEndpoint, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" }
    });
    if (!formResponse.ok) throw new Error("No se pudo enviar la respuesta");
    showResponseFinal(choice);
  } catch (_) {
    responseSubmitting = false;
    responseDate.disabled = false;
    responseSend.disabled = false;
    responseTease.textContent = "No se pudo enviar. Toca la opción nuevamente.";
  }
}

responseDate.addEventListener("click", () => {
  playTapSound(2);
  submitResponse("date");
});
responseSend.addEventListener("click", () => {
  playTapSound(1);
  responseSendClicks = Math.min(6, responseSendClicks + 1);
  responseTease.textContent = Array.from({ length: responseSendClicks }, () => "Huh…").join(" ");
  if (responseSendClicks >= 6) {
    responseSend.disabled = true;
    window.setTimeout(() => submitResponse("gift"), 520);
  }
});
document.addEventListener("keydown", (event) => {
  const portalIsActive = portalGate.getAttribute("aria-hidden") === "false" && !portalGate.classList.contains("portal-away");
  if (portalIsActive && portalKeypadVisible && !portalUnlocking) {
    if (event.key === "Escape") {
      event.preventDefault();
      clearPortalCode();
      portalKeyInput.focus();
    }
    return;
  }
  if (event.key !== "Escape") return;
  if (letterArchive.classList.contains("is-open")) setLetterArchiveOpen(false);
  else if (!responseDialog.hidden) closeResponseDialog();
  else if (!letterReader.hidden) closeReader();
});
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
    revealPortal();
  }, 350);
}
requestAnimationFrame(load);

function setOpen(open) {
  window.clearTimeout(closeReadyTimer);
  close.disabled = true;
  letter.setAttribute("aria-hidden", String(!open));
  title.textContent = open ? activeLetterModel.openTitle : "Tienes una carta";
  hint.textContent = open ? activeLetterModel.openHint : getClosedHint();
  stage.classList.toggle("is-open", open);
  close.classList.toggle("visible", open);
  letterDateToggle.disabled = open;
  letterArchive.classList.toggle("is-disabled", open);
  if (open) setLetterArchiveOpen(false);

  if (open) {
    const closeDelay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 50 : 3250;
    closeReadyTimer = window.setTimeout(() => { close.disabled = false; }, closeDelay);
  }

  if (!open) {
    closeReader();
    resetResponseState();
    setLetterPage(0);
    tapCount = 0;
    openingQueued = false;
    seal.disabled = false;
    updateTapInterface();
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

  const requiredTaps = getTapRequirement();
  const soundSequence = activeLetterModel.tapSoundSequence ?? [0, 1, 2];
  playTapSound(soundSequence[Math.min(tapCount, soundSequence.length - 1)] ?? 2);
  tapCount += 1;
  updateTapInterface();
  stage.dispatchEvent(new CustomEvent("seal-tap", { detail: { step: tapCount } }));

  const remaining = requiredTaps - tapCount;
  seal.setAttribute("aria-label", remaining
    ? `Tocar el sello: ${remaining === 1 ? "falta 1 toque" : `faltan ${remaining} toques`}`
    : "Abriendo la carta");
  hint.textContent = activeLetterModel.tapHints?.[tapCount - 1] ?? "¡IYAHAAA!";

  if (tapCount === requiredTaps) {
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
pageTurnSound.load();

function enableMobileParallax() {
  const usesTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!usesTouch || reduceMotion) return;

  let permissionRequested = false;
  let orientationActive = false;
  let baseBeta = null;
  let baseGamma = null;

  const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));
  const angleDelta = (value, baseline) => ((value - baseline + 540) % 360) - 180;
  const emitParallax = (x, y) => {
    window.dispatchEvent(new CustomEvent("mobile-parallax", { detail: { x, y } }));
  };

  const recalibrate = () => {
    baseBeta = null;
    baseGamma = null;
    emitParallax(0, 0);
  };

  const handleOrientation = (event) => {
    if (!Number.isFinite(event.beta) || !Number.isFinite(event.gamma)) return;
    orientationActive = true;
    if (baseBeta === null || baseGamma === null) {
      baseBeta = event.beta;
      baseGamma = event.gamma;
      emitParallax(0, 0);
      return;
    }

    const rawX = clamp(angleDelta(event.gamma, baseGamma) / 18, -1, 1);
    const rawY = clamp(angleDelta(event.beta, baseBeta) / 18, -1, 1);
    const screenAngle = ((window.screen.orientation?.angle ?? window.orientation ?? 0) + 360) % 360;
    if (screenAngle === 90) emitParallax(-rawY, rawX);
    else if (screenAngle === 270) emitParallax(rawY, -rawX);
    else if (screenAngle === 180) emitParallax(-rawX, -rawY);
    else emitParallax(rawX, rawY);
  };

  const requestOrientation = async () => {
    if (permissionRequested) return;
    permissionRequested = true;
    const OrientationEvent = window.DeviceOrientationEvent;
    if (!OrientationEvent) return;
    try {
      if (typeof OrientationEvent.requestPermission === "function") {
        const permission = await OrientationEvent.requestPermission();
        if (permission !== "granted") return;
      }
      window.addEventListener("deviceorientation", handleOrientation, { passive: true });
    } catch (_) {
      // El movimiento mediante el dedo permanece disponible como alternativa.
    }
  };

  document.addEventListener("click", requestOrientation, { capture: true, once: true });
  window.addEventListener("orientationchange", recalibrate, { passive: true });
  window.addEventListener("blur", recalibrate);
  window.addEventListener("pointermove", (event) => {
    if (orientationActive || event.pointerType !== "touch") return;
    emitParallax(
      (event.clientX / Math.max(1, window.innerWidth) - 0.5) * 0.9,
      (event.clientY / Math.max(1, window.innerHeight) - 0.5) * 0.7
    );
  }, { passive: true });
  window.addEventListener("pointerup", () => {
    if (!orientationActive) emitParallax(0, 0);
  }, { passive: true });
}

enableMobileParallax();
