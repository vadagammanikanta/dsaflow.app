import React, { useState } from 'react';

const VideoEmbed = ({ youtubeId, title, creator }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!youtubeId) return null;

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
