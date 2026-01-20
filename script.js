// ------------------------------
// CONFIG: Update only this section when you add new episodes
// Folder structure expected (case-sensitive on GitHub Pages):
//  - Audio/<id>.mp4
//  - Images/<id>_transcription.txt
//  - Images/<id>_summary.txt
// ------------------------------

const PODCAST_LIBRARY = [
  {
    text: "Aruna Prashnam",
    episodes: [
      {
        id: "101_Intro_1",
        date: "2026-01-13",
        title: "Introduction — Aruṇa Prashnam overview - 1",
        audio: "Audio/101_Intro_1.mp4",
        transcriptionDocx: "Images/101_Intro_1_transcription.txt",
        summaryDocx: "Images/101_Intro_1_summary.txt",
        note: "Background on Aruna Prashnam, Taittirīya Āraṇyaka structure."
      },
      {
        id: "102_Intro_2",
        date: "2026-01-14",
        title: "Introduction — Aruṇa Prashnam overview - 2",
        audio: "Audio/102_Intro_2.mp4",
        transcriptionDocx: "Images/102_Intro_2_transcription.txt",
        summaryDocx: "Images/102_Intro_2_summary.txt",
        note: "Aruna Prashnam Introduction 2"
      },
      {
        id: "103_Panchadi_1",
        date: "2026-01-15",
        title: "Aruna Prashnam - Panchadi 1",
        audio: "Audio/103_1st_Panchadi.mp4",
        transcriptionDocx: "Images/103_1st_Panchadi_transcription.txt",
        summaryDocx: "Images/103_1st_Panchadi_summary.txt",
        note: "Aruna Prashnam - Panchadi 1"
      },
      {
        id: "104_Panchadi_2_Part1",
        date: "2026-01-18",
        title: "Aruna Prashnam - Panchadi 2 - Part1",
        audio: "Audio/104_2nd_Panchadi_Part1.mp4",
        transcriptionDocx: "Images/104_2nd_Panchadi_Part1_transcription.txt",
        summaryDocx: "Images/104_2nd_Panchadi_Part1_summary.txt",
        note: "Aruna Prashnam - Panchadi 2 - Part1"
      },
      {
        id: "105_Panchadi_2_Part2",
        date: "2026-01-20",
        title: "Aruna Prashnam - Panchadi 2 - Part2",
        audio: "Audio/105_2nd_Panchadi_Part2.mp4",
        transcriptionDocx: "Images/105_2nd_Panchadi_Part2_transcription.txt",
        summaryDocx: "Images/105_2nd_Panchadi_Part2_summary.txt",
        note: "Aruna Prashnam - Panchadi 2 - Part2"
      }
    ]
  }
];

// ------------------------------
// UI Elements
// ------------------------------
const $ = (id) => document.getElementById(id);

const textSelect = $("textSelect");
const podcastSelect = $("dateSelect"); // labeled as "Podcast" in UI
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

// ------------------------------
// State
// ------------------------------
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
  return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
}

function findTextObj(textName) {
  return PODCAST_LIBRARY.find(t => t.text === textName) || null;
}

function findEpisodeById(textObj, episodeId) {
  if (!textObj) return null;
  return (textObj.episodes || []).find(e => e.id === episodeId) || null;
}

function resetPlayer() {
  if (!audioPlayer) return;
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
}

function setPlayerSource(src) {
  if (!audioPlayer) return;
  audioPlayer.src = src;
  audioPlayer.load(); // DO NOT play
}

// ------------------------------
// TXT → HTML (simple rendering)
// ------------------------------
function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function txtToHtml(txt) {
  // Keep it simple and readable:
  // - split on blank lines into paragraphs
  // - preserve single newlines as <br>
  const normalized = txt.replace(/\r/g, "").trim();

  if (!normalized) return "<p>(No content found)</p>";

  const blocks = normalized.split(/\n\s*\n+/g);
  const html = blocks.map(block => {
    const safe = escapeHtml(block).replace(/\n/g, "<br>");
    return `<p>${safe}</p>`;
  }).join("");

  return html;
}

async function loadTxtToHtml(txtPath) {
  clearError(docError);
  if (docBody) docBody.innerHTML = "Loading…";

  try {
    const res = await fetch(txtPath, { cache: "no-cache" });
    if (!res.ok) {
      throw new Error(
        `Could not load file:\n${txtPath}\n\nCheck file name and folder capitalization.`
      );
    }

    const txt = await res.text();
    docBody.innerHTML = txtToHtml(txt);
  } catch (err) {
    showError(docError, String(err));
  }
}

// ------------------------------
// Episode loading (NO AUTOPLAY)
// ------------------------------
async function loadEpisode(ep) {
  if (!ep) return;

  currentEpisode = ep;
  clearError(audioError);
  clearError(docError);

  if (episodeTitle) episodeTitle.textContent = ep.title;
  if (episodeMeta) {
    episodeMeta.textContent =
      `${currentText} • ${ep.date}${ep.note ? " • " + ep.note : ""}`;
  }

  // Audio (manual play only)
  setStatus("Ready.");
  resetPlayer();
  setPlayerSource(ep.audio);

  audioPlayer.onerror = () => {
    showError(
      audioError,
      `Audio failed to load:\n${ep.audio}\n\nCheck file path and commit status.`
    );
  };

  // Load text (now using .txt)
  if (currentMode === "transcription") {
    await loadTxtToHtml(ep.transcriptionDocx);
  } else {
    await loadTxtToHtml(ep.summaryDocx);
  }
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
  if (!podcastSelect) return;
  podcastSelect.innerHTML = "";

  const eps = (textObj?.episodes || []).slice().sort(sortByDateDesc);

  if (!eps.length) {
    const opt = document.createElement("option");
    opt.textContent = "(No podcasts yet)";
    podcastSelect.appendChild(opt);
    return;
  }

  eps.forEach(ep => {
    const opt = document.createElement("option");
    opt.value = ep.id;
    opt.textContent = `${ep.date} — ${ep.title}`;
    podcastSelect.appendChild(opt);
  });

  // Default = newest
  podcastSelect.value = eps[0].id;
}

// ------------------------------
// Event handlers
// ------------------------------
textSelect?.addEventListener("change", async () => {
  currentText = textSelect.value;
  const textObj = findTextObj(currentText);
  populatePodcastSelect(textObj);

  const ep = findEpisodeById(textObj, podcastSelect.value);
  if (ep) await loadEpisode(ep);
});

podcastSelect?.addEventListener("change", async () => {
  const textObj = findTextObj(currentText);
  const ep = findEpisodeById(textObj, podcastSelect.value);
  if (ep) await loadEpisode(ep);
});

btnTranscription?.addEventListener("click", async () => {
  setToggle("transcription");
  if (currentEpisode) await loadEpisode(currentEpisode);
});

btnSummary?.addEventListener("click", async () => {
  setToggle("summary");
  if (currentEpisode) await loadEpisode(currentEpisode);
});

// ------------------------------
// Initial load
// ------------------------------
(function init() {
  setStatus("Initializing…");

  populateTextSelect();

  currentText =
    textSelect?.value ||
    PODCAST_LIBRARY[0]?.text ||
    null;

  const textObj = findTextObj(currentText);
  populatePodcastSelect(textObj);

  setToggle("transcription");

  const ep = findEpisodeById(textObj, podcastSelect.value);
  if (ep) loadEpisode(ep);
  else setStatus("Ready.");
})();
