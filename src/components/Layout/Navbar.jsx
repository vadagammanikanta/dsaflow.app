import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { curriculum } from '../../../modules/learning/content_a2z';

export default function Navbar() {
  const { appState, updateAppState, resetProgress } = useApp();
  
  const handleDifficultyChange = (diff) => {
    updateAppState({ activeDifficulty: diff });
  };

  const doneCount = appState.completedLessons.length;
  const totalCount = curriculum.length;

  return (
    <aside>
      <div className="nav-menu">
        <div className="nav-section-title">Navigation</div>
        
        <NavLink to="/" end className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/roadmap" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>
          <span>Roadmap</span>
        </NavLink>

        <NavLink to="/visualizer" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
          <span>Visualizer</span>
        </NavLink>

        <NavLink to="/arena" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18l6-6-6-6M8 6L2 12l6 6"/></svg>
          <span>Coding Arena</span>
        </NavLink>

        <NavLink to="/ide" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          <span>Online IDE</span>
        </NavLink>

        <NavLink to="/learn" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          <span>Learn</span>
        </NavLink>

        <NavLink to="/platforms" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          <span>Platforms</span>
        </NavLink>

        <NavLink to="/quiz" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
          <span>Quiz</span>
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
  );
}
