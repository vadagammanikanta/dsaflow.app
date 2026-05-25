// dsa.flow — Main Orchestrator (Upgraded)
import { curriculum, roadmapPhases, quizQuestions } from './modules/learning/content.js';
import { initQuiz } from './modules/learning/quiz.js';
import {
  initSorting, generateRandomArray, resetGenerator,
  play, pause, step, setDelay, isCurrentlyPlaying, sortingComplexity
} from './modules/visualizers/sorting.js';
import {
  initDS, renderDS, pushStack, popStack,
  enqueueQueue, dequeueQueue, insertHeadList, deleteHeadList,
  searchList, insertBST, deleteBST, searchBST, dsComplexity
} from './modules/visualizers/structures.js';

/* ─── STATE ─── */
let appState = { completedLessons: [], quizHighScore: 0, selectedLanguage: 'javascript', activeDifficulty: 'all' };
let currentLesson = null;

/* ─── DOM REFERENCES ─── */
const navItems       = document.querySelectorAll('.nav-item');
const tabPanes       = document.querySelectorAll('.tab-pane');
const dashboardGrid  = document.getElementById('dashboard-modules-grid');
const curriculumList = document.getElementById('curriculum-list');
const contentViewer  = document.getElementById('learning-content-viewer');
const progressVal    = document.getElementById('overall-progress-val');
const completedCnt   = document.getElementById('completed-count');
const totalCnt       = document.getElementById('total-count');
const resetBtn       = document.getElementById('reset-progress-btn');
const roadmapFlow    = document.getElementById('roadmap-flow');

// Visualizer
const visSelect      = document.getElementById('visualizer-select');
const visTitle       = document.getElementById('visualizer-title');
const viewport       = document.getElementById('viewport');
const arrayContainer = document.getElementById('array-container');
const treeNodes      = document.getElementById('tree-nodes');
const treeSvg        = document.getElementById('tree-svg');
const btnGenerate    = document.getElementById('btn-generate');
const btnPlayPause   = document.getElementById('btn-play-pause');
const btnStep        = document.getElementById('btn-step');
const speedSlider    = document.getElementById('speed-slider');
const speedLabel     = document.getElementById('speed-label');
const dsGroup        = document.getElementById('ds-controls-group');
const dsInput        = document.getElementById('ds-input-val');
const dsBtnInsert    = document.getElementById('ds-btn-insert');
const dsBtnRemove    = document.getElementById('ds-btn-remove');
const dsBtnSearch    = document.getElementById('ds-btn-search');

// Search
const searchInput    = document.getElementById('global-search-input');
const searchDropdown = document.getElementById('search-results-dropdown');

// Language picker
const langPill       = document.getElementById('lang-pill');
const langPillLabel  = document.getElementById('lang-pill-label');
const langOptions    = document.querySelectorAll('.lang-option');

// Difficulty chips
const diffChips      = document.querySelectorAll('.diff-chip');

