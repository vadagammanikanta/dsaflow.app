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
function computeStreak(lastActive, currentStreak) {
  const today = todayStr();
  const yesterday = yesterdayStr();
  if (lastActive === today) return currentStreak;          // already counted today
  if (lastActive === yesterday) return currentStreak + 1; // consecutive day
  return 1;                                                // streak broken, restart
}

export function AppProvider({ children }) {
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
        }

        return parsed;
      } catch (e) { /* ignore parse errors */ }
    }
    return {
      completedLessons: [],
      solvedProblems: {},           // { problemId: true }
      bookmarkedProblems: {},       // { problemId: true }
      patternProgress: {},          // { patternId: { done: [idx,...] } }
      quizHighScore: 0,
      selectedLanguage: 'javascript',
      activeDifficulty: 'all',
      activeLessonId: 'language-syntax',
      dayStreak: 1,
      lastActiveDate: todayStr(),
      interviewDate: null,          // "YYYY-MM-DD"
      notes: {},                    // { lessonId: "text..." }
    };
  });

  // Persist on every change
  useEffect(() => {
    localStorage.setItem('dsaflow_app_state', JSON.stringify(appState));
  }, [appState]);

  // Mark today active whenever app loads
  useEffect(() => {
    const today = todayStr();
    if (appState.lastActiveDate !== today) {
      setAppState(prev => ({
        ...prev,
        dayStreak: computeStreak(prev.lastActiveDate, prev.dayStreak),
        lastActiveDate: today,
      }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateAppState = (updates) => {
    setAppState(prev => ({ ...prev, ...updates }));
  };

  const markLessonCompleted = (id) => {
    setAppState(prev => {
      if (prev.completedLessons.includes(id)) return prev;
      return { ...prev, completedLessons: [...prev.completedLessons, id] };
    });
  };

  // ── Pattern problem completion ─────────────────────────
  const togglePatternProblem = (patternId, problemIdx) => {
    setAppState(prev => {
      const pp = prev.patternProgress || {};
      const current = pp[patternId]?.done || [];
      const isDone = current.includes(problemIdx);
      return {
        ...prev,
        patternProgress: {
          ...pp,
          [patternId]: {
            done: isDone
              ? current.filter(i => i !== problemIdx)
              : [...current, problemIdx],
          },
        },
      };
    });
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

  const resetProgress = () => {
    if (window.confirm('Reset all learning progress? (Account stays active)')) {
      updateAppState({
        completedLessons: [],
        quizHighScore: 0,
        patternProgress: {},
        bookmarkedProblems: {},
        notes: {},
      });
    }
  };

  return (
    <AppContext.Provider value={{
      appState,
      updateAppState,
      markLessonCompleted,
      togglePatternProblem,
      toggleBookmark,
      saveNote,
      setInterviewDate,
      interviewDaysLeft,
      resetProgress,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
