// Main Orchestrator for DSA Learning Hub
import { curriculum } from './modules/learning/content.js';
import { initQuiz } from './modules/learning/quiz.js';
import { 
  initSorting, 
  generateRandomArray, 
  resetGenerator, 
  play, 
  pause, 
  step, 
  setDelay, 
  isCurrentlyPlaying,
  sortingComplexity
} from './modules/visualizers/sorting.js';
import { 
  initDS, 
  renderDS, 
  pushStack, 
  popStack, 
  enqueueQueue, 
  dequeueQueue, 
  insertHeadList, 
  deleteHeadList, 
  searchList, 
  insertBST, 
  deleteBST, 
  searchBST,
  dsComplexity
} from './modules/visualizers/structures.js';

// Application State
let appState = {
  completedLessons: [],
  quizHighScore: 0
};

// DOM Elements
const navItems = document.querySelectorAll('.nav-item');
const tabPanes = document.querySelectorAll('.tab-pane');
const dashboardGrid = document.getElementById('dashboard-modules-grid');
const curriculumList = document.getElementById('curriculum-list');
const contentViewer = document.getElementById('learning-content-viewer');
const overallProgressVal = document.getElementById('overall-progress-val');
const resetProgressBtn = document.getElementById('reset-progress-btn');

// Visualizer Elements
const visualizerSelect = document.getElementById('visualizer-select');
const visualizerTitle = document.getElementById('visualizer-title');
const viewport = document.getElementById('viewport');
const arrayContainer = document.getElementById('array-container');
const treeNodes = document.getElementById('tree-nodes');
const treeSvg = document.getElementById('tree-svg');
const btnGenerate = document.getElementById('btn-generate');
const btnPlayPause = document.getElementById('btn-play-pause');
const btnStep = document.getElementById('btn-step');
const speedSlider = document.getElementById('speed-slider');
const speedLabel = document.getElementById('speed-label');

// DS Input Elements
const dsControlsGroup = document.getElementById('ds-controls-group');
const dsInputVal = document.getElementById('ds-input-val');
const dsBtnInsert = document.getElementById('ds-btn-insert');
const dsBtnRemove = document.getElementById('ds-btn-remove');
const dsBtnSearch = document.getElementById('ds-btn-search');

/* =========================================================================
   INITIALIZATION
   ========================================================================= */
document.addEventListener('DOMContentLoaded', () => {
  loadProgress();
  initTabs();
  renderDashboard();
  renderCurriculumList();
  
  // Load initial curriculum detail view
  if (curriculum.length > 0) {
    showLesson(curriculum[0].id);
  }

  // Init sorting visualizer initially
  initSorting(viewport);
  updateVisualizerStats('sort-bubble');

  // Init Quiz
  initQuiz((score, maxScore) => {
    if (score > appState.quizHighScore) {
      appState.quizHighScore = score;
      saveProgress();
      renderDashboard();
    }
  });

  // Setup Visualizer Controls
  setupVisualizerListeners();
  
  // Set window resize handler for tree coordinate recalcs
  window.addEventListener('resize', () => {
    const activeVal = visualizerSelect.value;
    if (activeVal.startsWith('ds-')) {
      renderDS();
    }
  });
});

/* =========================================================================
   TAB NAVIGATION
   ========================================================================= */
function initTabs() {
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTab = item.getAttribute('data-tab');
      
      // Toggle active states on sidebars
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');

      // Toggle panels
      tabPanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === targetTab) {
          pane.classList.add('active');
        }
      });

      // Special action on visualizer tab click
      if (targetTab === 'visualizer') {
        const activeVal = visualizerSelect.value;
        if (activeVal.startsWith('sort-')) {
          resetGenerator();
        } else {
          initDS(viewport, activeVal);
        }
      }
    });
  });

  resetProgressBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to reset all progress and quiz records?")) {
      appState.completedLessons = [];
      appState.quizHighScore = 0;
      saveProgress();
      location.reload();
    }
  });
}

/* =========================================================================
   DASHBOARD
   ========================================================================= */
function renderDashboard() {
  dashboardGrid.innerHTML = '';
  
  curriculum.forEach(topic => {
    const card = document.createElement('div');
    card.className = 'card topic-card';
    
    const isCompleted = appState.completedLessons.includes(topic.id);
    const progressText = isCompleted ? 'Completed' : 'Not Started';
    const progressClass = isCompleted ? 'topic-progress' : '';

    card.innerHTML = `
      <div class="topic-header">
        <div class="topic-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <span class="info-badge">${topic.category}</span>
      </div>
      <div>
        <h3 style="margin: 12px 0 6px 0;">${topic.title}</h3>
        <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.4;">${topic.summary}</p>
      </div>
      <div class="topic-meta">
        <span>Read time: ${topic.readTime}</span>
        <span class="${progressClass}">${progressText}</span>
      </div>
    `;

    card.addEventListener('click', () => {
      // Go to learning tab
      document.querySelector('[data-tab=learning]').click();
      showLesson(topic.id);
    });

    dashboardGrid.appendChild(card);
  });

  updateProgressHeader();
}

