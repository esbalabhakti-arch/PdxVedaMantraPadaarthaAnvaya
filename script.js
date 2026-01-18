// ------------------------------
// CONFIG: Update only this section when you add new episodes
// Folder structure expected (case-sensitive on GitHub Pages):
//  - Audio/<id>.mp4
//  - Images/<id>_transcription.docx
//  - Images/<id>_summary.docx
// Banner expected in repo root:
//  - Vedam_Podcast_Page_Banner.png
// ------------------------------

const PODCAST_LIBRARY = [
  {
    text: "Aruna Prashnam",
    episodes: [
      {
        id: "101_Intro_1",
        date: "2026-01-17",
        title: "Intro — Taittirīya Āraṇyaka & Aruṇam overview",
        audio: "Audio/101_Intro_1.mp4",
        transcriptionDocx: "Images/101_Intro_1_transcription.docx",
        summaryDocx: "Images/101_Intro_1_summary.docx",
        note: "Word-by-word + sentence meaning context; includes background on Taittirīya Āraṇyaka structure."
      }
    ]
  }
];

// ------------------------------
// UI Elements (safe getters)
// ------------------------------
const $ = (id) => document.getElementById(id);

const textSelect = $("textSelect");
const dateSelect = $("dateSelect");
const btnTranscription = $("btnTranscription");
const btnSummary = $("btnSummary");
const statusMsg = $("statusMsg");

const episodeTitle = $("episodeTitle");
const episodeMeta = $("episodeMeta");

const audioPlayer = $("audioPlayer");
const audioError = $("audioError");

const docTitle = $("docTitle");
const docBody = $("docBody");
const docDownload = $("docDownload");
const docError = $("docError");

// State
let currentMode = "transcription"; // "transcription" | "summary"
let currentText = null;
let currentEpisode = null;

// ------------------------------
// Helpers
// ------------------------------
function setStatus(msg) {
  if (statusMsg) statusMsg.textContent = msg;
}

function showError(el, msg) {
  if (!el) return;
  el.style.display = "block";
  el.textContent = msg;
}

function clearError(el) {
  if (!el) return;
  el.style.display = "none";
  el.textContent = "";
}

function clearDoc() {
  if (docBody) docBody.innerHTML = "Select an episode to load transcription or summary.";
  if (docDownload) {
    docDownload.href = "#";
    docDownload.removeAttribute("download");
  }
}

function setToggle(mode) {
  currentMode = mode;

  if (btnTranscription && btnSummary) {
    if (mode === "transcription") {
      btnTranscription.classList.add("active");
      btnSummary.classList.remove("active");
      if (docTitle) docTitle.textContent = "Transcription";
    } else {
      btnSummary.classList.add("active");
      btnTranscription.classList.remove("active");
      if (docTitle) docTitle.textContent = "Podcast Summary";
    }
  }
}

function sortByDateDesc(a, b) {
  return (a.date < b.date) ? 1 : (a.date > b.date) ? -1 : 0;
}

function findTextObj(textName) {
  return PODCAST_LIBRARY.find(t => t.text === textName) || null;
}

function findEpisodeByDate(textObj, dateValue) {
  if (!textObj) return null;
  return textObj.episodes.find(e => e.date === dateValue) || null;
}

function stopAndResetPlayer() {
  if (!audioPlayer) return;
  try {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
  } catch (_) {}
}

function setPlayerSource(src) {
  if (!audioPlayer) return;
  // For <video>, setting src directly is fine.
  audioPlayer.src = src;
  audioPlayer.load();
}

// ------------------------------
// DOCX -> HTML loading via Mammoth
// ------------------------------
async function loadDocxToHtml(docxPath) {
  clearError(docError);
  if (docBody) docBody.innerHTML = "Loading…";

  // Mammoth must exist
  if (!window.mammoth) {
    clearDoc();
    showError(docError, "mammoth.js did not load. Check your internet connection or script tag.");
    return;
  }

  try {
    const res = await fetch(docxPath, { cache: "no-cache" });
    if (!res.ok) {
      throw new Error(
        `Could not fetch: ${docxPath}\n` +
        `HTTP ${res.status} ${res.statusText}\n\n` +
        `Check that the file exists in your repo and the folder names match exactly (Audio vs audio, Images vs images).`
      );
    }

    const arrayBuffer = await res.arrayBuffer();

    const result = await mammoth.convertToHtml({ arrayBuffer });
    const html = (result.value || "").trim();

    if (docBody) docBody.innerHTML = html ? html : "<p>(No content found in document.)</p>";

    if (docDownload) {
      docDownload.href = docxPath;
      docDownload.setAttribute("download", docxPath.split("/").pop());
    }
  } catch (err) {
    clearDoc();
    showError(docError, String(err));
  }
}