/* ═══════════════════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  initNav();
  initDifficultyFilter();
  initSearch();
  initLangPicker();
  renderDashboard();
  renderCurriculumList();
  renderRoadmap();

  if (curriculum.length) showLesson(curriculum[0].id);

  initSorting(viewport);
  updateVisualizerStats('sort-bubble');
  document.getElementById('algorithm-description').textContent = sortingComplexity['sort-bubble'].desc;

  initQuiz(onQuizComplete);
  setupVisualizerListeners();

  resetBtn.addEventListener('click', () => {
    if (confirm('Reset all progress and quiz records?')) {
      appState = { completedLessons: [], quizHighScore: 0, selectedLanguage: 'javascript', activeDifficulty: 'all' };
      saveState();
      location.reload();
    }
  });

  window.addEventListener('resize', () => {
    if (visSelect.value.startsWith('ds-')) renderDS();
  });

  totalCnt.textContent = curriculum.length;
});

/* ═══════════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════════ */
function initNav() {
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const tab = item.dataset.tab;
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      tabPanes.forEach(p => { p.classList.remove('active'); if (p.id === tab) p.classList.add('active'); });

      if (tab === 'visualizer') {
        const val = visSelect.value;
        if (val.startsWith('sort-')) resetGenerator();
        else initDS(viewport, val);
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════
   DIFFICULTY FILTER
   ═══════════════════════════════════════════════════════ */
function initDifficultyFilter() {
  diffChips.forEach(chip => {
    chip.addEventListener('click', () => {
      diffChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      appState.activeDifficulty = chip.dataset.diff;
      renderDashboard();
      renderCurriculumList();
    });
  });
}

/* ═══════════════════════════════════════════════════════
   GLOBAL SEARCH
   ═══════════════════════════════════════════════════════ */
function initSearch() {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    if (q.length < 2) { searchDropdown.classList.remove('visible'); return; }

    const results = curriculum.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.summary.toLowerCase().includes(q)
    ).slice(0, 6);

    if (!results.length) { searchDropdown.classList.remove('visible'); return; }

    searchDropdown.innerHTML = results.map(t => `
      <div class="search-result-item" data-id="${t.id}">
        <span style="font-size:1.3rem;">${t.icon}</span>
        <div>
          <div class="search-result-title">${t.title}</div>
          <div class="search-result-category">${t.category} · ${t.difficulty}</div>
        </div>
      </div>
    `).join('');
    searchDropdown.classList.add('visible');

    searchDropdown.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        searchInput.value = '';
        searchDropdown.classList.remove('visible');
        document.querySelector('[data-tab=learning]').click();
        showLesson(item.dataset.id);
      });
    });
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.global-search-wrapper')) searchDropdown.classList.remove('visible');
  });
}

/* ═══════════════════════════════════════════════════════
   LANGUAGE PICKER
   ═══════════════════════════════════════════════════════ */
function initLangPicker() {
  langPill.addEventListener('click', e => {
    e.stopPropagation();
    langPill.classList.toggle('open');
  });
  document.addEventListener('click', () => langPill.classList.remove('open'));

  const langLabels = { javascript: 'JS', cpp: 'C++', java: 'Java', python: 'Py' };
  langOptions.forEach(opt => {
    if (opt.dataset.lang === appState.selectedLanguage) opt.classList.add('active');
    opt.addEventListener('click', () => {
      const lang = opt.dataset.lang;
      appState.selectedLanguage = lang;
      langPillLabel.textContent = langLabels[lang];
      langOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      saveState();
      langPill.classList.remove('open');
      // Refresh current lesson if open
      if (currentLesson) showLesson(currentLesson);
    });
  });
  langPillLabel.textContent = langLabels[appState.selectedLanguage] || 'JS';
}

/* ═══════════════════════════════════════════════════════
   DASHBOARD
   ═══════════════════════════════════════════════════════ */
function renderDashboard() {
  dashboardGrid.innerHTML = '';
  const filtered = curriculum.filter(t =>
    appState.activeDifficulty === 'all' || t.difficulty === appState.activeDifficulty
  );
  document.getElementById('dash-filter-label').textContent =
    filtered.length < curriculum.length ? `Showing ${filtered.length} of ${curriculum.length}` : '';
  document.getElementById('hero-total').textContent = curriculum.length;

  filtered.forEach(topic => {
    const done = appState.completedLessons.includes(topic.id);
    const card = document.createElement('div');
    card.className = 'card topic-card';
    card.innerHTML = `
      <div class="topic-card-top">
        <div class="topic-icon ${topic.iconColor}">${topic.icon}</div>
        <span class="diff-badge ${topic.difficulty}">${topic.difficulty}</span>
      </div>
      <div class="topic-title">${topic.title}</div>
      <div class="topic-summary">${topic.summary}</div>
      <div class="topic-meta">
        <span>${topic.category} · ${topic.readTime}</span>
        ${done ? '<span class="topic-completed">✓ Completed</span>' : ''}
      </div>
    `;
    card.addEventListener('click', () => {
      document.querySelector('[data-tab=learning]').click();
      showLesson(topic.id);
    });
    dashboardGrid.appendChild(card);
  });

  updateProgressUI();
}

