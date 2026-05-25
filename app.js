// ═══════════════════════════════════════════════════════════════════
//  dsa.flow — Main Orchestrator (Commercial Edition)
//  Auth gate → Trial → Paywall → Full App
// ═══════════════════════════════════════════════════════════════════

import { signUp, signIn, signOut, markAsPaid, getCurrentUser, getTrialInfo } from './modules/auth/auth.js';
import { openRazorpayCheckout } from './modules/payment/payment.js';
import { curriculum as baseCurriculum, quizQuestions } from './modules/learning/content.js';
import { curriculumExtended, newRoadmapPhases as roadmapPhases } from './modules/learning/content_extended.js';
const curriculum = [...baseCurriculum, ...curriculumExtended];
import { sendChatMessage, clearChatHistory } from './modules/ai/chatbot.js';
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

/* ─── STATE ──────────────────────────────────────────────────────── */
let appState = { completedLessons: [], quizHighScore: 0, selectedLanguage: 'javascript', activeDifficulty: 'all' };
let currentLesson = null;
let trialTimerInterval = null;
let quoteInterval = null;
let currentQuoteIndex = 0;

/* ─── MOTIVATIONAL QUOTES ─────────────────────────────────────────── */
const QUOTES = [
  { text: "An algorithm must be seen to be believed.", author: "Donald Knuth" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Every expert was once a beginner. Start today.", author: "dsa.flow" },
  { text: "The best time to learn DSA was yesterday. The second best time is NOW.", author: "dsa.flow" },
  { text: "Clean code always looks like it was written by someone who cares.", author: "Robert C. Martin" },
  { text: "Data structures + algorithms = programs. Master both.", author: "Niklaus Wirth" },
  { text: "Debugging is twice as hard as writing the code in the first place.", author: "Brian Kernighan" },
  { text: "The function of good software is to make the impossible possible.", author: "Theo de Raadt" },
  { text: "Consistency beats talent every single time. Code daily.", author: "dsa.flow" },
  { text: "Solving one LeetCode problem a day keeps unemployment away.", author: "dsa.flow" },
  { text: "Hard problems only feel impossible before you solve them.", author: "dsa.flow" },
  { text: "O(N²) is fine for 1000 elements. But your interviewer has 10⁶.", author: "dsa.flow" },
  { text: "The secret to getting ahead is getting started.", author: "Mark Twain" },
  { text: "Great software is not built in a day — but great habits are formed in one.", author: "dsa.flow" },
  { text: "FAANG or not — DSA mastery opens every door.", author: "dsa.flow" },
  { text: "Your comfort zone is the enemy of your placement offer.", author: "dsa.flow" },
  { text: "Binary search cuts problems in half. So does asking the right question.", author: "dsa.flow" },
  { text: "In programming, if you can't explain it simply, you don't understand it well enough.", author: "Albert Einstein (adapted)" },
  { text: "DP is just recursion with a memory. So is learning.", author: "dsa.flow" },
  { text: "The journey of 1000 LeetCode problems begins with a single array.", author: "dsa.flow" },
  { text: "Code is poetry. DSA is the grammar.", author: "dsa.flow" },
  { text: "Your future self will thank you for every hour of DSA practice today.", author: "dsa.flow" },
  { text: "An optimal solution always exists. Finding it is the challenge.", author: "dsa.flow" },
  { text: "Graphs are just trees that grew up and got complicated. Like real life.", author: "dsa.flow" },
  { text: "Every O(N!) problem has an O(2^N) hidden inside it waiting to be found.", author: "dsa.flow" }
];

/* ─── PLATFORM GUIDES DATA ─────────────────────────────────────────── */
const PLATFORMS = [
  {
    id: 'leetcode', cls: 'lc', logo: '🟡', name: 'LeetCode',
    tagline: 'The gold standard for FAANG interview prep',
    link: 'https://leetcode.com',
    tips: [
      'Start with "Top 150 Interview Questions" — do Easy before Medium.',
      'Focus on patterns: Two Pointer, Sliding Window, BFS/DFS, DP.',
      'Use the "Discuss" tab after each problem to see optimal solutions.',
      'Aim for 3–5 problems/day. Consistency > cramming.',
      'Use tags to practice by topic (Arrays, Trees, DP separately).',
      'Timed mock contests build real interview pressure simulation.',
    ]
  },
  {
    id: 'hackerrank', cls: 'hr', logo: '🟢', name: 'HackerRank',
    tagline: 'Best for structured certifications & company assessments',
    link: 'https://hackerrank.com',
    tips: [
      'Complete the "30 Days of Code" challenge for a quick warm-up.',
      'Earn certificates in Problem Solving & Data Structures to add to resume.',
      'Most OA (Online Assessments) use HackerRank — get comfortable with the editor.',
      'Use "Interview Preparation Kit" — exactly what companies test.',
      'Practice SQL and regex here too — they test non-coding DS skills.',
      'Read problem constraints carefully — they reveal the expected time complexity.',
    ]
  },
  {
    id: 'codeforces', cls: 'cf', logo: '🔵', name: 'Codeforces',
    tagline: 'For competitive programming & rating systems',
    link: 'https://codeforces.com',
    tips: [
      'Participate in Div. 2 and Div. 3 contests — they run every week.',
      'Solve A & B problems of every contest to build speed.',
      'Your rating (Specialist = 1400+) proves algorithmic maturity.',
      'Use the "problemset" filter by rating to solve just-above-your-level problems.',
      'Editorial reading is NOT cheating — understanding patterns is the goal.',
      'Track your submissions in a spreadsheet for pattern recognition.',
    ]
  },
  {
    id: 'codechef', cls: 'cc', logo: '🍴', name: 'CodeChef',
    tagline: 'Great for beginners and monthly competitions',
    link: 'https://codechef.com',
    tips: [
      'Start with "Beginner" problems in the Practice section.',
      'Participate in Long Challenges (10 days) to learn without time pressure.',
      'Lunchtime & Cook-Off contests are short (2.5h) — good for interview simulation.',
      'CodeChef Learn has curated DSA courses aligned with placements.',
      'Your star rating matters for some companies during campus placements.',
      '3★ (1400+ rating) is a solid placement-ready benchmark.',
    ]
  },
  {
    id: 'gfg', cls: 'gfg', logo: '🌿', name: 'GeeksforGeeks',
    tagline: 'The encyclopedia of DSA — theory + practice',
    link: 'https://practice.geeksforgeeks.org',
    tips: [
      'Use GFG for concept articles before jumping into practice problems.',
      '"Must Do Coding Questions" list is curated for placement season.',
      'Company-specific problem sets (Amazon, Google, Flipkart) are invaluable.',
      'Complete the "DSA Self Paced Course" if you need structured guidance.',
      'GFG Job portal lists off-campus openings linked to your problem-solving profile.',
      'Each article has C++/Java/Python code — great for comparing approaches.',
    ]
  }
];

/* ═══════════════════════════════════════════════════════════════════
   INIT — Entry Point
   ═══════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', async () => {
  loadAppState();
  setupAuthFormHandlers();

  const user = getCurrentUser();
  if (!user) {
    showAuthOverlay();
    return;
  }

  const trial = getTrialInfo();
  if (!trial.hasAccess) {
    showPaymentOverlay(user);
    return;
  }

  bootApp(user, trial);
});

/* ═══ AUTH OVERLAY ══════════════════════════════════════════════════ */
function showAuthOverlay() {
  document.getElementById('auth-overlay').style.display = 'flex';
  document.getElementById('payment-overlay').style.display = 'none';
  document.getElementById('main-app').style.display = 'none';
  document.getElementById('quotes-ticker').style.display = 'none';
}

function setupAuthFormHandlers() {
  // Sign In
  window._signInHandler = async function() {
    const btn = document.getElementById('signin-btn');
    const errEl = document.getElementById('signin-error');
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;
    setAuthBtnLoading(btn, true);
    errEl.style.display = 'none';
    try {
      const user = await signIn({ email, password });
      const trial = getTrialInfo();
      if (!trial.hasAccess) { showPaymentOverlay(user); }
      else { bootApp(user, trial); }
    } catch (e) {
      errEl.textContent = e.message;
      errEl.style.display = 'block';
    } finally { setAuthBtnLoading(btn, false); }
  };

  // Sign Up
  window._signUpHandler = async function() {
    const btn = document.getElementById('signup-btn');
    const errEl = document.getElementById('signup-error');
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const phone = document.getElementById('signup-phone').value.trim();
    const password = document.getElementById('signup-password').value;
    if (!name || !email || !phone || !password) { errEl.textContent = 'All fields are required.'; errEl.style.display = 'block'; return; }
    setAuthBtnLoading(btn, true);
    errEl.style.display = 'none';
    try {
      const user = await signUp({ name, email, phone, password });
      const trial = getTrialInfo();
      bootApp(user, trial);
    } catch (e) {
      errEl.textContent = e.message;
      errEl.style.display = 'block';
    } finally { setAuthBtnLoading(btn, false); }
  };

  // Sign Out
  window._signOutHandler = async function() {
    await signOut();
    clearInterval(trialTimerInterval);
    clearInterval(quoteInterval);
    location.reload();
  };
}

function setAuthBtnLoading(btn, loading) {
  btn.querySelector('.btn-text').style.display  = loading ? 'none' : 'inline';
  btn.querySelector('.btn-spinner').style.display = loading ? 'inline' : 'none';
  btn.disabled = loading;
}

/* ═══ PAYMENT OVERLAY ═══════════════════════════════════════════════ */
function showPaymentOverlay(user) {
  document.getElementById('auth-overlay').style.display = 'none';
  document.getElementById('payment-overlay').style.display = 'flex';
  document.getElementById('main-app').style.display = 'none';
  document.getElementById('quotes-ticker').style.display = 'none';

  document.getElementById('btn-pay-now').onclick = async () => {
    const btn = document.getElementById('btn-pay-now');
    const errEl = document.getElementById('payment-error');
    btn.disabled = true;
    btn.textContent = '⏳ Processing…';
    errEl.style.display = 'none';
    try {
      const paymentId = await openRazorpayCheckout(user);
      await markAsPaid(paymentId);
      const trial = getTrialInfo();
      bootApp(user, trial);
    } catch (e) {
      errEl.textContent = e.message;
      errEl.style.display = 'block';
      btn.disabled = false;
      btn.textContent = '💳 Pay ₹99 — Unlock Lifetime Access';
    }
  };
}

/* ═══ BOOT APP ══════════════════════════════════════════════════════ */
function bootApp(user, trial) {
  document.getElementById('auth-overlay').style.display = 'none';
  document.getElementById('payment-overlay').style.display = 'none';
  document.getElementById('main-app').style.display = 'grid';
  document.getElementById('quotes-ticker').style.display = 'block';

  // Populate user info
  const initial = (user.name || user.email || 'U')[0].toUpperCase();
  document.getElementById('user-initial').textContent = initial;
  document.getElementById('user-name-dd').textContent  = user.name || 'User';
  document.getElementById('user-email-dd').textContent = user.email || '';

  // Trial timer
  if (trial.isActive && !trial.isPaid) {
    document.getElementById('trial-timer-pill').style.display = 'flex';
    updateTrialTimer(trial.remaining);
    trialTimerInterval = setInterval(() => {
      const t = getTrialInfo();
      if (!t.isActive && !t.isPaid) { clearInterval(trialTimerInterval); showPaymentOverlay(user); return; }
      updateTrialTimer(t.remaining);
    }, 1000);
    document.getElementById('btn-upgrade-header').onclick = () => showPaymentOverlay(user);
  }

  // Init all sections
  initNav();
  initDifficultyFilter();
  initSearch();
  initLangPicker();
  renderDashboard();
  renderCurriculumList();
  renderRoadmap();
  renderPlatforms();
  if (curriculum.length) showLesson(curriculum[0].id);

  initSorting(document.getElementById('viewport'));
  updateVisualizerStats('sort-bubble');
  document.getElementById('algorithm-description').textContent = sortingComplexity['sort-bubble'].desc;

  initQuiz(onQuizComplete);
  setupVisualizerListeners();

  // User Avatar dropdown
  const avatarPill = document.getElementById('user-avatar-pill');
  avatarPill.addEventListener('click', e => { e.stopPropagation(); avatarPill.classList.toggle('open'); });
  document.addEventListener('click', () => avatarPill.classList.remove('open'));

  // Reset progress
  document.getElementById('reset-progress-btn').addEventListener('click', () => {
    if (confirm('Reset all learning progress? (Account stays active)')) {
      appState = { ...appState, completedLessons: [], quizHighScore: 0 };
      saveAppState();
      location.reload();
    }
  });

  // Start quotes
  initQuotesTicker();
  
  // Start AI Chatbot
  initChatbot();

  window.addEventListener('resize', () => {
    if (document.getElementById('visualizer-select').value.startsWith('ds-')) renderDS();
  });

  totalCnt.textContent = curriculum.length;
}

function updateTrialTimer(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  document.getElementById('trial-timer-label').textContent =
    `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')} left`;
}

/* ═══ QUOTES TICKER ══════════════════════════════════════════════════ */
function initQuotesTicker() {
  const textEl   = document.getElementById('quote-text');
  const authorEl = document.getElementById('quote-author');
  const wrapper  = document.querySelector('.quote-slide-wrapper');

  function showQuote(idx) {
    const q = QUOTES[idx % QUOTES.length];
    wrapper.style.opacity = '0';
    wrapper.style.transform = 'translateY(-6px)';
    setTimeout(() => {
      textEl.textContent   = `"${q.text}"`;
      authorEl.textContent = `— ${q.author}`;
      wrapper.style.opacity = '1';
      wrapper.style.transform = 'translateY(0)';
    }, 400);
    wrapper.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  }

  // Show first immediately
  showQuote(0);
  quoteInterval = setInterval(() => {
    currentQuoteIndex = (currentQuoteIndex + 1) % QUOTES.length;
    showQuote(currentQuoteIndex);
  }, 3000);
}

/* ═══ AI CHATBOT ═════════════════════════════════════════════════════ */
function initChatbot() {
  const btn = document.getElementById('ai-chat-btn');
  const win = document.getElementById('ai-chat-window');
  const closeBtn = document.getElementById('ai-chat-close');
  const input = document.getElementById('ai-chat-input');
  const sendBtn = document.getElementById('ai-chat-send');
  const msgs = document.getElementById('ai-chat-messages');

  btn.addEventListener('click', () => {
    win.style.display = win.style.display === 'none' ? 'flex' : 'none';
    if (win.style.display === 'flex') input.focus();
  });

  closeBtn.addEventListener('click', () => { win.style.display = 'none'; });

  async function handleSend() {
    const text = input.value.trim();
    if (!text) return;

    // Add user message
    input.value = '';
    const userDiv = document.createElement('div');
    userDiv.className = 'chat-msg msg-user';
    userDiv.textContent = text;
    msgs.appendChild(userDiv);
    msgs.scrollTop = msgs.scrollHeight;

    sendBtn.disabled = true;
    input.disabled = true;

    // Fetch AI response
    const aiResponse = await sendChatMessage(text);

    // Add AI message
    const aiDiv = document.createElement('div');
    aiDiv.className = 'chat-msg msg-ai';
    
    // Parse markdown (bold, code blocks)
    let formattedText = aiResponse
      .replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>')
      .replace(/\\`(.*?)\\`/g, '<code>$1</code>');
    
    // Convert triple backticks to pre code
    if (formattedText.includes('\`\`\`')) {
      const parts = formattedText.split('\`\`\`');
      formattedText = parts.map((p, i) => i % 2 !== 0 ? \`<pre><code>\${p.trim()}</code></pre>\` : p).join('');
    }

    aiDiv.innerHTML = formattedText;
    msgs.appendChild(aiDiv);
    msgs.scrollTop = msgs.scrollHeight;

    sendBtn.disabled = false;
    input.disabled = false;
    input.focus();
  }

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keypress', e => { if (e.key === 'Enter') handleSend(); });
}

/* ═══ NAVIGATION ════════════════════════════════════════════════════ */
const navItems  = document.querySelectorAll('.nav-item');
const tabPanes  = document.querySelectorAll('.tab-pane');
const progressVal = document.getElementById('overall-progress-val');
const completedCnt = document.getElementById('completed-count');
const totalCnt = document.getElementById('total-count');

function initNav() {
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const tab = item.dataset.tab;
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      tabPanes.forEach(p => { p.classList.remove('active'); if (p.id === tab) p.classList.add('active'); });
      if (tab === 'visualizer') {
        const val = document.getElementById('visualizer-select').value;
        if (val.startsWith('sort-')) resetGenerator();
        else initDS(document.getElementById('viewport'), val);
      }
    });
  });
}

/* ═══ DIFFICULTY FILTER ═════════════════════════════════════════════ */
function initDifficultyFilter() {
  document.querySelectorAll('.diff-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.diff-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      appState.activeDifficulty = chip.dataset.diff;
      renderDashboard(); renderCurriculumList();
    });
  });
}

/* ═══ SEARCH ════════════════════════════════════════════════════════ */
function initSearch() {
  const input    = document.getElementById('global-search-input');
  const dropdown = document.getElementById('search-results-dropdown');
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 2) { dropdown.classList.remove('visible'); return; }
    const results = curriculum.filter(t =>
      t.title.toLowerCase().includes(q) || t.category.toLowerCase().includes(q) || t.summary.toLowerCase().includes(q)
    ).slice(0, 6);
    if (!results.length) { dropdown.classList.remove('visible'); return; }
    dropdown.innerHTML = results.map(t => `
      <div class="search-result-item" data-id="${t.id}">
        <span style="font-size:1.3rem;">${t.icon}</span>
        <div>
          <div class="search-result-title">${t.title}</div>
          <div class="search-result-category">${t.category} · ${t.difficulty}</div>
        </div>
      </div>
    `).join('');
    dropdown.classList.add('visible');
    dropdown.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        input.value = ''; dropdown.classList.remove('visible');
        document.querySelector('[data-tab=learning]').click();
        showLesson(item.dataset.id);
      });
    });
  });
  document.addEventListener('click', e => { if (!e.target.closest('.global-search-wrapper')) dropdown.classList.remove('visible'); });
}

/* ═══ LANGUAGE PICKER ═══════════════════════════════════════════════ */
function initLangPicker() {
  const pill     = document.getElementById('lang-pill');
  const label    = document.getElementById('lang-pill-label');
  const options  = document.querySelectorAll('.lang-option');
  const labelsMap = { javascript: 'JS', cpp: 'C++', java: 'Java', python: 'Py' };

  pill.addEventListener('click', e => { e.stopPropagation(); pill.classList.toggle('open'); });
  document.addEventListener('click', () => pill.classList.remove('open'));

  options.forEach(opt => {
    if (opt.dataset.lang === appState.selectedLanguage) opt.classList.add('active');
    opt.addEventListener('click', () => {
      appState.selectedLanguage = opt.dataset.lang;
      label.textContent = labelsMap[opt.dataset.lang];
      options.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      saveAppState(); pill.classList.remove('open');
      if (currentLesson) showLesson(currentLesson);
    });
  });
  label.textContent = labelsMap[appState.selectedLanguage] || 'JS';
}

/* ═══ DASHBOARD ═════════════════════════════════════════════════════ */
function renderDashboard() {
  const grid = document.getElementById('dashboard-modules-grid');
  grid.innerHTML = '';
  const filtered = curriculum.filter(t => appState.activeDifficulty === 'all' || t.difficulty === appState.activeDifficulty);
  document.getElementById('dash-filter-label').textContent = filtered.length < curriculum.length ? `Showing ${filtered.length} of ${curriculum.length}` : '';
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
    card.addEventListener('click', () => { document.querySelector('[data-tab=learning]').click(); showLesson(topic.id); });
    grid.appendChild(card);
  });
  updateProgressUI();
}

/* ═══ ROADMAP ═══════════════════════════════════════════════════════ */
function renderRoadmap() {
  const flow = document.getElementById('roadmap-flow');
  flow.innerHTML = '';
  roadmapPhases.forEach(phase => {
    const phaseEl = document.createElement('div');
    phaseEl.className = 'roadmap-phase';
    phaseEl.innerHTML = `<div class="roadmap-phase-label">${phase.label}</div>`;
    const row = document.createElement('div');
    row.className = 'roadmap-nodes-row';
    phase.nodes.forEach(id => {
      const topic = curriculum.find(t => t.id === id);
      if (!topic) return;
      const done = appState.completedLessons.includes(id);
      const node = document.createElement('div');
      node.className = `roadmap-node ${done ? 'completed' : ''}`;
      node.innerHTML = `
        <div class="roadmap-node-dot"></div>
        <div style="flex:1">${topic.icon} ${topic.title}</div>
        <div style="font-size:0.65rem;color:${diffColor(topic.difficulty)};font-weight:700;">${topic.difficulty[0]}</div>
      `;
      node.addEventListener('click', () => { document.querySelector('[data-tab=learning]').click(); showLesson(id); });
      row.appendChild(node);
    });
    phaseEl.appendChild(row);
    flow.appendChild(phaseEl);
  });
}

/* ═══ PLATFORMS ═════════════════════════════════════════════════════ */
function renderPlatforms() {
  const grid = document.getElementById('platforms-grid');
  grid.innerHTML = '';
  PLATFORMS.forEach(p => {
    const card = document.createElement('div');
    card.className = `platform-card ${p.cls}`;
    card.innerHTML = `
      <div class="platform-logo">${p.logo}</div>
      <div class="platform-name">${p.name}</div>
      <div class="platform-tagline">${p.tagline}</div>
      <ul class="platform-tips">
        ${p.tips.map(t => `<li class="platform-tip">${t}</li>`).join('')}
      </ul>
      <a class="platform-link" href="${p.link}" target="_blank" rel="noopener">
        Open ${p.name} ↗
      </a>
    `;
    grid.appendChild(card);
  });
}

/* ═══ CURRICULUM LIST ═══════════════════════════════════════════════ */
function renderCurriculumList() {
  const list = document.getElementById('curriculum-list');
  list.innerHTML = '';
  const filtered = curriculum.filter(t => appState.activeDifficulty === 'all' || t.difficulty === appState.activeDifficulty);
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
      el.classList.add('active'); showLesson(topic.id);
    });
    list.appendChild(el);
  });
}

/* ═══ LESSON VIEWER ═════════════════════════════════════════════════ */
function esc(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function showLesson(lessonId) {
  const lesson = curriculum.find(x => x.id === lessonId);
  if (!lesson) return;
  currentLesson = lessonId;
  const done = appState.completedLessons.includes(lessonId);
  const viewer = document.getElementById('learning-content-viewer');

  // Mark active in curriculum list
  const activeNode = document.getElementById(`curr-node-${lessonId}`);
  if (activeNode) {
    document.querySelectorAll('.curriculum-node').forEach(n => n.classList.remove('active'));
    activeNode.classList.add('active');
    activeNode.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  const langs = [
    { id: 'javascript', label: '⚡ JavaScript' },
    { id: 'cpp',        label: '⚙️ C++' },
    { id: 'java',       label: '☕ Java' },
    { id: 'python',     label: '🐍 Python' }
  ];

  const codeHtml = lesson.code ? `
    <div class="code-tabs-header">
      ${langs.map(l => `<button class="code-tab-btn ${appState.selectedLanguage === l.id ? 'active' : ''}" data-lang="${l.id}">${l.label}</button>`).join('')}
    </div>
    <pre><code id="lesson-code-block">${esc(lesson.code[appState.selectedLanguage] || '')}</code></pre>
  ` : '';

  viewer.innerHTML = `
    <div>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
        <span class="diff-badge ${lesson.difficulty}">${lesson.difficulty}</span>
        <span style="color:var(--text-muted);font-size:0.8rem;">${lesson.category} · ${lesson.readTime}</span>
      </div>
      <h1>${lesson.icon} ${lesson.title}</h1>
    </div>
    <div>${lesson.details}${codeHtml}</div>
    <div class="lesson-actions">
      <a href="https://www.youtube.com/results?search_query=Bro+Code+${encodeURIComponent(lesson.title)}" target="_blank" rel="noopener" class="btn btn-youtube">▶️ Watch Bro Code Tutorial</a>
      <button class="btn btn-secondary" id="btn-lesson-vis">▶ Visualizer</button>
      <button class="btn ${done ? 'btn-secondary' : 'btn-accent'}" id="btn-mark-done" ${done ? 'disabled' : ''}>
        ${done ? '✓ Completed' : '🎯 Mark as Completed'}
      </button>
    </div>
  `;

  // Code tab switching
  if (lesson.code) {
    viewer.querySelectorAll('.code-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        appState.selectedLanguage = lang;
        const lblMap = { javascript: 'JS', cpp: 'C++', java: 'Java', python: 'Py' };
        document.getElementById('lang-pill-label').textContent = lblMap[lang];
        document.querySelectorAll('.lang-option').forEach(o => o.classList.toggle('active', o.dataset.lang === lang));
        viewer.querySelectorAll('.code-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('lesson-code-block').textContent = lesson.code[lang] || '';
        saveAppState();
      });
    });
  }

  // Visualizer shortcut
  const visMap = { 'arrays': 'sort-bubble', 'strings': 'sort-bubble', 'stack-queue': 'ds-stack', 'linked-list': 'ds-linkedlist', 'trees-bst': 'ds-bst', 'heaps': 'ds-bst', 'tries': 'ds-bst', 'sorting-algos': 'sort-merge', 'searching': 'sort-bubble', 'divide-conquer': 'sort-merge' };
  document.getElementById('btn-lesson-vis').addEventListener('click', () => {
    const val = visMap[lessonId] || 'sort-bubble';
    document.getElementById('visualizer-select').value = val;
    triggerVisualizerChange(val);
    document.querySelector('[data-tab=visualizer]').click();
  });

  // Mark complete
  document.getElementById('btn-mark-done').addEventListener('click', () => {
    if (!appState.completedLessons.includes(lessonId)) {
      appState.completedLessons.push(lessonId);
      saveAppState(); renderDashboard(); renderCurriculumList(); renderRoadmap();
      showLesson(lessonId);
    }
  });
}

/* ═══ VISUALIZER ════════════════════════════════════════════════════ */
function setupVisualizerListeners() {
  const sel   = document.getElementById('visualizer-select');
  const vp    = document.getElementById('viewport');
  const arr   = document.getElementById('array-container');
  const tn    = document.getElementById('tree-nodes');
  const ts    = document.getElementById('tree-svg');
  const dsGrp = document.getElementById('ds-controls-group');
  const btnGen = document.getElementById('btn-generate');
  const btnPP  = document.getElementById('btn-play-pause');
  const btnSt  = document.getElementById('btn-step');

  sel.addEventListener('change', e => triggerVisualizerChange(e.target.value));
  btnGen.addEventListener('click', () => { if (sel.value.startsWith('sort-')) generateRandomArray(); });
  btnPP.addEventListener('click', () => { if (isCurrentlyPlaying()) pause(); else play(); });
  btnSt.addEventListener('click', () => step());
  const slider = document.getElementById('speed-slider');
  slider.addEventListener('input', e => { document.getElementById('speed-label').textContent = `${e.target.value}ms`; setDelay(parseInt(e.target.value)); });
  document.getElementById('ds-btn-insert').addEventListener('click', () => handleDS('insert'));
  document.getElementById('ds-btn-remove').addEventListener('click', () => handleDS('remove'));
  document.getElementById('ds-btn-search').addEventListener('click', () => handleDS('search'));
  document.getElementById('ds-input-val').addEventListener('keypress', e => { if (e.key === 'Enter') handleDS('insert'); });
}

function triggerVisualizerChange(val) {
  pause();
  updateVisualizerStats(val);
  const vp    = document.getElementById('viewport');
  const arr   = document.getElementById('array-container');
  const tn    = document.getElementById('tree-nodes');
  const ts    = document.getElementById('tree-svg');
  const dsGrp = document.getElementById('ds-controls-group');
  const btnGen = document.getElementById('btn-generate');
  const btnPP  = document.getElementById('btn-play-pause');
  const btnSt  = document.getElementById('btn-step');
  const btnSearch = document.getElementById('ds-btn-search');
  if (val.startsWith('sort-')) {
    vp.style.alignItems = 'flex-end'; vp.style.padding = '40px 20px';
    arr.style.display = 'flex'; tn.style.display = 'none'; ts.style.display = 'none';
    dsGrp.style.display = 'none'; btnGen.style.display = 'inline-flex';
    btnPP.style.display = 'inline-flex'; btnSt.style.display = 'inline-flex';
    initSorting(vp);
  } else {
    vp.style.alignItems = 'center'; vp.style.padding = '0';
    arr.style.display = 'none'; tn.style.display = 'block'; ts.style.display = 'block';
    dsGrp.style.display = 'flex'; btnGen.style.display = 'none';
    btnPP.style.display = 'none'; btnSt.style.display = 'none';
    btnSearch.style.display = (val === 'ds-bst' || val === 'ds-linkedlist') ? 'inline-flex' : 'none';
    initDS(vp, val);
  }
}

function updateVisualizerStats(val) {
  const stats = val.startsWith('sort-') ? sortingComplexity[val] : dsComplexity[val];
  const optEl = document.querySelector(`option[value="${val}"]`);
  if (optEl) document.getElementById('visualizer-title').textContent = optEl.textContent;
  if (stats) {
    document.getElementById('stat-worst-time').textContent = stats.worstTime;
    document.getElementById('stat-best-time').textContent  = stats.bestTime;
    document.getElementById('stat-space').textContent      = stats.space;
    document.getElementById('algorithm-description').textContent = stats.desc;
  }
}

async function handleDS(cmd) {
  const activeDS = document.getElementById('visualizer-select').value;
  const numVal = parseInt(document.getElementById('ds-input-val').value, 10);
  if ((cmd === 'insert' || cmd === 'search') && (isNaN(numVal) || numVal < 0 || numVal > 99)) { alert('Enter a value between 0-99.'); return; }
  document.getElementById('ds-input-val').value = '';
  const btns = [document.getElementById('ds-btn-insert'), document.getElementById('ds-btn-remove'), document.getElementById('ds-btn-search'), document.getElementById('ds-input-val'), document.getElementById('visualizer-select')];
  btns.forEach(b => b.disabled = true);
  try {
    if (activeDS === 'ds-stack')      { cmd === 'insert' ? await pushStack(numVal) : await popStack(); }
    else if (activeDS === 'ds-queue') { cmd === 'insert' ? await enqueueQueue(numVal) : await dequeueQueue(); }
    else if (activeDS === 'ds-linkedlist') { if (cmd === 'insert') await insertHeadList(numVal); else if (cmd === 'remove') await deleteHeadList(); else await searchList(numVal); }
    else if (activeDS === 'ds-bst')   { if (cmd === 'insert') await insertBST(numVal); else if (cmd === 'remove') await deleteBST(numVal); else await searchBST(numVal); }
  } catch (e) { console.error(e); }
  finally { btns.forEach(b => b.disabled = false); }
}

/* ═══ QUIZ ═══════════════════════════════════════════════════════════ */
function onQuizComplete(score, max) {
  if (score > (appState.quizHighScore || 0)) { appState.quizHighScore = score; saveAppState(); }
}

/* ═══ HELPERS ════════════════════════════════════════════════════════ */
function diffColor(d) {
  if (d === 'Beginner') return 'var(--accent-emerald)';
  if (d === 'Intermediate') return 'var(--accent-amber)';
  return 'var(--accent-rose)';
}

function updateProgressUI() {
  const done  = appState.completedLessons.length;
  const total = curriculum.length;
  const pct   = Math.round((done / total) * 100);
  progressVal.textContent = `${pct}%`;
  completedCnt.textContent = done;
  totalCnt.textContent = total;
}

function loadAppState() {
  try {
    const raw = localStorage.getItem('dsaflow_app_v2');
    if (raw) appState = { ...appState, ...JSON.parse(raw) };
    if (!Array.isArray(appState.completedLessons)) appState.completedLessons = [];
  } catch (e) {}
}
function saveAppState() {
  try { localStorage.setItem('dsaflow_app_v2', JSON.stringify(appState)); } catch (e) {}
  updateProgressUI();
}
