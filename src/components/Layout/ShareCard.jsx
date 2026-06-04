import React, { useEffect } from 'react';

/**
 * ShareCard — A beautiful modal shown on streak milestones / phase completions.
 * Props:
 *   type: 'streak' | 'phase'
 *   value: streak count OR phase name
 *   userName: string
 *   onClose: fn
 */
export default function ShareCard({ type, value, userName, onClose }) {
  // Prevent scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const isStreak = type === 'streak';
  const emoji = value >= 30 ? '🏆' : value >= 7 ? '⚡' : '🔥';
  const title = isStreak
    ? `${emoji} ${value}-Day Streak!`
    : `✅ Phase Complete!`;
  const subtitle = isStreak
    ? `Crushed ${value} consecutive days of DSA practice on dsaflow.app!`
    : `Just completed the "${value}" phase on dsaflow.app!`;

  const shareText = encodeURIComponent(
    `${title} ${subtitle} Join me on dsaflow.app — India's best DSA platform for placements! 🚀 https://dsaflow.app`
  );

  const twitterUrl = `https://twitter.com/intent/tweet?text=${shareText}`;
  const whatsappUrl = `https://wa.me/?text=${shareText}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://dsaflow.app')}&summary=${shareText}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://dsaflow.app`);
    const btn = document.getElementById('share-copy-btn');
    if (btn) { btn.textContent = '✅ Copied!'; setTimeout(() => { btn.textContent = '🔗 Copy Link'; }, 2000); }
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 99999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(6px)', animation: 'fadeIn 0.3s ease'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #0d1117 0%, #161b27 100%)',
          border: '1px solid rgba(124,77,255,0.35)',
          borderRadius: '24px',
          padding: '36px 32px',
          maxWidth: '440px',
          width: '90%',
          textAlign: 'center',
          position: 'relative',
          boxShadow: '0 0 60px rgba(124,77,255,0.25), 0 20px 60px rgba(0,0,0,0.5)',
          animation: 'slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            color: '#94a3b8', borderRadius: '8px', padding: '6px 10px',
            cursor: 'pointer', fontSize: '0.8rem',
          }}
        >✕</button>

        {/* Glow orb */}
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 20px',
          background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '2.2rem',
          boxShadow: '0 0 30px rgba(124,77,255,0.5)',
          animation: 'pulse 2s ease-in-out infinite',
        }}>
          {emoji}
        </div>

        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f1f5f9', marginBottom: '8px' }}>
          {title}
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.92rem', marginBottom: '6px', lineHeight: 1.6 }}>
          {userName ? <strong style={{ color: '#c4b5fd' }}>{userName}</strong> : 'You'} just {subtitle}
        </p>
        <p style={{ color: '#475569', fontSize: '0.8rem', marginBottom: '28px' }}>
          Share this milestone with your friends & inspire them! 🎯
        </p>

        {/* Share Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
          <a
            href={whatsappUrl} target="_blank" rel="noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              background: 'linear-gradient(135deg, #25D366, #128C7E)',
              color: '#fff', fontWeight: 700, fontSize: '0.95rem',
              padding: '13px 20px', borderRadius: '12px', textDecoration: 'none',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 4px 20px rgba(37,211,102,0.25)',
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={e => e.currentTarget.style.transform = ''}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            Share on WhatsApp
          </a>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <a
              href={twitterUrl} target="_blank" rel="noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                background: 'rgba(29,161,242,0.12)', border: '1px solid rgba(29,161,242,0.3)',
                color: '#1DA1F2', fontWeight: 600, fontSize: '0.85rem',
                padding: '11px 14px', borderRadius: '10px', textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.background = 'rgba(29,161,242,0.2)'}
              onMouseOut={e => e.currentTarget.style.background = 'rgba(29,161,242,0.12)'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#1DA1F2"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              Twitter/X
            </a>
            <button
              id="share-copy-btn"
              onClick={handleCopyLink}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                background: 'rgba(124,77,255,0.12)', border: '1px solid rgba(124,77,255,0.3)',
                color: '#a78bfa', fontWeight: 600, fontSize: '0.85rem',
                padding: '11px 14px', borderRadius: '10px', cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.background = 'rgba(124,77,255,0.2)'}
              onMouseOut={e => e.currentTarget.style.background = 'rgba(124,77,255,0.12)'}
            >
              🔗 Copy Link
            </button>
          </div>
        </div>

        <p style={{ color: '#334155', fontSize: '0.75rem' }}>
          Sharing = more friends joining = India's devs getting placed 🇮🇳
        </p>
      </div>
    </div>
  );
}
