import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [appState, setAppState] = useState(() => {
    const saved = localStorage.getItem('dsa_app_state');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return {
      completedLessons: [],
      quizHighScore: 0,
      selectedLanguage: 'javascript',
      activeDifficulty: 'all',
      activeLessonId: 'a2z-s1-c499-p1'
    };
  });

  useEffect(() => {
    localStorage.setItem('dsa_app_state', JSON.stringify(appState));
  }, [appState]);

  const updateAppState = (updates) => {
    setAppState(prev => ({ ...prev, ...updates }));
  };

  const markLessonCompleted = (id) => {
    setAppState(prev => {
      if (prev.completedLessons.includes(id)) return prev;
      return { ...prev, completedLessons: [...prev.completedLessons, id] };
    });
  };

  const resetProgress = () => {
    if (window.confirm('Reset all learning progress? (Account stays active)')) {
      updateAppState({ completedLessons: [], quizHighScore: 0 });
    }
  };

  return (
    <AppContext.Provider value={{ appState, updateAppState, markLessonCompleted, resetProgress }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
