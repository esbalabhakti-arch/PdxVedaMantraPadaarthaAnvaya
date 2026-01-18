// ------------------------------
// CONFIG: Update only this section when you add new episodes
// Folder structure expected (case-sensitive on GitHub Pages):
//  - Audio/<id>.mp4
//  - Images/<id>_transcription.docx
//  - Images/<id>_summary.docx
// ------------------------------

const PODCAST_LIBRARY = [
  {
    text: "Aruna Prashnam",
    episodes: [
      {
        id: "101_Intro_1",
        date: "2026-01-13",
        title: "Introduction —  Aruṇa Prashnam overview - 1",
        audio: "Audio/101_Intro_1.mp4",
        transcriptionDocx: "Images/101_Intro_1_transcription.docx",
        summaryDocx: "Images/101_Intro_1_summary.docx",
        note: "Background on Aruna Prashnam,Taittirīya Āraṇyaka structure."
      },
      
      {
        id: "102_Intro_2",
        date: "2026-01-14",
        title: "Introduction —  Aruṇa Prashnam overview - 2",
        audio: "Audio/102_Intro_2.mp4",
        transcriptionDocx: "Images/102_Intro_2_transcription.docx",
        summaryDocx: "Images/102_Intro_2_summary.docx",
        note: " Aruna Prashnam Introduction 2"
      },
            
      {
        id: "103_Panchadi_1",
        date: "2026-01-15",
        title: "Aruna Prashnam - Panchadi 1",
        audio: "Audio/103_1st_Panchadi.mp4",
        transcriptionDocx: "Images/103_1st_Panchadi_transcription.docx",
        summaryDocx: "Images/103_1st_Panchadi_summary.docx",
        note: "Aruna Prashnam - Panchadi 1"
      }
    ]
  }
];

// ------------------------------
// UI Elements
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
  audioPlayer.src = src;
  audioPlayer.load();
}

// ------------------------------
// DOCX -> HTML loading via Mammoth
// ------------------------------
async function loadDocxToHtml(docxPath) {
  clearError(docError);
  if (docBody) docBody.innerHTML = "Loading…";

  if (!window.mammoth) {
    showError(docError, "mammoth.js did not load. Check your internet connection or script tag.");
    return;
  }

  try {
    const res = await fetch(docxPath, { cache: "no-cache" });
    if (!res.ok) {
      throw new Error(
        `Could not fetch: ${docxPath}\n` +
        `HTTP ${res.status} ${res.statusText}\n\n` +
        `Check that the file exists in your repo and folder names match exactly (Audio vs audio, Images vs images).`
      );
    }

    const arrayBuffer = await res.arrayBuffer();
    const result = await mammoth.convertToHtml({ arrayBuffer });

    const html = (result.value || "").trim();
    if (docBody) docBody.innerHTML = html ? html : "<p>(No content found in document.)</p>";
  } catch (err) {
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

  // Load audio
  setStatus("Loading audio…");
  stopAndResetPlayer();
  setPlayerSource(ep.audio);

  const tryAutoplay = async () => {
    try {
      await audioPlayer.play();
      setStatus("Playing.");
    } catch {
      setStatus("Ready (autoplay may be blocked; click Play once).");
      showError(
        audioError,
        "Autoplay was blocked by your browser.\nClick Play once, then future selections will usually autoplay."
      );
    }
  };

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
        `Tip: MP3 is the most compatible format.`
      );
    };
  }

  // Load transcription/summary
  if (currentMode === "transcription") {
    setStatus("Loading transcription…");
    await loadDocxToHtml(ep.transcriptionDocx);
  } else {
    setStatus("Loading summary…");
    await loadDocxToHtml(ep.summaryDocx);
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

function populatePodcastSelect(textObj) {
  if (!dateSelect) return;
  dateSelect.innerHTML = "";

  const eps = (textObj?.episodes || []).slice().sort(sortByDateDesc);

  if (!eps.length) {
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = "(No podcasts yet)";
    dateSelect.appendChild(opt);
    return;
  }

  eps.forEach(ep => {
    const opt = document.createElement("option");
    opt.value = ep.date;
    // Make it easier when there are many episodes:
    opt.textContent = `${ep.date} — ${ep.title}`;
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
    populatePodcastSelect(textObj);

    const ep = findEpisodeByDate(textObj, dateSelect?.value);
    if (ep) await loadEpisode(ep);
  });
}

if (dateSelect) {
  dateSelect.addEventListener("change", async () => {
    const textObj = findTextObj(currentText);
    const ep = findEpisodeByDate(textObj, dateSelect.value);
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
  populatePodcastSelect(textObj);

  setToggle("transcription");

  const ep = findEpisodeByDate(textObj, dateSelect?.value);
  if (ep) {
    loadEpisode(ep);
  } else {
    if (docBody) docBody.innerHTML = "No podcasts yet.";
    setStatus("Ready.");
  }
})();