/* ═══════════════════════════════════════════════════════
   ROADMAP FLOW RENDERER
   ═══════════════════════════════════════════════════════ */
function renderRoadmap() {
  roadmapFlow.innerHTML = '';
  roadmapPhases.forEach(phase => {
    const phaseEl = document.createElement('div');
    phaseEl.className = 'roadmap-phase';
    phaseEl.innerHTML = `<div class="roadmap-phase-label">${phase.label}</div>`;

    const rowEl = document.createElement('div');
    rowEl.className = 'roadmap-nodes-row';

    phase.nodes.forEach(id => {
      const topic = curriculum.find(t => t.id === id);
      if (!topic) return;
      const done = appState.completedLessons.includes(id);
      const node = document.createElement('div');
      node.className = `roadmap-node ${done ? 'completed' : ''}`;
      node.innerHTML = `
        <div class="roadmap-node-dot"></div>
        <div class="roadmap-node-text">${topic.icon} ${topic.title}</div>
        <div class="roadmap-node-diff" style="color:${diffColor(topic.difficulty)}">${topic.difficulty[0]}</div>
      `;
      node.addEventListener('click', () => {
        document.querySelector('[data-tab=learning]').click();
        showLesson(id);
      });
      rowEl.appendChild(node);
    });

    phaseEl.appendChild(rowEl);
    roadmapFlow.appendChild(phaseEl);
  });
}

function diffColor(d) {
  if (d === 'Beginner') return 'var(--accent-emerald)';
  if (d === 'Intermediate') return 'var(--accent-amber)';
  return 'var(--accent-rose)';
}

/* ═══════════════════════════════════════════════════════
   CURRICULUM LIST
   ═══════════════════════════════════════════════════════ */
function renderCurriculumList() {
  curriculumList.innerHTML = '';
  const filtered = curriculum.filter(t =>
    appState.activeDifficulty === 'all' || t.difficulty === appState.activeDifficulty
  );
  filtered.forEach(topic => {
    const done = appState.completedLessons.includes(topic.id);
    const el = document.createElement('div');
    el.className = `curriculum-node ${done ? 'completed' : ''}`;
    el.id = `curr-node-${topic.id}`;
    el.innerHTML = `
      <div class="curriculum-node-title">${topic.icon} ${topic.title}</div>
      <div class="curriculum-node-meta">
        <span>${topic.category}</span>
        <span style="color:${diffColor(topic.difficulty)}">${topic.difficulty}</span>
      </div>
    `;
    el.addEventListener('click', () => {
      document.querySelectorAll('.curriculum-node').forEach(n => n.classList.remove('active'));
      el.classList.add('active');
      showLesson(topic.id);
    });
    curriculumList.appendChild(el);
  });
}