/* =========================================================================
   LEARNING CURRICULUM
   ========================================================================= */
function renderCurriculumList() {
  curriculumList.innerHTML = '';
  
  curriculum.forEach(topic => {
    const el = document.createElement('div');
    el.className = 'curriculum-node';
    el.id = `curr-node-${topic.id}`;
    
    if (appState.completedLessons.includes(topic.id)) {
      el.classList.add('completed');
    }

    el.innerHTML = `
      <div class="curriculum-node-title">${topic.title}</div>
      <div class="curriculum-node-meta">
        <span>${topic.category}</span>
        <span>${topic.readTime}</span>
      </div>
    `;

    el.addEventListener('click', () => {
      document.querySelectorAll('.curriculum-node').forEach(node => node.classList.remove('active'));
      el.classList.add('active');
      showLesson(topic.id);
    });

    curriculumList.appendChild(el);
  });
}

function showLesson(lessonId) {
  const lesson = curriculum.find(x => x.id === lessonId);
  if (!lesson) return;

  const isCompleted = appState.completedLessons.includes(lessonId);
  const activeNode = document.getElementById(`curr-node-${lessonId}`);
  if (activeNode) {
    document.querySelectorAll('.curriculum-node').forEach(node => node.classList.remove('active'));
    activeNode.classList.add('active');
  }

  contentViewer.innerHTML = `
    <div>
      <span class="info-badge" style="margin-bottom: 8px;">${lesson.category}</span>
      <h1 style="font-size: 2.25rem; font-weight: 800; margin-bottom: 4px;">${lesson.title}</h1>
      <span style="font-size: 0.9rem; color: var(--text-muted);">Approx. Read time: ${lesson.readTime}</span>
    </div>
    
    <div style="line-height: 1.6; color: var(--text-secondary);">
      ${lesson.details}
    </div>

    <div style="border-top: 1px solid var(--border-glass); padding-top: 20px; display: flex; justify-content: space-between; align-items: center;">
      <button class="btn btn-secondary" id="btn-lesson-visualize">Go to Visualizer</button>
      <button class="btn ${isCompleted ? 'btn-secondary' : 'btn-accent'}" id="btn-lesson-complete" ${isCompleted ? 'disabled' : ''}>
        ${isCompleted ? '✓ Lesson Completed' : 'Mark as Completed'}
      </button>
    </div>
  `;

  // Go to Visualizer helper
  document.getElementById('btn-lesson-visualize').addEventListener('click', () => {
    // Map lesson ID to visualizer values
    let visVal = 'sort-bubble';
    if (lessonId === 'stack-queue') visVal = 'ds-stack';
    else if (lessonId === 'linked-list') visVal = 'ds-linkedlist';
    else if (lessonId === 'trees-bst') visVal = 'ds-bst';
    else if (lessonId === 'arrays') visVal = 'ds-linkedlist';
    else if (lessonId === 'sorting-algos') visVal = 'sort-bubble';

    visualizerSelect.value = visVal;
    triggerVisualizerChange(visVal);
    document.querySelector('[data-tab=visualizer]').click();
  });

  // Complete lesson helper
  const completeBtn = document.getElementById('btn-lesson-complete');
  completeBtn.addEventListener('click', () => {
    if (!appState.completedLessons.includes(lessonId)) {
      appState.completedLessons.push(lessonId);
      saveProgress();
      renderDashboard();
      renderCurriculumList();
      showLesson(lessonId); // Refresh button state
    }
  });
}

/* =========================================================================
   VISUALIZER INTERFACE CONTROLLER
   ========================================================================= */
function setupVisualizerListeners() {
  visualizerSelect.addEventListener('change', (e) => {
    triggerVisualizerChange(e.target.value);
  });

  // General Controls
  btnGenerate.addEventListener('click', () => {
    const isSorting = visualizerSelect.value.startsWith('sort-');
    if (isSorting) {
      generateRandomArray();
    }
  });

  btnPlayPause.addEventListener('click', () => {
    if (isCurrentlyPlaying()) {
      pause();
    } else {
      play();
    }
  });

  btnStep.addEventListener('click', () => {
    step();
  });

  speedSlider.addEventListener('input', (e) => {
    const speed = e.target.value;
    speedLabel.textContent = `${speed}ms`;
    setDelay(parseInt(speed, 10));
  });

  // DS Controls
  dsBtnInsert.addEventListener('click', () => handleDSCommand('insert'));
  dsBtnRemove.addEventListener('click', () => handleDSCommand('remove'));
  dsBtnSearch.addEventListener('click', () => handleDSCommand('search'));
  
  // Submit on enter
  dsInputVal.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleDSCommand('insert');
    }
  });
}

