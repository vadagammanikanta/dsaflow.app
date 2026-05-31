import React from 'react';

const PlacementIntelligence = ({ relevanceData }) => {
  if (!relevanceData) return null;

  return (
    <div 
      className="placement-intelligence-card"
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-glass)',
        borderRadius: '12px',
        padding: '24px',
        marginTop: '24px',
        boxShadow: 'var(--shadow-neon)',
        transition: 'var(--transition)'
      }}
    >
      <h3 
        style={{
          margin: '0 0 16px 0',
          fontSize: '1.1rem',
          fontWeight: '700',
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <span style={{ fontSize: '1.3rem' }}>💼</span> Placement & Interview Intelligence
      </h3>
      
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px'
        }}
      >
        {/* Core Patterns */}
        <div 
          style={{
            background: 'rgba(255,255,255,0.01)',
            border: '1px solid var(--border-glass)',
            padding: '16px',
            borderRadius: '8px'
          }}
        >
          <h4 
            style={{
              margin: '0 0 12px 0',
              fontSize: '0.75rem',
              fontWeight: '700',
              color: 'var(--text-secondary)',
              opacity: 0.8,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            Key Patterns to Master
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {relevanceData.patterns && relevanceData.patterns.map((pattern, i) => (
              <span 
                key={i} 
                style={{
                  padding: '4px 10px',
                  background: 'rgba(124, 77, 255, 0.08)',
                  color: 'var(--accent-purple)',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  borderRadius: '20px',
                  border: '1px solid rgba(124, 77, 255, 0.2)'
                }}
              >
                {pattern}
              </span>
            ))}
          </div>
        </div>

        {/* Target Companies */}
        <div 
          style={{
            background: 'rgba(255,255,255,0.01)',
            border: '1px solid var(--border-glass)',
            padding: '16px',
            borderRadius: '8px'
          }}
        >
          <h4 
            style={{
              margin: '0 0 12px 0',
              fontSize: '0.75rem',
              fontWeight: '700',
              color: 'var(--text-secondary)',
              opacity: 0.8,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            Frequently Asked By
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {relevanceData.targetCompanies && relevanceData.targetCompanies.map((company, i) => (
              <span 
                key={i} 
                style={{
                  padding: '4px 10px',
                  background: 'rgba(0, 230, 118, 0.08)',
                  color: 'var(--accent-emerald)',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  borderRadius: '20px',
                  border: '1px solid rgba(0, 230, 118, 0.2)'
                }}
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Real World Application */}
      <div 
        style={{
          marginTop: '16px',
          background: 'rgba(255, 234, 0, 0.02)',
          borderLeft: '4px solid var(--accent-amber)',
          borderTop: '1px solid var(--border-glass)',
          borderRight: '1px solid var(--border-glass)',
          borderBottom: '1px solid var(--border-glass)',
          padding: '16px',
          borderRadius: '4px 8px 8px 4px'
        }}
      >
        <h4 
          style={{
            margin: '0 0 8px 0',
            fontSize: '0.75rem',
            fontWeight: '700',
            color: 'var(--text-secondary)',
            opacity: 0.8,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          Real World Application
        </h4>
        <p 
          style={{
            margin: 0,
            color: 'var(--text-secondary)',
            fontSize: '0.86rem',
            lineHeight: '1.6'
          }}
        >
          {relevanceData.realWorldApp}
        </p>
      </div>
    </div>
  );
};

export default PlacementIntelligence;