// ------------------------------
// Episode loading
// ------------------------------
async function loadEpisode(ep) {
  if (!ep) return;

  currentEpisode = ep;
  clearError(audioError);
  clearError(docError);

  if (episodeTitle) episodeTitle.textContent = ep.title || "Selected episode";
  if (episodeMeta) {
    episodeMeta.textContent = `${currentText} • ${ep.date}${ep.note ? " • " + ep.note : ""}`;
  }

  // Load document first (so user sees content even if autoplay blocked)
  if (currentMode === "transcription") {
    setStatus("Loading transcription…");
    await loadDocxToHtml(ep.transcriptionDocx);
  } else {
    setStatus("Loading summary…");
    await loadDocxToHtml(ep.summaryDocx);
  }

  // Load player (MP4-friendly)
  setStatus("Loading audio…");
  stopAndResetPlayer();
  setPlayerSource(ep.audio);

  // Autoplay attempt
  const tryAutoplay = async () => {
    if (!audioPlayer) return;
    try {
      await audioPlayer.play();
      setStatus("Playing.");
    } catch (e) {
      setStatus("Ready (autoplay may be blocked until you press Play once).");
      showError(
        audioError,
        "Autoplay was blocked by your browser.\nClick Play once, then future selections will usually autoplay."
      );
    }
  };

  // When media is ready, try autoplay
  if (audioPlayer) {
    audioPlayer.oncanplay = () => { tryAutoplay(); };

    audioPlayer.onerror = () => {
      setStatus("Audio failed to load.");
      showError(
        audioError,
        `Audio failed to load: ${ep.audio}\n\n` +
        `Common causes:\n` +
        `1) File path mismatch (case-sensitive)\n` +
        `2) File not committed/pushed to GitHub\n` +
        `3) Browser can't decode the MP4 codec\n\n` +
        `Try: converting to MP3 for maximum compatibility.`
      );
    };
  }

  setStatus("Ready.");
}

// ------------------------------
// UI population
// ------------------------------
function populateTextSelect() {
  if (!textSelect) return;
  textSelect.innerHTML = "";

  PODCAST_LIBRARY.forEach(t => {
    const opt = document.createElement("option");
    opt.value = t.text;
    opt.textContent = t.text;
    textSelect.appendChild(opt);
  });
}

function populateDateSelect(textObj) {
  if (!dateSelect) return;
  dateSelect.innerHTML = "";

  const eps = (textObj?.episodes || []).slice().sort(sortByDateDesc);

  if (!eps.length) {
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = "(No episodes yet)";
    dateSelect.appendChild(opt);
    return;
  }

  eps.forEach(ep => {
    const opt = document.createElement("option");
    opt.value = ep.date;
    opt.textContent = ep.date;
    dateSelect.appendChild(opt);
  });
}

// ------------------------------
// Event handlers
// ------------------------------
if (textSelect) {
  textSelect.addEventListener("change", async () => {
    currentText = textSelect.value;
    const textObj = findTextObj(currentText);
    populateDateSelect(textObj);

    const ep = findEpisodeByDate(textObj, dateSelect?.value);
    clearDoc();
    if (ep) await loadEpisode(ep);
  });
}

if (dateSelect) {
  dateSelect.addEventListener("change", async () => {
    const textObj = findTextObj(currentText);
    const ep = findEpisodeByDate(textObj, dateSelect.value);
    clearDoc();
    if (ep) await loadEpisode(ep);
  });
}

if (btnTranscription) {
  btnTranscription.addEventListener("click", async () => {
    setToggle("transcription");
    if (currentEpisode) await loadEpisode(currentEpisode);
  });
}

if (btnSummary) {
  btnSummary.addEventListener("click", async () => {
    setToggle("summary");
    if (currentEpisode) await loadEpisode(currentEpisode);
  });
}

// ------------------------------
// Initial load
// ------------------------------
(function init() {
  setStatus("Initializing…");

  populateTextSelect();

  currentText =
    (textSelect && textSelect.value) ||
    (PODCAST_LIBRARY[0] && PODCAST_LIBRARY[0].text) ||
    null;

  const textObj = findTextObj(currentText);
  populateDateSelect(textObj);

  setToggle("transcription");

  const ep = findEpisodeByDate(textObj, dateSelect?.value);
  if (ep) {
    loadEpisode(ep);
  } else {
    clearDoc();
    setStatus("Ready.");
  }
})();