function triggerVisualizerChange(val) {
  // Pause any running animation
  pause();

  updateVisualizerStats(val);

  if (val.startsWith('sort-')) {
    // Show sorting elements
    viewport.style.alignItems = 'flex-end';
    viewport.style.padding = '40px 20px';
    arrayContainer.style.display = 'flex';
    treeNodes.style.display = 'none';
    treeSvg.style.display = 'none';
    
    dsControlsGroup.style.display = 'none';
    btnGenerate.style.display = 'inline-flex';
    btnPlayPause.style.display = 'inline-flex';
    btnStep.style.display = 'inline-flex';

    initSorting(viewport);
  } else {
    // Show DS elements
    viewport.style.alignItems = 'center';
    viewport.style.padding = '0';
    arrayContainer.style.display = 'none';
    treeNodes.style.display = 'block';
    treeSvg.style.display = 'block';

    initDS(viewport, val);
  }
}

function updateVisualizerStats(val) {
  let stats = null;
  if (val.startsWith('sort-')) {
    stats = sortingComplexity[val];
    visualizerTitle.textContent = document.querySelector(`option[value="${val}"]`).textContent;
  } else {
    stats = dsComplexity[val];
    visualizerTitle.textContent = document.querySelector(`option[value="${val}"]`).textContent;
  }

  if (stats) {
    document.getElementById('stat-worst-time').textContent = stats.worstTime;
    document.getElementById('stat-best-time').textContent = stats.bestTime;
    document.getElementById('stat-space').textContent = stats.space;
    document.getElementById('algorithm-description').textContent = stats.desc;
  }
}

async function handleDSCommand(cmd) {
  const activeDS = visualizerSelect.value;
  const numVal = parseInt(dsInputVal.value, 10);
  
  if (cmd === 'insert' || cmd === 'search') {
    if (isNaN(numVal) || numVal < 0 || numVal > 99) {
      alert("Please enter a valid number between 0 and 99.");
      return;
    }
  }

  // Clear input
  dsInputVal.value = '';
  
  // Disable controls during animation
  toggleDSButtonStates(true);

  try {
    if (activeDS === 'ds-stack') {
      if (cmd === 'insert') await pushStack(numVal);
      else if (cmd === 'remove') await popStack();
    } else if (activeDS === 'ds-queue') {
      if (cmd === 'insert') await enqueueQueue(numVal);
      else if (cmd === 'remove') await dequeueQueue();
    } else if (activeDS === 'ds-linkedlist') {
      if (cmd === 'insert') await insertHeadList(numVal);
      else if (cmd === 'remove') await deleteHeadList();
      else if (cmd === 'search') await searchList(numVal);
    } else if (activeDS === 'ds-bst') {
      if (cmd === 'insert') await insertBST(numVal);
      else if (cmd === 'remove') await deleteBST(numVal);
      else if (cmd === 'search') await searchBST(numVal);
    }
  } catch (err) {
    console.error(err);
  } finally {
    toggleDSButtonStates(false);
  }
}

function toggleDSButtonStates(disabled) {
  dsBtnInsert.disabled = disabled;
  dsBtnRemove.disabled = disabled;
  dsBtnSearch.disabled = disabled;
  dsInputVal.disabled = disabled;
  visualizerSelect.disabled = disabled;
}

/* =========================================================================
   LOCAL STORAGE & PROGRESS STATE
   ========================================================================= */
function loadProgress() {
  try {
    const raw = localStorage.getItem('dsa_flow_progress');
    if (raw) {
      appState = JSON.parse(raw);
      if (!Array.isArray(appState.completedLessons)) appState.completedLessons = [];
    }
  } catch (err) {
    console.warn("Could not load local storage progress", err);
  }
}

function saveProgress() {
  try {
    localStorage.setItem('dsa_flow_progress', JSON.stringify(appState));
  } catch (err) {
    console.warn("Could not save progress to local storage", err);
  }
  updateProgressHeader();
}

function updateProgressHeader() {
  const maxScoreQuestions = 1; // Count quiz completion as 1 component of overall progress
  const totalWeight = curriculum.length + maxScoreQuestions;
  
  const completedLessonsCount = appState.completedLessons.length;
  const quizWeight = appState.quizHighScore > 0 ? 1 : 0;
  
  const percent = Math.round(((completedLessonsCount + quizWeight) / totalWeight) * 100);
  overallProgressVal.textContent = `${percent}%`;
}
