import React, { createContext, useContext, useState, useEffect } from 'react';
import { curriculum } from '../../modules/learning/content_a2z';

const AppContext = createContext();

// ── Streak helpers ────────────────────────────────────────
function todayStr() {
  return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
}
function yesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}
export function getWeekKey() {
  const d = new Date();
  const start = new Date(d.setDate(d.getDate() - d.getDay()));
  return `${start.getFullYear()}-W${String(Math.ceil((start.getDate()) / 7)).padStart(2,'0')}`;
}
function computeStreak(lastActive, currentStreak) {
  const today = todayStr();
  const yesterday = yesterdayStr();
  if (lastActive === today) return currentStreak;          // already counted today
  if (lastActive === yesterday) return currentStreak + 1; // consecutive day
  return 1;                                                // streak broken, restart
}

// ── POTD rotation — deterministic by date ──────────────────
const POTD_POOL = [
  { id: 'potd-1', title: 'Two Sum', difficulty: 'Easy', pattern: 'HashMap', link: 'https://leetcode.com/problems/two-sum/', companies: ['Amazon','Google','Facebook'] },
  { id: 'potd-2', title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', pattern: 'Sliding Window', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', companies: ['Amazon','Microsoft'] },
  { id: 'potd-3', title: 'Contains Duplicate', difficulty: 'Easy', pattern: 'HashSet', link: 'https://leetcode.com/problems/contains-duplicate/', companies: ['Amazon'] },
  { id: 'potd-4', title: 'Longest Substring Without Repeating Chars', difficulty: 'Medium', pattern: 'Sliding Window', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', companies: ['Amazon','Google','Uber'] },
  { id: 'potd-5', title: 'Product of Array Except Self', difficulty: 'Medium', pattern: 'Prefix/Suffix', link: 'https://leetcode.com/problems/product-of-array-except-self/', companies: ['Google','Facebook','Amazon'] },
  { id: 'potd-6', title: 'Maximum Subarray', difficulty: 'Medium', pattern: 'Kadane\'s', link: 'https://leetcode.com/problems/maximum-subarray/', companies: ['Amazon','Apple','Microsoft'] },
  { id: 'potd-7', title: 'Valid Parentheses', difficulty: 'Easy', pattern: 'Stack', link: 'https://leetcode.com/problems/valid-parentheses/', companies: ['Google','Amazon','Facebook'] },
  { id: 'potd-8', title: 'Binary Search', difficulty: 'Easy', pattern: 'Binary Search', link: 'https://leetcode.com/problems/binary-search/', companies: ['Facebook','Microsoft'] },
  { id: 'potd-9', title: 'Reverse Linked List', difficulty: 'Easy', pattern: 'Linked List', link: 'https://leetcode.com/problems/reverse-linked-list/', companies: ['Amazon','Microsoft','Adobe'] },
  { id: 'potd-10', title: 'Climbing Stairs', difficulty: 'Easy', pattern: 'Dynamic Programming', link: 'https://leetcode.com/problems/climbing-stairs/', companies: ['Amazon','Google'] },
  { id: 'potd-11', title: 'Merge Two Sorted Lists', difficulty: 'Easy', pattern: 'Linked List', link: 'https://leetcode.com/problems/merge-two-sorted-lists/', companies: ['Amazon','Microsoft'] },
  { id: 'potd-12', title: 'Number of Islands', difficulty: 'Medium', pattern: 'BFS/DFS', link: 'https://leetcode.com/problems/number-of-islands/', companies: ['Amazon','Google','Bloomberg'] },
  { id: 'potd-13', title: 'Coin Change', difficulty: 'Medium', pattern: 'Dynamic Programming', link: 'https://leetcode.com/problems/coin-change/', companies: ['Amazon','Google','Microsoft'] },
  { id: 'potd-14', title: 'Merge Intervals', difficulty: 'Medium', pattern: 'Intervals', link: 'https://leetcode.com/problems/merge-intervals/', companies: ['Google','Facebook','Microsoft'] },
  { id: 'potd-15', title: 'LRU Cache', difficulty: 'Hard', pattern: 'HashMap + DLL', link: 'https://leetcode.com/problems/lru-cache/', companies: ['Amazon','Google','Microsoft'] },
  { id: 'potd-16', title: '3Sum', difficulty: 'Medium', pattern: 'Two Pointers', link: 'https://leetcode.com/problems/3sum/', companies: ['Facebook','Amazon','Microsoft'] },
  { id: 'potd-17', title: 'Kth Largest Element in Array', difficulty: 'Medium', pattern: 'Heap/QuickSelect', link: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', companies: ['Amazon','Facebook','Google'] },
  { id: 'potd-18', title: 'Word Break', difficulty: 'Medium', pattern: 'Dynamic Programming', link: 'https://leetcode.com/problems/word-break/', companies: ['Google','Amazon','Microsoft'] },
  { id: 'potd-19', title: 'Find the Duplicate Number', difficulty: 'Medium', pattern: 'Floyd\'s Cycle', link: 'https://leetcode.com/problems/find-the-duplicate-number/', companies: ['Amazon','Google'] },
  { id: 'potd-20', title: 'Trapping Rain Water', difficulty: 'Hard', pattern: 'Two Pointers', link: 'https://leetcode.com/problems/trapping-rain-water/', companies: ['Amazon','Google','Bloomberg'] },
  { id: 'potd-21', title: 'Valid Anagram', difficulty: 'Easy', pattern: 'HashMap', link: 'https://leetcode.com/problems/valid-anagram/', companies: ['Amazon','Facebook'] },
  { id: 'potd-22', title: 'Course Schedule', difficulty: 'Medium', pattern: 'Topological Sort', link: 'https://leetcode.com/problems/course-schedule/', companies: ['Google','Amazon'] },
  { id: 'potd-23', title: 'Serialize and Deserialize Binary Tree', difficulty: 'Hard', pattern: 'BFS/DFS', link: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', companies: ['Google','Amazon','Facebook'] },
  { id: 'potd-24', title: 'Longest Palindromic Substring', difficulty: 'Medium', pattern: 'DP/Expand Around Center', link: 'https://leetcode.com/problems/longest-palindromic-substring/', companies: ['Amazon','Microsoft','Facebook'] },
  { id: 'potd-25', title: 'Jump Game', difficulty: 'Medium', pattern: 'Greedy', link: 'https://leetcode.com/problems/jump-game/', companies: ['Amazon','Microsoft'] },
  { id: 'potd-26', title: 'Lowest Common Ancestor of BST', difficulty: 'Medium', pattern: 'Tree', link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/', companies: ['Amazon','Facebook'] },
  { id: 'potd-27', title: 'Combination Sum', difficulty: 'Medium', pattern: 'Backtracking', link: 'https://leetcode.com/problems/combination-sum/', companies: ['Google','Amazon'] },
  { id: 'potd-28', title: 'Search in Rotated Sorted Array', difficulty: 'Medium', pattern: 'Binary Search', link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', companies: ['Facebook','Amazon','Microsoft'] },
  { id: 'potd-29', title: 'Decode Ways', difficulty: 'Medium', pattern: 'Dynamic Programming', link: 'https://leetcode.com/problems/decode-ways/', companies: ['Meta','Amazon'] },
  { id: 'potd-30', title: 'Rotate Image', difficulty: 'Medium', pattern: 'Matrix', link: 'https://leetcode.com/problems/rotate-image/', companies: ['Amazon','Microsoft','Apple'] },
];

export function getTodayPOTD() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return POTD_POOL[dayOfYear % POTD_POOL.length];
}
export { POTD_POOL };

// ── Badge definitions ──────────────────────────────────────
export const BADGES = [
  { id: 'first_blood', icon: '🔰', name: 'First Blood', desc: 'Solve your first problem', color: '#06b6d4' },
  { id: 'on_fire', icon: '🔥', name: 'On Fire', desc: 'Reach a 7-day streak', color: '#f97316' },
  { id: 'scholar', icon: '📚', name: 'Scholar', desc: 'Complete 10 modules', color: '#8b5cf6' },
  { id: 'pattern_hunter', icon: '🧩', name: 'Pattern Hunter', desc: 'Mark 20 patterns done', color: '#ec4899' },
  { id: 'centurion', icon: '💯', name: 'Centurion', desc: 'Solve 100 problems', color: '#eab308' },
  { id: 'diamond', icon: '💎', name: 'DSA Diamond', desc: 'Complete all modules', color: '#22d3ee' },
  { id: 'potd_week', icon: '📅', name: 'Consistent', desc: 'Solve POTD 7 days in a row', color: '#10b981' },
  { id: 'faang_ready', icon: '🚀', name: 'FAANG Ready', desc: 'Complete 30 modules & 50 problems', color: '#a78bfa' },
  { id: 'streak_30', icon: '🏆', name: 'Legend', desc: 'Achieve a 30-day streak', color: '#fbbf24' },
  { id: 'night_owl', icon: '🦉', name: 'Night Owl', desc: 'Use the AI after 10 PM', color: '#6366f1' },
];

export function computeBadges(appState) {
  const earned = new Set(appState.earnedBadges || []);
  const newEarned = [];
  const problemsSolved = Object.values(appState.patternProgress || {})
    .reduce((t, p) => t + (p.done?.length || 0), 0);
  const modulesComplete = (appState.completedLessons || []).length;
  const streak = appState.dayStreak || 0;
  const potdStreak = appState.potdStreak || 0;

  if (problemsSolved >= 1 && !earned.has('first_blood')) newEarned.push('first_blood');
  if (streak >= 7 && !earned.has('on_fire')) newEarned.push('on_fire');
  if (modulesComplete >= 10 && !earned.has('scholar')) newEarned.push('scholar');
  if (problemsSolved >= 20 && !earned.has('pattern_hunter')) newEarned.push('pattern_hunter');
  if (problemsSolved >= 100 && !earned.has('centurion')) newEarned.push('centurion');
  if (modulesComplete >= (curriculum?.length || 42) && !earned.has('diamond')) newEarned.push('diamond');
  if (potdStreak >= 7 && !earned.has('potd_week')) newEarned.push('potd_week');
  if (modulesComplete >= 30 && problemsSolved >= 50 && !earned.has('faang_ready')) newEarned.push('faang_ready');
  if (streak >= 30 && !earned.has('streak_30')) newEarned.push('streak_30');
  // night owl: if current hour is >= 22
  if (new Date().getHours() >= 22 && !earned.has('night_owl')) newEarned.push('night_owl');

  return newEarned;
}

export function AppProvider({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [appState, setAppState] = useState(() => {
    const saved = localStorage.getItem('dsaflow_app_state')
      || localStorage.getItem('dsa_app_state'); // backwards compat
    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        // Sanitize completed lessons
        const validLessonIds = new Set(curriculum.map(c => c.id));
        parsed.completedLessons = (parsed.completedLessons || []).filter(id => validLessonIds.has(id));

        // Ensure activeLessonId is valid
        if (!validLessonIds.has(parsed.activeLessonId)) {
          parsed.activeLessonId = 'language-syntax';
        }

        // Compute streak on load
        const today = todayStr();
        const lastActive = parsed.lastActiveDate || null;
        const currentStreak = parsed.dayStreak || 0;
        if (lastActive !== today) {
          parsed.dayStreak = computeStreak(lastActive, currentStreak);
          parsed.lastActiveDate = today;
          
          // Check for badge unlocks on streak increase
          const newlyEarned = computeBadges(parsed);
          if (newlyEarned.length > 0) {
            parsed.earnedBadges = [...(parsed.earnedBadges || []), ...newlyEarned];
            parsed.newBadges = newlyEarned;
          }
        }

        return parsed;
      } catch { /* ignore parse errors */ }
    }
    return {
      completedLessons: [],
      solvedProblems: {},           // { problemId: true }
      bookmarkedProblems: {},       // { problemId: true }
      patternProgress: {},          // { patternId: { done: [idx,...] } }
      patternNotes: {},             // { 'patternId-problemIdx': 'note text' }
      quizHighScore: 0,
      selectedLanguage: 'javascript',
      activeDifficulty: 'all',
      activeLessonId: 'language-syntax',
      dayStreak: 1,
      lastActiveDate: todayStr(),
      interviewDate: null,          // "YYYY-MM-DD"
      notes: {},                    // { lessonId: "text..." }
      potdSolved: {},               // { 'YYYY-MM-DD': potdId }
      potdStreak: 0,
      potdLastDate: null,
      earnedBadges: [],             // ['first_blood', 'on_fire', ...]
      newBadges: [],                // newly earned badges for toast
      leaderboardName: '',          // display name for leaderboard
      notifEnabled: false,
      weeklyScores: {},             // { 'YYYY-Www': { problems, modules, streak } }
    };
  });

  // Persist on every change
  useEffect(() => {
    localStorage.setItem('dsaflow_app_state', JSON.stringify(appState));
  }, [appState]);

  const checkAndAwardBadges = (state) => {
    const newlyEarned = computeBadges(state);
    if (newlyEarned.length > 0) {
      return {
        ...state,
        earnedBadges: [...(state.earnedBadges || []), ...newlyEarned],
        newBadges: newlyEarned,
      };
    }
    return state;
  };

  const checkNightOwlBadge = () => {
    if (new Date().getHours() >= 22) {
      setAppState(prev => {
        const earned = new Set(prev.earnedBadges || []);
        if (!earned.has('night_owl')) {
          return {
            ...prev,
            earnedBadges: [...(prev.earnedBadges || []), 'night_owl'],
            newBadges: ['night_owl']
          };
        }
        return prev;
      });
    }
  };

  const updateAppState = (updates) => {
    setAppState(prev => ({ ...prev, ...updates }));
  };

  const clearNewBadges = () => {
    setAppState(prev => ({ ...prev, newBadges: [] }));
  };

  const markLessonCompleted = (id) => {
    setAppState(prev => {
      if (prev.completedLessons.includes(id)) return prev;
      const wk = getWeekKey();
      const currentWeek = prev.weeklyScores?.[wk] || { problems: 0, modules: 0, streak: 0 };
      const nextWeekly = {
        ...prev.weeklyScores,
        [wk]: {
          ...currentWeek,
          modules: currentWeek.modules + 1,
          streak: Math.max(currentWeek.streak, prev.dayStreak || 0)
        }
      };
      const nextState = {
        ...prev,
        completedLessons: [...prev.completedLessons, id],
        weeklyScores: nextWeekly,
      };
      return checkAndAwardBadges(nextState);
    });
  };

  // ── Pattern problem completion ─────────────────────────
  const togglePatternProblem = (patternId, problemIdx) => {
    setAppState(prev => {
      const pp = prev.patternProgress || {};
      const current = pp[patternId]?.done || [];
      const isDone = current.includes(problemIdx);
      const nextDone = isDone
        ? current.filter(i => i !== problemIdx)
        : [...current, problemIdx];

      const wk = getWeekKey();
      const currentWeek = prev.weeklyScores?.[wk] || { problems: 0, modules: 0, streak: 0 };
      const diff = isDone ? -1 : 1;
      const nextWeekly = {
        ...prev.weeklyScores,
        [wk]: {
          ...currentWeek,
          problems: Math.max(0, currentWeek.problems + diff),
          streak: Math.max(currentWeek.streak, prev.dayStreak || 0)
        }
      };

      const nextState = {
        ...prev,
        patternProgress: {
          ...pp,
          [patternId]: {
            done: nextDone,
          },
        },
        weeklyScores: nextWeekly,
      };
      return checkAndAwardBadges(nextState);
    });
  };

  // ── Pattern Notes ──────────────────────────────────────
  const savePatternNote = (key, text) => {
    setAppState(prev => ({
      ...prev,
      patternNotes: { ...(prev.patternNotes || {}), [key]: text },
    }));
  };

  // ── Bookmarks ─────────────────────────────────────────
  const toggleBookmark = (problemId) => {
    setAppState(prev => {
      const bm = { ...(prev.bookmarkedProblems || {}) };
      if (bm[problemId]) delete bm[problemId];
      else bm[problemId] = true;
      return { ...prev, bookmarkedProblems: bm };
    });
  };

  // ── Notes ─────────────────────────────────────────────
  const saveNote = (lessonId, text) => {
    setAppState(prev => ({
      ...prev,
      notes: { ...(prev.notes || {}), [lessonId]: text },
    }));
  };

  // ── Interview date ────────────────────────────────────
  const setInterviewDate = (dateStr) => {
    updateAppState({ interviewDate: dateStr });
  };

  // ── Interview countdown helper (days left) ────────────
  const interviewDaysLeft = appState.interviewDate
    ? Math.max(0, Math.ceil(
        (new Date(appState.interviewDate) - new Date()) / (1000 * 60 * 60 * 24)
      ))
    : null;

  // ── POTD Mark Solved ──────────────────────────────────
  const markPOTDSolved = (potdId) => {
    const today = todayStr();
    setAppState(prev => {
      const yesterday = yesterdayStr();
      const lastPotd = prev.potdLastDate;
      const newStreak = lastPotd === yesterday ? (prev.potdStreak || 0) + 1
        : lastPotd === today ? prev.potdStreak
        : 1;

      const wk = getWeekKey();
      const currentWeek = prev.weeklyScores?.[wk] || { problems: 0, modules: 0, streak: 0 };
      const nextWeekly = {
        ...prev.weeklyScores,
        [wk]: {
          ...currentWeek,
          problems: currentWeek.problems + 1,
          streak: Math.max(currentWeek.streak, prev.dayStreak || 0)
        }
      };

      const nextState = {
        ...prev,
        potdSolved: { ...(prev.potdSolved || {}), [today]: potdId },
        potdStreak: newStreak,
        potdLastDate: today,
        weeklyScores: nextWeekly,
      };
      return checkAndAwardBadges(nextState);
    });
  };

  const resetProgress = () => {
    if (window.confirm('Reset all learning progress? (Account stays active)')) {
      updateAppState({
        completedLessons: [],
        quizHighScore: 0,
        patternProgress: {},
        bookmarkedProblems: {},
        notes: {},
        patternNotes: {},
        potdSolved: {},
        potdStreak: 0,
        potdLastDate: null,
        earnedBadges: [],
        newBadges: [],
      });
    }
  };

  return (
    <AppContext.Provider value={{
      appState,
      updateAppState,
      markLessonCompleted,
      togglePatternProblem,
      savePatternNote,
      toggleBookmark,
      saveNote,
      setInterviewDate,
      interviewDaysLeft,
      markPOTDSolved,
      clearNewBadges,
      resetProgress,
      mobileMenuOpen,
      setMobileMenuOpen,
      checkNightOwlBadge,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
