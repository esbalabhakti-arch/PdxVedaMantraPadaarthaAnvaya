// ------------------------------
// CONFIG: Update only this section when you add new episodes
// Folder structure expected:
//  - Audio/<yourfile>.mp4
//  - Images/<yourfile>_transcription.docx
//  - Images/<yourfile>_summary.docx
// Banner expected in repo root:
//  - Vedam_Podcast_Page_Banner.png
// ------------------------------

const PODCAST_LIBRARY = [
  {
    text: "Aruna Prashnam",
    episodes: [
      {
        // Use a stable "id" for internal reference
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

  // Add more Vedic texts like this:
  // {
  //   text: "Mahānyāsam",
  //   episodes: [
  //     { id:"...", date:"2026-01-24", title:"...", audio:"Audio/....mp4", transcriptionDocx:"Images/..._transcription.docx", summaryDocx:"Images/..._summary.docx", note:"..." }
  //   ]
  // }
];

// ------------------------------
// UI Elements
// ------------------------------
const textSelect = document.getElementById("textSelect");
const dateSelect = document.getElementById("dateSelect");
const btnTranscription = document.getElementById("btnTranscription");
const btnSummary = document.getElementById("btnSummary");
const statusMsg = document.getElementById("statusMsg");

const episodeTitle = document.getElementById("episodeTitle");
const episodeMeta = document.getElementById("episodeMeta");

const audioPlayer = document.getElementById("audioPlayer");
const audioError = document.getElementById("audioError");

const docTitle = document.getElementById("docTitle");
const docBody = document.getElementById("docBody");
const docDownload = document.getElementById("docDownload");
const docError = document.getElementById("docError");

// State
let currentMode = "transcription"; // "transcription" | "summary"
let currentText = null;
let currentEpisode = null;

// ------------------------------
// Helpers
// ------------------------------
function setStatus(msg) {
  statusMsg.textContent = msg;
}

function showError(el, msg) {
  el.style.display = "block";
  el.textContent = msg;
}

function clearError(el) {
  el.style.display = "none";
  el.textContent = "";
}

function clearDoc() {
  docBody.innerHTML = "Select an episode to load transcription/summary.";
  docDownload.href = "#";
  docDownload.removeAttribute("download");
}

function setToggle(mode) {
  currentMode = mode;
  if (mode === "transcription") {
    btnTranscription.classList.add("active");
    btnSummary.classList.remove("active");
    docTitle.textContent = "Transcription";
  } else {
    btnSummary.classList.add("active");
    btnTranscription.classList.remove("active");
    docTitle.textContent = "Podcast Summary";
  }
}

function sortByDateDesc(a, b) {
  // Expect YYYY-MM-DD
  return (a.date < b.date) ? 1 : (a.date > b.date) ? -1 : 0;
}

function findTextObj(textName) {
  return PODCAST_LIBRARY.find(t => t.text === textName) || null;
}

function findEpisodeByDate(textObj, dateValue) {
  if (!textObj) return null;
  return textObj.episodes.find(e => e.date === dateValue) || null;
}

function stopAndResetAudio() {
  try {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
  } catch (_) {}
}

// ------------------------------
// DOCX -> HTML loading via Mammoth
// ------------------------------
async function loadDocxToHtml(docxPath) {
  clearError(docError);
  docBody.innerHTML = "Loading…";

  try {
    const res = await fetch(docxPath, { cache: "no-cache" });
    if (!res.ok) {
      throw new Error(`Could not fetch file: ${docxPath}\nHTTP ${res.status} ${res.statusText}`);
    }

    const arrayBuffer = await res.arrayBuffer();

    // Convert docx to HTML
    const result = await mammoth.convertToHtml({ arrayBuffer });
    const html = result.value || "";
    const messages = result.messages || [];

    docBody.innerHTML = html.trim() ? html : "<p>(No content found in document.)</p>";

    if (messages.length) {
      // Non-fatal warnings
      console.log("Mammoth messages:", messages);
    }

    // Allow download link
    docDownload.href = docxPath;
    docDownload.setAttribute("download", docxPath.split("/").pop());

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

  episodeTitle.textContent = ep.title || "Selected episode";
  episodeMeta.textContent = `${currentText} • ${ep.date}${ep.note ? " • " + ep.note : ""}`;

  // Load audio
  setStatus("Loading audio…");
  stopAndResetAudio();
  audioPlayer.src = ep.audio;
  audioPlayer.load();

  // Autoplay when metadata ready
  const tryAutoplay = async () => {
    try {
      await audioPlayer.play();
      setStatus("Playing.");
    } catch (e) {
      // Autoplay may be blocked in some browsers until user interacts once
      setStatus("Ready (autoplay may be blocked until you press Play once).");
      showError(audioError, "Autoplay was blocked by your browser. Click Play once, then future selections will autoplay.");
    }
  };

  // Attempt autoplay when can play
  audioPlayer.oncanplay = () => { tryAutoplay(); };

  audioPlayer.onerror = () => {
    setStatus("Audio failed to load.");
    showError(audioError, `Audio failed to load: ${ep.audio}\nCheck the file path and that it is committed to GitHub.`);
  };

  // Load document based on mode
  if (currentMode === "transcription") {
    setStatus("Loading transcription…");
    await loadDocxToHtml(ep.transcriptionDocx);
    setStatus("Ready.");
  } else {
    setStatus("Loading summary…");
    await loadDocxToHtml(ep.summaryDocx);
    setStatus("Ready.");
  }
}

// ------------------------------
// UI population
// ------------------------------
function populateTextSelect() {
  textSelect.innerHTML = "";
  PODCAST_LIBRARY.forEach(t => {
    const opt = document.createElement("option");
    opt.value = t.text;
    opt.textContent = t.text;
    textSelect.appendChild(opt);
  });
}

function populateDateSelect(textObj) {
  dateSelect.innerHTML = "";

  const episodes = (textObj?.episodes || []).slice().sort(sortByDateDesc);

  episodes.forEach(ep => {
    const opt = document.createElement("option");
    opt.value = ep.date;
    opt.textContent = ep.date;
    dateSelect.appendChild(opt);
  });

  // If no episodes
  if (!episodes.length) {
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = "(No episodes yet)";
    dateSelect.appendChild(opt);
  }
}

// ------------------------------
// Event handlers
// ------------------------------
textSelect.addEventListener("change", async () => {
  currentText = textSelect.value;
  const textObj = findTextObj(currentText);
  populateDateSelect(textObj);

  const firstDate = dateSelect.value;
  const ep = findEpisodeByDate(textObj, firstDate);

  clearDoc();
  if (ep) await loadEpisode(ep);
});

dateSelect.addEventListener("change", async () => {
  const textObj = findTextObj(currentText);
  const ep = findEpisodeByDate(textObj, dateSelect.value);
  clearDoc();
  if (ep) await loadEpisode(ep);
});

btnTranscription.addEventListener("click", async () => {
  setToggle("transcription");
  if (currentEpisode) await loadEpisode(currentEpisode);
});

btnSummary.addEventListener("click", async () => {
  setToggle("summary");
  if (currentEpisode) await loadEpisode(currentEpisode);
});

// ------------------------------
// Initial load
// ------------------------------
(function init() {
  populateTextSelect();

  // Default to first Vedic text
  currentText = textSelect.value || (PODCAST_LIBRARY[0] && PODCAST_LIBRARY[0].text) || null;

  const textObj = findTextObj(currentText);
  populateDateSelect(textObj);

  setToggle("transcription");

  const ep = findEpisodeByDate(textObj, dateSelect.value);
  if (ep) {
    loadEpisode(ep);
  } else {
    setStatus("Ready.");
  }
})();
