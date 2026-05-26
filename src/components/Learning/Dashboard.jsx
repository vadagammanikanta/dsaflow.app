import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { curriculum } from '../../../modules/learning/content_a2z';

export default function Dashboard() {
  const { appState, updateAppState } = useApp();
  const { trial } = useAuth();
  const navigate = useNavigate();

  // Filter lessons based on difficulty chip from sidebar
  const filteredLessons = useMemo(() => {
    return curriculum.filter(lesson => 
      appState.activeDifficulty === 'all' || 
      lesson.difficulty.toLowerCase() === appState.activeDifficulty.toLowerCase()
    );
  }, [appState.activeDifficulty]);

  const handleCardClick = (lessonId) => {
    updateAppState({ activeLessonId: lessonId });
    navigate('/learn');
  };

  const isPremium = trial?.isPaid;

  return (
    <section className="tab-pane active" id="dashboard" style={{ display: 'grid', gap: '20px' }}>
      
      {/* Welcome Hero Banner */}
      <div className="card welcome-hero">
        <div className="hero-badge">
          🚀 {isPremium ? 'Premium Account Active' : 'Placement Ready • Free Trial Active'}
        </div>
        <h1>Master DSA with <span class="gradient-text">dsa.flow</span></h1>
        <p>The most comprehensive, interactive DSA platform built for cracking FAANG, product-based &amp; service-based company interviews. Learn, visualize, and solve.</p>
        
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button className="btn btn-accent" onClick={() => navigate('/roadmap')}>
            🗺️ View Roadmap
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/learn')}>
            📖 Start Learning
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/platforms')}>
            🌐 Platform Guides
          </button>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <span>{curriculum.length}</span>
            <small>Modules</small>
          </div>
          <div className="hero-stat">
            <span>4</span>
            <small>Languages</small>
          </div>
          <div className="hero-stat">
            <span>15</span>
            <small>Quiz Q&As</small>
          </div>
          <div className="hero-stat">
            <span>5</span>
            <small>Platforms</small>
          </div>
          <div className="hero-stat">
            <span>∞</span>
            <small>Visualizations</small>
          </div>
        </div>
      </div>

      {/* Grid Section Header */}
      <div className="section-header" style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Learning Modules</h2>
        {filteredLessons.length < curriculum.length && (
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Showing {filteredLessons.length} of {curriculum.length}
          </span>
        )}
      </div>

      {/* Modules Cards Grid */}
      <div className="grid-3col" id="dashboard-modules-grid">
        {filteredLessons.map(lesson => {
          const isCompleted = appState.completedLessons.includes(lesson.id);
          
          return (
            <div 
              key={lesson.id} 
              className="card topic-card"
              onClick={() => handleCardClick(lesson.id)}
            >
              <div className="topic-card-top">
                <div className={`topic-icon ${lesson.iconColor || 'purple'}`}>{lesson.icon}</div>
                <span className={`diff-badge ${lesson.difficulty}`}>{lesson.difficulty}</span>
              </div>
              <div className="topic-title">{lesson.title}</div>
              <div className="topic-summary">{lesson.summary}</div>
              <div className="topic-meta">
                <span>{lesson.category} • {lesson.readTime || '5 mins'}</span>
                {isCompleted && <span className="topic-completed">✓ Completed</span>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
