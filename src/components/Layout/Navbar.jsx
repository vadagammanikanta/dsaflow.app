import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { curriculum } from '../../../modules/learning/content_a2z';

export default function Navbar() {
  const { appState, updateAppState, resetProgress, mobileMenuOpen, setMobileMenuOpen } = useApp();
  
  const handleDifficultyChange = (diff) => {
    updateAppState({ activeDifficulty: diff });
  };

  const doneCount = appState.completedLessons.length;
  const totalCount = curriculum.length;

  return (
    <>
      {mobileMenuOpen && <div className="sidebar-backdrop" onClick={() => setMobileMenuOpen(false)} />}
      <aside className={mobileMenuOpen ? "open" : ""}>
        <div className="nav-menu" onClick={() => setMobileMenuOpen(false)}>
        <div className="nav-section-title">Navigation</div>
        
        {/* 1. Home */}
        <NavLink to="/" end className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          <span>Dashboard</span>
        </NavLink>

        {/* 2. Plan */}
        <NavLink to="/roadmap" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>
          <span>Roadmap</span>
        </NavLink>

        {/* 3. Learn */}
        <NavLink to="/learn" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          <span>Learn</span>
        </NavLink>

        {/* 4. Patterns — after learning, before practice */}
        <NavLink to="/patterns" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><path d="M13 17h2m4 0h-4m0 0V13m0 4v4"/></svg>
          <span>Patterns</span>
        </NavLink>

        {/* 5. Visualizer — understand before coding */}
        <NavLink to="/visualizer" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
          <span>Visualizer</span>
        </NavLink>

        {/* 6. Coding Arena — practice problems */}
        <NavLink to="/arena" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18l6-6-6-6M8 6L2 12l6 6"/></svg>
          <span>Coding Arena</span>
        </NavLink>

        {/* 7. Online IDE — write & run code */}
        <NavLink to="/ide" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          <span>Online IDE</span>
        </NavLink>

        {/* 8. Quiz — test knowledge */}
        <NavLink to="/quiz" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
          <span>Quiz</span>
        </NavLink>

        {/* 9. AI Assistant */}
        <NavLink to="/ai" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5z"/><path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z"/></svg>
          <span>dsaflow AI</span>
        </NavLink>

        {/* 1v1 Coding Duels */}
        <NavLink to="/duels" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          <span>1v1 Duels</span>
        </NavLink>

        {/* 10. Study Planner */}
        <NavLink to="/planner" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          <span>Study Planner</span>
        </NavLink>

        {/* 11. Leaderboard */}
        <NavLink to="/leaderboard" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
          <span>Leaderboard</span>
        </NavLink>

        {/* 12. Platforms */}
        <NavLink to="/platforms" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          <span>Platforms</span>
        </NavLink>

        {/* 13. Support — always last */}
        <NavLink to="/support" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <span>Support</span>
        </NavLink>

        <div className="nav-section-title" style={{ marginTop: '20px' }}>Filter</div>
        <div className="difficulty-filter">
          <div 
            className={`diff-chip all ${appState.activeDifficulty === 'all' ? 'active' : ''}`} 
            onClick={() => handleDifficultyChange('all')}
          >
            All
          </div>
          <div 
            className={`diff-chip beginner ${appState.activeDifficulty === 'Beginner' ? 'active' : ''}`} 
            onClick={() => handleDifficultyChange('Beginner')}
          >
            Beginner
          </div>
          <div 
            className={`diff-chip intermediate ${appState.activeDifficulty === 'Intermediate' ? 'active' : ''}`} 
            onClick={() => handleDifficultyChange('Intermediate')}
          >
            Intermediate
          </div>
          <div 
            className={`diff-chip advanced ${appState.activeDifficulty === 'Advanced' ? 'active' : ''}`} 
            onClick={() => handleDifficultyChange('Advanced')}
          >
            Advanced
          </div>
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="stats-mini">
          <span>{doneCount}</span> / <span>{totalCount}</span> completed
        </div>
        <button 
          className="btn btn-secondary" 
          style={{ width: '100%', fontSize: '0.82rem' }} 
          onClick={resetProgress}
        >
          Reset Progress
        </button>
      </div>
      </aside>
    </>
  );
}
