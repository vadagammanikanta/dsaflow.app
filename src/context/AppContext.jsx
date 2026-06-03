import React, { createContext, useContext, useState, useEffect } from 'react';
import { curriculum } from '../../modules/learning/content_a2z';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [appState, setAppState] = useState(() => {
    const saved = localStorage.getItem('dsa_app_state');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        
        // Sanitize the completed lessons array to remove dummy or old data
        const validLessonIds = new Set(curriculum.map(c => c.id));
        parsed.completedLessons = (parsed.completedLessons || []).filter(id => validLessonIds.has(id));
        
        // Ensure activeLessonId points to a valid lesson (fallback to first lesson)
        if (!validLessonIds.has(parsed.activeLessonId)) {
          parsed.activeLessonId = 'language-syntax';
        }

        return parsed;
      } catch (e) { }
    }
    return {
      completedLessons: [],
      quizHighScore: 0,
      selectedLanguage: 'javascript',
      activeDifficulty: 'all',
      activeLessonId: 'language-syntax'
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
