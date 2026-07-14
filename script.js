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
      },
      {
        id: "110_Panchadi_6",
        date: "2026-02-06",
        title: "Aruna Prashnam - Panchadi 6",
        audio: "Audio/110_6th_Panchadi.mp4",
        transcriptionDocx: "Images/110_6th_Panchadi_transcription.txt",
        summaryDocx: "Images/110_6th_Panchadi_summary.txt",
        note: "Aruna Prashnam - Panchadi 6"
      },
      {
        id: "111_Panchadi_7",
        date: "2026-02-13",
        title: "Aruna Prashnam - Panchadi 7",
        audio: "Audio/111_7th_Panchadi.mp4",
        transcriptionDocx: "Images/111_7th_Panchadi_transcription.txt",
        summaryDocx: "Images/111_7th_Panchadi_summary.txt",
        note: "Aruna Prashnam - Panchadi 7"
      },
      {
        id: "112_Panchadi_7_Part2",
        date: "2026-02-14",
        title: "Aruna Prashnam - Panchadi 7 - Part2",
        audio: "Audio/112_7th_Panchadi_Part2.mp4",
        transcriptionDocx: "Images/112_7th_Panchadi_Part2_transcription.txt",
        summaryDocx: "Images/112_7th_Panchadi_Part2_summary.txt",
        note: "Aruna Prashnam - Panchadi 7 - Part2"
      },
      {
        id: "113_Panchadi_8_Part1",
        date: "2026-02-20",
        title: "Aruna Prashnam - Panchadi 8 - Part1",
        audio: "Audio/113_8th_Panchadi_Part1.mp4",
        transcriptionDocx: "Images/113_8th_Panchadi_Part1_transcription.txt",
        summaryDocx: "Images/113_8th_Panchadi_Part1_summary.txt",
        note: "Aruna Prashnam - Panchadi 8 - Part1"
      },
      {
        id: "114_Panchadi_8_Part2",
        date: "2026-02-21",
        title: "Aruna Prashnam - Panchadi 8 - Part2",
        audio: "Audio/114_8th_Panchadi_Part2.mp4",
        transcriptionDocx: "Images/114_8th_Panchadi_Part2_transcription.txt",
        summaryDocx: "Images/114_8th_Panchadi_Part2_summary.txt",
        note: "Aruna Prashnam - Panchadi 8 - Part2"
      },
      {
        id: "115_Panchadi_9_Part1",
        date: "2026-03-01",
        title: "Aruna Prashnam - Panchadi 9 - Part1",
        audio: "Audio/115_9th_Panchadi_Part1.mp4",
        transcriptionDocx: "Images/115_9th_Panchadi_Part1_transcription.txt",
        summaryDocx: "Images/115_9th_Panchadi_Part1_summary.txt",
        note: "Aruna Prashnam - Panchadi 9 - Part1"
      },
      {
        id: "116_Panchadi_9_Part2",
        date: "2026-03-02",
        title: "Aruna Prashnam - Panchadi 9 - Part2",
        audio: "Audio/116_9th_Panchadi_Part2.mp4",
        transcriptionDocx: "Images/116_9th_Panchadi_Part2_transcription.txt",
        summaryDocx: "Images/116_9th_Panchadi_Part2_summary.txt",
        note: "Aruna Prashnam - Panchadi 9 - Part2"
      },
      {
        id: "117_Panchadi_10",
        date: "2026-03-10",
        title: "Aruna Prashnam - Panchadi 10",
        audio: "Audio/117_10th_Panchadi.mpeg",
        transcriptionDocx: "Images/117_10th_Panchadi_transcription.txt",
        summaryDocx: "Images/117_10th_Panchadi_summary.txt",
        note: "Aruna Prashnam - Panchadi 10"
      },
      {
        id: "118_Panchadi_11_Part1",
        date: "2026-03-26",
        title: "Aruna Prashnam - Panchadi 11-Part1",
        audio: "Audio/118_11th_Panchadi_Part1.mpeg",
        transcriptionDocx: "Images/118_11th_Panchadi_Part1_transcription.txt",
        summaryDocx: "Images/118_11th_Panchadi_Part1_summary.txt",
        note: "Aruna Prashnam - Panchadi 11 Part1"
      },
      {
        id: "119_Panchadi_11_Part2",
        date: "2026-03-26",
        title: "Aruna Prashnam - Panchadi 11-Part2",
        audio: "Audio/119_11th_Panchadi_Part2.mpeg",
        transcriptionDocx: "Images/119_11th_Panchadi_Part2_transcription.txt",
        summaryDocx: "Images/119_11th_Panchadi_Part2_summary.txt",
        note: "Aruna Prashnam - Panchadi 11 Part2"
      },
      {
        id: "120_Panchadi_12",
        date: "2026-04-01",
        title: "Aruna Prashnam - Panchadi 12",
        audio: "Audio/120_12th_Panchadi.mp4",
        transcriptionDocx: "Images/120_12th_Panchadi_transcription.txt",
        summaryDocx: "Images/120_12th_Panchadi_summary.txt",
        note: "Aruna Prashnam - Panchadi 12"
      },
      {
        id: "121_Panchadi_13",
        date: "2026-04-14",
        title: "Aruna Prashnam - Panchadi 13",
        audio: "Audio/121_13th_Panchadi.mpeg",
        transcriptionDocx: "Images/121_13th_Panchadi_transcription.txt",
        summaryDocx: "Images/121_13th_Panchadi_summary.txt",
        note: "Aruna Prashnam - Panchadi 13"
      },
      {
        id: "122_Panchadi_14",
        date: "2026-05-01",
        title: "Aruna Prashnam - Panchadi 14",
        audio: "Audio/122_14th_Panchadi.mpeg",
        transcriptionDocx: "Images/122_14th_Panchadi_transcription.txt",
        summaryDocx: "Images/122_14th_Panchadi_summary.txt",
        note: "Aruna Prashnam - Panchadi 14"
      },
      {
        id: "123_Panchadi_15",
        date: "2026-05-11",
        title: "Aruna Prashnam - Panchadi 15",
        audio: "Audio/123_15th_Panchadi.mpeg",
        transcriptionDocx: "Images/123_15th_Panchadi_transcription.txt",
        summaryDocx: "Images/123_15th_Panchadi_summary.txt",
        note: "Aruna Prashnam - Panchadi 15"
      },
      {
        id: "124_Panchadi_16",
        date: "2026-05-24",
        title: "Aruna Prashnam - Panchadi 16",
        audio: "Audio/124_16th_Panchadi.mpeg",
        transcriptionDocx: "Images/124_16th_Panchadi_transcription.txt",
        summaryDocx: "Images/124_16th_Panchadi_summary.txt",
        note: "Aruna Prashnam - Panchadi 16"
      },
      {
        id: "125_Panchadi_17",
        date: "2026-06-05",
        title: "Aruna Prashnam - Panchadi 17",
        audio: "Audio/125_17th_Panchadi.mpeg",
        transcriptionDocx: "Images/125_17th_Panchadi_transcription.txt",
        summaryDocx: "Images/125_17th_Panchadi_summary.txt",
        note: "Aruna Prashnam - Panchadi 17"
      },
      {
        id: "126_Panchadi_18",
        date: "2026-06-07",
        title: "Aruna Prashnam - Panchadi 18",
        audio: "Audio/126_18th_Panchadi.mpeg",
        transcriptionDocx: "Images/126_18th_Panchadi_transcription.txt",
        summaryDocx: "Images/126_18th_Panchadi_summary.txt",
        note: "Aruna Prashnam - Panchadi 18"
      },
      {
        id: "127_Panchadi_19",
        date: "2026-07-08",
        title: "Aruna Prashnam - Panchadi 19",
        audio: "Audio/127_19th_Panchadi.mpeg",
        transcriptionDocx: "Images/127_19th_Panchadi_transcription.txt",
        summaryDocx: "Images/127_19th_Panchadi_summary.txt",
        note: "Aruna Prashnam - Panchadi 19"
      }
    ]
  },

  {
    topic: "Panchangam (Shri Ashok Krishnamoorthy)",
    episodes: [
      {
        id: "P01_Sankalpam_Basics",
        date: "2026-01-30",
        title: "Understanding Laghu Sankalpam (Shri Ashok K)",
        audio: "Audio/20260131_1.mp4",
        transcriptionDocx: "Images/sankalpa_transcription.txt",
        summaryDocx: "Images/sankalpa_summary.txt",
        summaryPdf: "Images/sankalpa_summary.pdf",
        note: "Laghu sankalpam basics"
      },
      {
        id: "P02_Sankalpam_Basics",
        date: "2026-02-04",
        title: "Understanding Maha Sankalpam - Part#1 (Shri Ashok K)",
        audio: "Audio/20260204_Panchangam_1.mp4",
        transcriptionDocx: "Images/Mahasankalpam_transcription.txt",
        summaryDocx: "Images/Mahasankalpam_summary.txt",
        note: "Maha sankalpam basics"
      },
      {
        id: "P03_Sankalpam_Basics",
        date: "2026-02-04",
        title: "Understanding Maha Sankalpam - Part#2 (Shri Ashok K)",
        audio: "Audio/20260204_Panchangam_2.mp4",
        transcriptionDocx: "Images/Mahasankalpam_transcription_part2.txt",
        summaryDocx: "Images/Mahasankalpam_summary_part2.txt",
        note: "Maha sankalpam basics"
      }
    ]
  }
];

