// script.js

// ------------------------------
// CONFIG: Update only this section when you add new episodes
// Folder structure expected (case-sensitive on GitHub Pages):
//  - Audio/<id>.mp4
//  - Images/<id>_transcription.txt
//  - Images/<id>_summary.txt
//  - (Optional) Images/<id>_summary.pdf
// ------------------------------

// ✅ Now organized by TOPIC → episodes
const TOPIC_LIBRARY = [
  {
    topic: "Aruna Prashnam (Shri Ram Kumar)",
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
      },
      {
        id: "106_Panchadi_3_Part1",
        date: "2026-01-23",
        title: "Aruna Prashnam - Panchadi 3 - Part1",
        audio: "Audio/106_3rd_Panchadi_Part1.mp4",
        transcriptionDocx: "Images/106_3rd_Panchadi_Part1_transcription.txt",
        summaryDocx: "Images/106_3rd_Panchadi_Part1_summary.txt",
        note: "Aruna Prashnam - Panchadi 3 - Part1"
      },
      {
        id: "107_Panchadi_3_Part2",
        date: "2026-01-25",
        title: "Aruna Prashnam - Panchadi 3 - Part2",
        audio: "Audio/107_3rd_Panchadi_Part2.mp4",
        transcriptionDocx: "Images/107_3rd_Panchadi_Part2_transcription.txt",
        summaryDocx: "Images/107_3rd_Panchadi_Part2_summary.txt",
        note: "Aruna Prashnam - Panchadi 3 - Part2"
      },
      {
        id: "108_Panchadi_4",
        date: "2026-02-02",
        title: "Aruna Prashnam - Panchadi 4",
        audio: "Audio/108_4th_Panchadi.mp4",
        transcriptionDocx: "Images/108_4th_Panchadi_transcription.txt",
        summaryDocx: "Images/108_4th_Panchadi_summary.txt",
        note: "Aruna Prashnam - Panchadi 4"
      },
      {
        id: "109_Panchadi_5",
        date: "2026-02-04",
        title: "Aruna Prashnam - Panchadi 5",
        audio: "Audio/109_5th_Panchadi.mp4",
        transcriptionDocx: "Images/109_5th_Panchadi_transcription.txt",
        summaryDocx: "Images/109_5th_Panchadi_summary.txt",
        note: "Aruna Prashnam - Panchadi 5"
      }
    ]
  },

  // ✅ Move Laghu Sankalpam under Panchangam topic
  {
    topic: "Panchangam (Shri Ashok Krishnamoorthy)",
    episodes: [
      {
        id: "P01_Sankalpam_Basics",
        date: "2026-01-30",
        title: "Understanding Laghu Sankalpam (Shri Ashok K)",
        audio: "Audio/20260131_1.mp4",
        transcriptionDocx: "Images/sankalpa_transcription.txt",
        summaryDocx: "Images/sankalpa_summary.txt",        // readable text shown on page
        summaryPdf: "Images/sankalpa_summary.pdf",         // link shown on top
        note: "Laghu sankalpam basics"
      },
       {
        id: "P02_Sankalpam_Basics",
        date: "2026-02-04",
        title: "Understanding Maha Sankalpam - Part#1 (Shri Ashok K)",
        audio: "Audio/20260204_Panchangam_1.mp4",
        transcriptionDocx: "Images/Mahasankalpam_transcription.txt",
        summaryDocx: "Images/Mahasankalpam_summary.txt",        // readable text shown on page
        note: "Maha sankalpam basics"
      },
       {
        id: "P03_Sankalpam_Basics",
        date: "2026-02-04",
        title: "Understanding Maha Sankalpam - Part#2 (Shri Ashok K)",
        audio: "Audio/20260204_Panchangam_2.mp4",
        transcriptionDocx: "Images/Mahasankalpam_transcription_part2.txt",
        summaryDocx: "Images/Mahasankalpam_summary_part2.txt",        // readable text shown on page
        note: "Maha sankalpam basics"
      }
    ]
  }
];

// ------------------------------
// UI Elements
// ------------------------------
const $ = (id) => document.getElementById(id);

const topicSelect = $("topicSelect");
const podcastSelect = $("dateSelect");

const btnTranscription = $("btnTranscription");
const btnSummary = $("btnSummary");

const audioPlayer = $("audioPlayer");
const audioError = $("audioError");

const docTitle = $("docTitle");
const docBody = $("docBody");
const docError = $("docError");

// ------------------------------
// State
// ------------------------------
let currentMode = "transcription"; // "transcription" | "summary"
let currentTopic = TOPIC_LIBRARY[0]?.topic || "";
let currentEpisode = null;