/* ═══════════════════════════════════════════════════════
   LESSON VIEWER
   ═══════════════════════════════════════════════════════ */
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function showLesson(lessonId) {
  const lesson = curriculum.find(x => x.id === lessonId);
  if (!lesson) return;
  currentLesson = lessonId;

  const done = appState.completedLessons.includes(lessonId);
  const activeNode = document.getElementById(`curr-node-${lessonId}`);
  if (activeNode) {
    document.querySelectorAll('.curriculum-node').forEach(n => n.classList.remove('active'));
    activeNode.classList.add('active');
  }

  // Build language tabs
  const langs = [
    { id: 'javascript', label: '⚡ JavaScript' },
    { id: 'cpp',        label: '⚙️ C++' },
    { id: 'java',       label: '☕ Java' },
    { id: 'python',     label: '🐍 Python' }
  ];

  let codeHtml = '';
  if (lesson.code) {
    const tabs = langs.map(l => `
      <button class="code-tab-btn ${appState.selectedLanguage === l.id ? 'active' : ''}" data-lang="${l.id}">${l.label}</button>
    `).join('');
    codeHtml = `
      <div class="code-tabs-header">${tabs}</div>
      <pre><code class="code-tab-content" id="lesson-code-block">${escapeHTML(lesson.code[appState.selectedLanguage] || '')}</code></pre>
    `;
  }

  contentViewer.innerHTML = `
    <div>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
        <span class="diff-badge ${lesson.difficulty}">${lesson.difficulty}</span>
        <span style="color:var(--text-muted);font-size:0.82rem;">${lesson.category} · ${lesson.readTime}</span>
      </div>
      <h1>${lesson.icon} ${lesson.title}</h1>
    </div>

    <div class="lesson-text">
      ${lesson.details}
      ${codeHtml}
    </div>

    <div class="lesson-actions">
      <button class="btn btn-secondary" id="btn-lesson-vis">▶ Visualizer</button>
      <button class="btn ${done ? 'btn-secondary' : 'btn-accent'}" id="btn-mark-done" ${done ? 'disabled' : ''}>
        ${done ? '✓ Completed' : 'Mark as Completed'}
      </button>
    </div>
  `;

  // Bind tab clicks
  if (lesson.code) {
    contentViewer.querySelectorAll('.code-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        appState.selectedLanguage = lang;
        const lblMap = { javascript: 'JS', cpp: 'C++', java: 'Java', python: 'Py' };
        langPillLabel.textContent = lblMap[lang];
        langOptions.forEach(o => { o.classList.toggle('active', o.dataset.lang === lang); });
        contentViewer.querySelectorAll('.code-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('lesson-code-block').textContent = lesson.code[lang] || '';
        saveState();
      });
    });
  }

  // Visualizer shortcut
  document.getElementById('btn-lesson-vis').addEventListener('click', () => {
    const visMap = {
      'arrays': 'ds-stack', 'strings': 'ds-stack', 'stack-queue': 'ds-stack',
      'linked-list': 'ds-linkedlist', 'trees-bst': 'ds-bst', 'heaps': 'ds-bst',
      'tries': 'ds-bst', 'graphs': 'ds-bst', 'sorting-algos': 'sort-merge',
      'searching': 'sort-bubble', 'divide-conquer': 'sort-merge'
    };
    const val = visMap[lessonId] || 'sort-bubble';
    visSelect.value = val;
    triggerVisualizerChange(val);
    document.querySelector('[data-tab=visualizer]').click();
  });

  // Mark complete
  document.getElementById('btn-mark-done').addEventListener('click', () => {
    if (!appState.completedLessons.includes(lessonId)) {
      appState.completedLessons.push(lessonId);
      saveState();
      renderDashboard();
      renderCurriculumList();
      renderRoadmap();
      showLesson(lessonId);
    }
  });
}

/* ═══════════════════════════════════════════════════════
   VISUALIZER CONTROLLER
   ═══════════════════════════════════════════════════════ */
function setupVisualizerListeners() {
  visSelect.addEventListener('change', e => triggerVisualizerChange(e.target.value));

  btnGenerate.addEventListener('click', () => {
    if (visSelect.value.startsWith('sort-')) generateRandomArray();
  });

  btnPlayPause.addEventListener('click', () => {
    if (isCurrentlyPlaying()) pause(); else play();
  });

  btnStep.addEventListener('click', () => step());

  speedSlider.addEventListener('input', e => {
    const v = e.target.value;
    speedLabel.textContent = `${v}ms`;
    setDelay(parseInt(v));
  });

  dsBtnInsert.addEventListener('click', () => handleDS('insert'));
  dsBtnRemove.addEventListener('click', () => handleDS('remove'));
  dsBtnSearch.addEventListener('click', () => handleDS('search'));
  dsInput.addEventListener('keypress', e => { if (e.key === 'Enter') handleDS('insert'); });
}

