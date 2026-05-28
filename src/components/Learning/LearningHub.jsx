import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { curriculum } from '../../../modules/learning/content_a2z';
import LessonViewer from './LessonViewer';

export default function LearningHub() {
  const { appState, updateAppState } = useApp();

  const getDiffColor = (difficulty) => {
    if (difficulty === 'Beginner') return 'var(--accent-emerald)';
    if (difficulty === 'Intermediate') return 'var(--accent-amber)';
    return 'var(--accent-rose)';
  };

  // Filter lessons in the sidebar by difficulty chip selected in sidebar
  const filteredLessons = useMemo(() => {
    return curriculum.filter(lesson => 
      appState.activeDifficulty === 'all' || 
      lesson.difficulty.toLowerCase() === appState.activeDifficulty.toLowerCase()
    );
  }, [appState.activeDifficulty]);

  const activeLesson = useMemo(() => {
    return curriculum.find(l => l.id === appState.activeLessonId) || curriculum[0];
  }, [appState.activeLessonId]);

  return (
    <div className="learning-layout">
      {/* Sidebar: Curriculum List */}
      <div className="curriculum-list" id="curriculum-list">
        {filteredLessons.map(lesson => {
          const isCompleted = appState.completedLessons.includes(lesson.id);
          const isActive = appState.activeLessonId === lesson.id;
          
          return (
            <div 
              key={lesson.id}
              className={`curriculum-node ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              onClick={() => updateAppState({ activeLessonId: lesson.id })}
            >
              <div className="curriculum-node-title">
                {lesson.icon} {lesson.title}
              </div>
              <div className="curriculum-node-meta">
                <span>{lesson.category}</span>
                <span style={{ color: getDiffColor(lesson.difficulty) }}>
                  {lesson.difficulty}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Area: Lesson Viewer */}
      <div className="learning-content-viewer" id="learning-content-viewer">
        {activeLesson ? (
          <LessonViewer lesson={activeLesson} />
        ) : (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', margin: 'auto' }}>
            Select a topic to begin learning.
          </p>
        )}
      </div>
    </div>
  );
}