// ------------------------------
// Excel config (2 links)
// ------------------------------
const PANCHADIS_XLSX_PATH = "Images/Panchadis_Meaning_summaries.xlsx";
const SHEET_FULL_PANCHADIS = "Full_Panchadis";
const SHEET_LINE_BY_LINE = "Line_by_Line";

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

// top links
const linkPanchadisSummary = $("linkPanchadisSummary");
const linkLineByLineSummary = $("linkLineByLineSummary");

// modal elements
const excelModalBackdrop = $("excelModalBackdrop");
const excelModalTitle = $("excelModalTitle");
const excelModalBody = $("excelModalBody");
const excelModalClose = $("excelModalClose");
const excelModalOpenFile = $("excelModalOpenFile");

// ------------------------------
// State
// ------------------------------
let currentMode = "transcription"; // "transcription" | "summary"
let currentTopic = TOPIC_LIBRARY[0]?.topic || "";
let currentEpisode = null;

// workbook cache
let _panchadisWorkbook = null;
let _panchadisWorkbookPromise = null;

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

  podcastSelect.value = eps[0].id;
}

// ------------------------------
// Excel sheet viewer
// ------------------------------
function openExcelModal(titleText, bodyHtml) {
  if (!excelModalBackdrop || !excelModalTitle || !excelModalBody) return;

  excelModalTitle.textContent = titleText;
  excelModalBody.innerHTML = bodyHtml;

  excelModalBackdrop.style.display = "flex";
  excelModalBackdrop.setAttribute("aria-hidden", "false");
  (excelModalClose || excelModalOpenFile || excelModalBackdrop).focus?.();
}