// ------------------------------
// Helpers
// ------------------------------
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

function findTopicObj(topicName) {
  return TOPIC_LIBRARY.find(t => t.topic === topicName) || null;
}

function findEpisodeById(topicObj, episodeId) {
  if (!topicObj) return null;
  return (topicObj.episodes || []).find(e => e.id === episodeId) || null;
}

function resetPlayer() {
  if (!audioPlayer) return;
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
}

function setPlayerSource(src) {
  if (!audioPlayer) return;
  audioPlayer.src = src;
  audioPlayer.load(); // DO NOT autoplay
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
  const normalized = txt.replace(/\r/g, "").trim();
  if (!normalized) return "<p>(No content found)</p>";

  const blocks = normalized.split(/\n\s*\n+/g);
  return blocks.map(block => {
    const safe = escapeHtml(block).replace(/\n/g, "<br>");
    return `<p>${safe}</p>`;
  }).join("");
}

async function fetchTxtAsHtml(txtPath) {
  const res = await fetch(txtPath, { cache: "no-cache" });
  if (!res.ok) {
    throw new Error(
      `Could not load file:\n${txtPath}\n\nCheck file name and folder capitalization.`
    );
  }
  const txt = await res.text();
  return txtToHtml(txt);
}

async function loadTxtToHtml(txtPath) {
  clearError(docError);
  if (docBody) docBody.innerHTML = "Loading…";

  try {
    const html = await fetchTxtAsHtml(txtPath);
    docBody.innerHTML = html;
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

  // Audio (manual play only)
  resetPlayer();
  setPlayerSource(ep.audio);

  audioPlayer.onerror = () => {
    showError(
      audioError,
      `Audio failed to load:\n${ep.audio}\n\nCheck file path and commit status.`
    );
  };

  // Load transcription / summary
  if (currentMode === "transcription") {
    await loadTxtToHtml(ep.transcriptionDocx);
  } else {
    // Summary view:
    // 1) show PDF link(s) on top if available
    // 2) show summary TXT below
    if (ep.summaryPdf && typeof ep.summaryPdf === "string" && ep.summaryPdf.trim()) {
      clearError(docError);

      if (docBody) {
        docBody.innerHTML = `
          <div class="pdfActions">
            <a href="${ep.summaryPdf}" target="_blank" rel="noopener">Open PDF summary in new tab</a>
            <a href="${ep.summaryPdf}" download>Download PDF</a>
          </div>
          <div id="summaryTextInner">Loading…</div>
        `;
      }

      try {
        const html = await fetchTxtAsHtml(ep.summaryDocx);
        const inner = document.getElementById("summaryTextInner");
        if (inner) inner.innerHTML = html;
      } catch (err) {
        showError(docError, String(err));
      }
    } else {
      await loadTxtToHtml(ep.summaryDocx);
    }
  }
}

// ------------------------------
// UI population
// ------------------------------
function populateTopicSelect() {
  if (!topicSelect) return;
  topicSelect.innerHTML = "";

  const topics = TOPIC_LIBRARY.map(t => t.topic);
  if (!topics.length) {
    const opt = document.createElement("option");
    opt.textContent = "(No topics yet)";
    topicSelect.appendChild(opt);
    return;
  }

  topics.forEach(name => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    topicSelect.appendChild(opt);
  });

  // Default = first
  topicSelect.value = currentTopic || topics[0];
}

function populatePodcastSelect(topicObj) {
  if (!podcastSelect) return;
  podcastSelect.innerHTML = "";

  const eps = (topicObj?.episodes || []).slice().sort(sortByDateDesc);

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
topicSelect?.addEventListener("change", async () => {
  currentTopic = topicSelect.value;

  const topicObj = findTopicObj(currentTopic);
  populatePodcastSelect(topicObj);

  const ep = findEpisodeById(topicObj, podcastSelect.value);
  if (ep) await loadEpisode(ep);
});

podcastSelect?.addEventListener("change", async () => {
  const topicObj = findTopicObj(currentTopic);
  const ep = findEpisodeById(topicObj, podcastSelect.value);
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
  // Topic dropdown
  populateTopicSelect();

  // Podcast dropdown for selected topic
  const topicObj = findTopicObj(topicSelect?.value || currentTopic);
  currentTopic = topicObj?.topic || currentTopic;

  populatePodcastSelect(topicObj);

  setToggle("transcription");

  const ep = findEpisodeById(topicObj, podcastSelect.value);
  if (ep) loadEpisode(ep);
})();
