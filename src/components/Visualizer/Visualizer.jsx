import React, { useState, useEffect } from 'react';
import MemoryVisualizer3D from './MemoryVisualizer3D';

export default function Visualizer() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (isFullscreen) {
      document.body.classList.add('visualizer-fullscreen-active');
    } else {
      document.body.classList.remove('visualizer-fullscreen-active');
    }
    return () => {
      document.body.classList.remove('visualizer-fullscreen-active');
    };
  }, [isFullscreen]);

  return (
    <div 
      className={`tab-pane active ${isFullscreen ? 'visualizer-fullscreen' : ''}`} 
      id="visualizer" 
      style={{ height: '100%', overflow: 'hidden' }}
    >
      <style>{`
        .visualizer-fullscreen {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          z-index: 9999999 !important;
          background: #070810 !important;
          padding: 24px !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 16px !important;
          box-sizing: border-box !important;
          animation: none !important;
          transform: none !important;
        }

        body.visualizer-fullscreen-active .app-container {
          display: block !important;
          height: 100vh !important;
          width: 100vw !important;
          overflow: hidden !important;
        }

        body.visualizer-fullscreen-active .main-content {
          position: static !important;
          padding: 0 !important;
          margin: 0 !important;
          overflow: hidden !important;
          height: 100vh !important;
        }

        body.visualizer-fullscreen-active header,
        body.visualizer-fullscreen-active aside,
        body.visualizer-fullscreen-active .quotes-ticker {
          display: none !important;
        }
      `}</style>
      
      <div className="section-header" style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem' }}>3D Memory & Pointer Visualizer</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '4px' }}>Analyze data structures, execution flow and pointer transitions in 3D Stack & Heap spaces.</p>
        </div>
        <div>
          <button 
            className="btn btn-secondary" 
            onClick={() => setIsFullscreen(!isFullscreen)} 
            style={{ 
              padding: '6px 16px', 
              fontSize: '0.8rem', 
              borderRadius: '50px',
              border: '1px solid var(--border-glass)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: isFullscreen ? 'var(--accent-purple)' : 'var(--bg-input)',
              color: isFullscreen ? '#fff' : 'var(--text-primary)'
            }}
          >
            {isFullscreen ? '🗗 Exit Full' : '🗖 Fullscreen'}
          </button>
        </div>
      </div>

      <MemoryVisualizer3D isFullscreen={isFullscreen} />
    </div>
  );
}