function closeExcelModal() {
  if (!excelModalBackdrop) return;
  excelModalBackdrop.style.display = "none";
  excelModalBackdrop.setAttribute("aria-hidden", "true");
}

async function loadPanchadisWorkbookOnce() {
  if (_panchadisWorkbook) return _panchadisWorkbook;
  if (_panchadisWorkbookPromise) return _panchadisWorkbookPromise;

  _panchadisWorkbookPromise = (async () => {
    if (typeof XLSX === "undefined") {
      throw new Error("XLSX library not loaded. (Check the SheetJS <script> tag in index.html)");
    }

    const res = await fetch(PANCHADIS_XLSX_PATH, { cache: "no-cache" });
    if (!res.ok) {
      throw new Error(
        `Could not load Excel file:\n${PANCHADIS_XLSX_PATH}\n\nMake sure you uploaded it to the Images folder and the name matches exactly.`
      );
    }

    const buf = await res.arrayBuffer();
    const wb = XLSX.read(buf, { type: "array" });
    _panchadisWorkbook = wb;
    return wb;
  })();

  return _panchadisWorkbookPromise;
}

function renderSheetToHtmlTable(wb, sheetName) {
  const ws = wb.Sheets[sheetName];
  if (!ws) {
    const available = (wb.SheetNames || []).join(", ");
    throw new Error(
      `Sheet not found: "${sheetName}"\n\nAvailable sheets: ${available}`
    );
  }

  const tableHtml = XLSX.utils.sheet_to_html(ws, {
    id: "excelTable",
    editable: false
  });

  return `<div class="excelTableWrap">${tableHtml}</div>`;
}

async function showPanchadisSheet(sheetName, titleLabel) {
  try {
    openExcelModal(titleLabel, "Loading…");
    const wb = await loadPanchadisWorkbookOnce();
    const html = renderSheetToHtmlTable(wb, sheetName);

    const header = `
      <div style="margin-bottom:10px;color:rgba(255,255,255,0.75);font-size:12.5px;">
        Source: <span style="opacity:0.9">${PANCHADIS_XLSX_PATH}</span> (Sheet: <strong>${sheetName}</strong>)
      </div>
    `;

    openExcelModal(titleLabel, header + html);
  } catch (err) {
    openExcelModal(
      titleLabel,
      `<div style="white-space:pre-wrap;color:rgba(255,255,255,0.92);">${escapeHtml(String(err))}</div>`
    );
  }
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

// top link clicks
linkPanchadisSummary?.addEventListener("click", async () => {
  await showPanchadisSheet(SHEET_FULL_PANCHADIS, "Panchadis summary");
});

linkLineByLineSummary?.addEventListener("click", async () => {
  await showPanchadisSheet(SHEET_LINE_BY_LINE, "line by line summary");
});

// modal controls
excelModalClose?.addEventListener("click", closeExcelModal);
excelModalOpenFile?.addEventListener("click", () => {
  window.open(PANCHADIS_XLSX_PATH, "_blank", "noopener");
});

// close when clicking outside the modal
excelModalBackdrop?.addEventListener("click", (e) => {
  if (e.target === excelModalBackdrop) closeExcelModal();
});

// close on Esc
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && excelModalBackdrop?.style.display === "flex") {
    closeExcelModal();
  }
});

// ------------------------------
// Initial load
// ------------------------------
(function init() {
  populateTopicSelect();

  const topicObj = findTopicObj(topicSelect?.value || currentTopic);
  currentTopic = topicObj?.topic || currentTopic;

  populatePodcastSelect(topicObj);

  setToggle("transcription");

  const ep = findEpisodeById(topicObj, podcastSelect.value);
  if (ep) loadEpisode(ep);
})();