function triggerVisualizerChange(val) {
  pause();
  updateVisualizerStats(val);

  if (val.startsWith('sort-')) {
    viewport.style.alignItems = 'flex-end';
    viewport.style.padding = '40px 20px';
    arrayContainer.style.display = 'flex';
    treeNodes.style.display = 'none';
    treeSvg.style.display = 'none';
    dsGroup.style.display = 'none';
    btnGenerate.style.display = 'inline-flex';
    btnPlayPause.style.display = 'inline-flex';
    btnStep.style.display = 'inline-flex';
    initSorting(viewport);
  } else {
    viewport.style.alignItems = 'center';
    viewport.style.padding = '0';
    arrayContainer.style.display = 'none';
    treeNodes.style.display = 'block';
    treeSvg.style.display = 'block';
    initDS(viewport, val);
  }
}

function updateVisualizerStats(val) {
  const stats = val.startsWith('sort-') ? sortingComplexity[val] : dsComplexity[val];
  const optionEl = document.querySelector(`option[value="${val}"]`);
  if (optionEl) visTitle.textContent = optionEl.textContent;
  if (stats) {
    document.getElementById('stat-worst-time').textContent = stats.worstTime;
    document.getElementById('stat-best-time').textContent  = stats.bestTime;
    document.getElementById('stat-space').textContent      = stats.space;
    document.getElementById('algorithm-description').textContent = stats.desc;
  }
}

async function handleDS(cmd) {
  const activeDS = visSelect.value;
  const numVal = parseInt(dsInput.value, 10);
  if ((cmd === 'insert' || cmd === 'search') && (isNaN(numVal) || numVal < 0 || numVal > 99)) {
    alert('Please enter a valid number between 0 and 99.');
    return;
  }
  dsInput.value = '';
  toggleDSBtns(true);
  try {
    if (activeDS === 'ds-stack') {
      if (cmd === 'insert') await pushStack(numVal);
      else await popStack();
    } else if (activeDS === 'ds-queue') {
      if (cmd === 'insert') await enqueueQueue(numVal);
      else await dequeueQueue();
    } else if (activeDS === 'ds-linkedlist') {
      if (cmd === 'insert') await insertHeadList(numVal);
      else if (cmd === 'remove') await deleteHeadList();
      else await searchList(numVal);
    } else if (activeDS === 'ds-bst') {
      if (cmd === 'insert') await insertBST(numVal);
      else if (cmd === 'remove') await deleteBST(numVal);
      else await searchBST(numVal);
    }
  } catch (e) { console.error(e); }
  finally { toggleDSBtns(false); }
}

function toggleDSBtns(dis) {
  [dsBtnInsert, dsBtnRemove, dsBtnSearch, dsInput, visSelect].forEach(el => el.disabled = dis);
}

/* ═══════════════════════════════════════════════════════
   QUIZ
   ═══════════════════════════════════════════════════════ */
function onQuizComplete(score, max) {
  if (score > appState.quizHighScore) {
    appState.quizHighScore = score;
    saveState();
    updateProgressUI();
  }
}

/* ═══════════════════════════════════════════════════════
   PROGRESS & STATE
   ═══════════════════════════════════════════════════════ */
function updateProgressUI() {
  const done = appState.completedLessons.length;
  const total = curriculum.length;
  const quizBonus = appState.quizHighScore > 0 ? 1 : 0;
  const percent = Math.round(((done + quizBonus) / (total + 1)) * 100);
  progressVal.textContent = `${percent}%`;
  completedCnt.textContent = done;
  totalCnt.textContent = total;
}

function loadState() {
  try {
    const raw = localStorage.getItem('dsaflow_v3');
    if (raw) {
      appState = { ...appState, ...JSON.parse(raw) };
      if (!Array.isArray(appState.completedLessons)) appState.completedLessons = [];
    }
  } catch (e) { console.warn('State load error', e); }
}

function saveState() {
  try { localStorage.setItem('dsaflow_v3', JSON.stringify(appState)); }
  catch (e) { console.warn('State save error', e); }
  updateProgressUI();
}
