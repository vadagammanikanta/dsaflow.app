import React, { useState } from 'react';

const VideoEmbed = ({ youtubeId, title, creator }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!youtubeId) {
    return (
      <div 
        className="video-embed-card" 
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-glass)',
          borderRadius: '12px',
          padding: '24px',
          marginTop: '24px',
          boxShadow: 'var(--shadow-neon)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          minHeight: '200px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(124, 77, 255, 0.03) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div style={{ fontSize: '2.5rem', marginBottom: '10px', zIndex: 1 }}>🎬</div>
        <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: '700', zIndex: 1 }}>
          Curated Video Walkthrough Coming Soon
        </h4>
        <p style={{ margin: '0 0 16px 0', fontSize: '0.84rem', color: 'var(--text-secondary)', maxWidth: '420px', lineHeight: '1.5', zIndex: 1 }}>
          Our custom step-by-step lecture for <strong>{title.replace(' by undefined', '')}</strong> is currently being compiled. You can find excellent alternative tutorials on YouTube:
        </p>
        
        <a
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(title.replace(' by undefined', '') + ' tutorial')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 77, 77, 0.08)',
            border: '1px solid rgba(255, 77, 77, 0.25)',
            color: '#ff4d4d',
            padding: '8px 18px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '0.85rem',
            transition: 'var(--transition)',
            zIndex: 1
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 77, 77, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(255, 77, 77, 0.4)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 77, 77, 0.08)';
            e.currentTarget.style.borderColor = 'rgba(255, 77, 77, 0.25)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          Search YouTube
        </a>
      </div>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${youtubeId}?rel=0`;


  return (
    <div 
      className="video-embed-card" 
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-glass)',
        borderRadius: '12px',
        padding: '20px',
        marginTop: '24px',
        boxShadow: 'var(--shadow-neon)',
        transition: 'var(--transition)'
      }}
    >
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
          flexWrap: 'wrap',
          gap: '10px'
        }}
      >
        <div>
          <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: '700' }}>
            {title}
          </h4>
          {creator && (
            <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: '600' }}>
              🎥 Created by {creator}
            </p>
          )}
        </div>
        <div 
          style={{
            background: 'rgba(255, 0, 0, 0.1)',
            border: '1px solid rgba(255, 0, 0, 0.25)',
            color: '#ff4d4d',
            padding: '4px 10px',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#ff4d4d' }}></span>
          YouTube Deep Dive
        </div>
      </div>

      <div 
        style={{
          position: 'relative',
          paddingBottom: '56.25%', // 16:9 Aspect Ratio
          height: 0,
          overflow: 'hidden',
          borderRadius: '8px',
          background: 'rgba(0,0,0,0.2)',
          border: '1px solid var(--border-glass)'
        }}
      >
        {!isLoaded && (
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'rgba(7, 8, 16, 0.65)',
              zIndex: 2,
              backdropFilter: 'blur(4px)'
            }}
          >
            <div className="spinner" style={{
              width: '40px',
              height: '40px',
              border: '3px solid rgba(0, 229, 255, 0.1)',
              borderTop: '3px solid var(--accent-cyan)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginBottom: '12px'
            }}></div>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '500' }}>
              Loading video tutorial...
            </span>
          </div>
        )}

        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoaded(true)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 0,
            borderRadius: '8px'
          }}
        ></iframe>
      </div>
    </div>
  );
};

export default VideoEmbed;
