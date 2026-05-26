import React, { useEffect, useRef, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import AlgorithmCodeFetcher from './AlgorithmCodeFetcher';
import { githubAlgorithmMappings } from '../../../modules/learning/content_a2z';

export default function LessonViewer({ lesson }) {
  const { appState, markLessonCompleted } = useApp();
  const navigate = useNavigate();
  const contentRef = useRef(null);

  const mapping = githubAlgorithmMappings[lesson?.id];
  const [activeCodeLang, setActiveCodeLang] = useState('javascript');

  useEffect(() => {
    if (mapping) {
      const availableLangs = Object.keys(mapping.paths);
      const defaultLang = availableLangs.includes(appState.selectedLanguage)
        ? appState.selectedLanguage
        : (availableLangs[0] || 'javascript');
      setActiveCodeLang(defaultLang);
    }
  }, [lesson, mapping, appState.selectedLanguage]);

  const getLanguageExtension = (lang) => {
    switch(lang) {
      case 'javascript': return 'js';
      case 'python': return 'py';
      case 'java': return 'java';
      case 'cpp': return 'cpp';
      case 'c': return 'c';
      case 'csharp': return 'cs';
      case 'go': return 'go';
      case 'rust': return 'rs';
      case 'ruby': return 'rb';
      case 'php': return 'php';
      case 'swift': return 'swift';
      case 'kotlin': return 'kt';
      default: return 'txt';
    }
  };

  const leetcodeUrl = useMemo(() => {
    if (!lesson || !lesson.details) return null;
    const match = lesson.details.match(/href="([^"]*leetcode\.com[^"]*)"/);
    return (match && !match[1].includes('$undefined')) ? match[1] : null;
  }, [lesson]);

  const handleSolveWithCompiler = () => {
    const ext = getLanguageExtension(appState.selectedLanguage);
    const filename = `${lesson.title.replace(/[^a-zA-Z0-9]/g, '_')}.${ext}`;
    
    // Create or find file in VFS
    const saved = localStorage.getItem('dsaflow_vfs');
    let vfs = saved ? JSON.parse(saved) : [
      { id: 'root', type: 'folder', name: 'root', parentId: null }
    ];
    
    let file = vfs.find(n => n.name === filename && n.type === 'file');
    const initialCode = lesson.code ? (lesson.code[appState.selectedLanguage] || '') : '';
    
    if (!file) {
      const id = Date.now().toString() + Math.floor(Math.random() * 1000);
      file = {
        id,
        type: 'file',
        name: filename,
        parentId: 'root',
        content: initialCode
      };
      vfs.push(file);
      localStorage.setItem('dsaflow_vfs', JSON.stringify(vfs));
    } else if (initialCode && file.content.trim() === '') {
      file.content = initialCode;
      localStorage.setItem('dsaflow_vfs', JSON.stringify(vfs));
    }

    // Mark as completed when they start solving
    markLessonCompleted(lesson.id);

    // Notify the IDE to open this file
    window.dispatchEvent(new CustomEvent('ide_open_file', { detail: { id: file.id } }));
    
    // Navigate to IDE
    navigate('/ide');
  };

  useEffect(() => {
    // Process markdown or HTML in lesson.details
    if (contentRef.current && lesson.details) {
      // Strip any inline LeetCode button div so we render it dynamically in React
      const cleanDetails = lesson.details.replace(/<div style="display:flex; gap:12px; margin-top:16px;">[\s\S]*?<\/div>/g, '');
      contentRef.current.innerHTML = cleanDetails;
    } else if (contentRef.current) {
      contentRef.current.innerHTML = `<p>${lesson.summary || ''}</p>`;
    }
  }, [lesson]);

  return (
    <div className="card" style={{ padding: '30px', maxWidth: '800px', margin: '0 auto', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
        <div style={{ fontSize: '2.5rem' }}>{lesson.icon}</div>
        <div>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--text-main)', margin: '0 0 8px 0' }}>
            {lesson.title}
          </h1>
          <div style={{ display: 'flex', gap: '12px', fontSize: '0.9rem' }}>
            <span style={{ 
              color: lesson.difficulty === 'Easy' ? 'var(--diff-easy)' : 
                     lesson.difficulty === 'Medium' ? 'var(--diff-medium)' : 'var(--diff-hard)',
              background: 'rgba(255,255,255,0.05)',
              padding: '2px 8px',
              borderRadius: '4px'
            }}>
              {lesson.difficulty}
            </span>
            <span style={{ color: 'var(--text-muted)' }}>{lesson.category}</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 0', borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)', marginBottom: '24px' }}>
        <div 
          ref={contentRef}
          className="lesson-markdown-content" 
          style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }} 
        />
      </div>

      {/* Dynamic GitHub Code Snippet Section */}
      {mapping && (
        <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--border-glass)' }}>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>💻</span> GitHub Source Code (TheAlgorithms)
          </h3>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
            {['javascript', 'java', 'cpp', 'python'].map((lang) => {
              const hasPath = !!mapping.paths[lang];
              if (!hasPath) return null;
              
              return (
                <button
                  key={lang}
                  onClick={() => setActiveCodeLang(lang)}
                  className={`btn ${activeCodeLang === lang ? 'btn-accent' : 'btn-secondary'}`}
                  style={{
                    padding: '6px 12px',
                    fontSize: '0.85rem',
                    borderRadius: '6px',
                    textTransform: 'capitalize',
                    fontWeight: activeCodeLang === lang ? 'bold' : 'normal'
                  }}
                >
                  {lang === 'cpp' ? 'C++' : lang === 'javascript' ? 'JavaScript' : lang}
                </button>
              );
            })}
          </div>
          {mapping.paths[activeCodeLang] ? (
            <AlgorithmCodeFetcher language={activeCodeLang} githubPath={mapping.paths[activeCodeLang]} />
          ) : (
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', padding: '12px 0' }}>
              No implementation path mapped for this language.
            </div>
          )}
        </div>
      )}

      {/* Reference & Video Tutorials Section */}
      <div style={{ 
        paddingTop: '20px', 
        borderBottom: '1px solid var(--border-glass)', 
        marginBottom: '24px',
        paddingBottom: '20px'
      }}>
        <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>📚</span> Video & Reference Tutorials
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          <a
            href={`https://www.youtube.com/results?search_query=Bro+Code+${encodeURIComponent(lesson.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              background: 'rgba(255, 0, 0, 0.05)',
              border: '1px solid rgba(255, 0, 0, 0.15)',
              color: '#ff4d4d',
              padding: '10px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '0.9rem',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 0, 0, 0.12)';
              e.currentTarget.style.borderColor = 'rgba(255, 0, 0, 0.4)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 0, 0, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 0, 0, 0.15)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
              <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Bro Code YouTube
          </a>

          <a
            href={`https://www.youtube.com/results?search_query=Striver+${encodeURIComponent(lesson.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              background: 'rgba(255, 69, 0, 0.05)',
              border: '1px solid rgba(255, 69, 0, 0.15)',
              color: '#ff6b35',
              padding: '10px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '0.9rem',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 69, 0, 0.12)';
              e.currentTarget.style.borderColor = 'rgba(255, 69, 0, 0.4)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 69, 0, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 69, 0, 0.15)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
              <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Striver YouTube
          </a>

          <a
            href={`https://www.geeksforgeeks.org/search/?q=${encodeURIComponent(lesson.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              background: 'rgba(47, 133, 90, 0.06)',
              border: '1px solid rgba(47, 133, 90, 0.15)',
              color: '#34a853',
              padding: '10px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '0.9rem',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(47, 133, 90, 0.12)';
              e.currentTarget.style.borderColor = 'rgba(47, 133, 90, 0.4)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(47, 133, 90, 0.06)';
              e.currentTarget.style.borderColor = 'rgba(47, 133, 90, 0.15)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            Search on GFG
          </a>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <button 
          onClick={() => markLessonCompleted(lesson.id)}
          className={`btn ${appState.completedLessons.includes(lesson.id) ? 'btn-secondary' : 'btn-accent'}`}
          style={{
            color: appState.completedLessons.includes(lesson.id) ? 'var(--accent-emerald)' : 'var(--text-main)',
            fontWeight: '600'
          }}
        >
          {appState.completedLessons.includes(lesson.id) ? '✅ Completed' : '🎯 Mark as Complete'}
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          {leetcodeUrl && (
            <a 
              href={leetcodeUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary"
              style={{
                background: 'rgba(255, 234, 0, 0.08)',
                borderColor: 'rgba(255, 234, 0, 0.25)',
                color: 'var(--accent-amber)',
                fontWeight: 'bold',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Solve on LeetCode 🚀
            </a>
          )}
          <button 
            onClick={handleSolveWithCompiler}
            className="btn btn-primary"
            style={{
              background: 'var(--accent-cyan)',
              color: '#000',
              fontWeight: 'bold',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            Solve with Compiler 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
