import React, { useState, useEffect, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Global in-memory cache to prevent multiple fetches during the app lifespan
const fetchCache = new Map();

const LANGUAGE_REPO_MAP = {
  python: { repo: 'Python', defaultBranch: 'master', ext: 'py', displayName: 'Python' },
  java: { repo: 'Java', defaultBranch: 'master', ext: 'java', displayName: 'Java' },
  cpp: { repo: 'C-Plus-Plus', defaultBranch: 'master', ext: 'cpp', displayName: 'C++' },
  cplusplus: { repo: 'C-Plus-Plus', defaultBranch: 'master', ext: 'cpp', displayName: 'C++' },
  javascript: { repo: 'JavaScript', defaultBranch: 'master', ext: 'js', displayName: 'JavaScript' },
  js: { repo: 'JavaScript', defaultBranch: 'master', ext: 'js', displayName: 'JavaScript' },
  c: { repo: 'C', defaultBranch: 'master', ext: 'c', displayName: 'C' },
  go: { repo: 'Go', defaultBranch: 'master', ext: 'go', displayName: 'Go' },
  rust: { repo: 'Rust', defaultBranch: 'master', ext: 'rs', displayName: 'Rust' }
};

export default function AlgorithmCodeFetcher({ language, githubPath }) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Keeps track of the latest fetch request to handle race conditions
  const latestRequestRef = useRef(null);

  useEffect(() => {
    if (!githubPath) {
      setCode('');
      setError('No source code path provided.');
      return;
    }

    const langKey = language?.toLowerCase().trim();
    const config = LANGUAGE_REPO_MAP[langKey];

    if (!config) {
      setCode('');
      setError(`Language "${language}" is not supported for dynamic fetching.`);
      return;
    }

    const { repo, defaultBranch } = config;
    
    // Construct Raw Github URL
    const url = `https://raw.githubusercontent.com/TheAlgorithms/${repo}/${defaultBranch}/${githubPath}`;
    
    // Check inside cache first (both in-memory map and sessionStorage)
    const cachedCode = fetchCache.get(url) || sessionStorage.getItem(url);
    if (cachedCode) {
      setCode(cachedCode);
      setError('');
      setLoading(false);
      // Synchronize in both caches
      if (!fetchCache.has(url)) {
        fetchCache.set(url, cachedCode);
      }
      return;
    }

    // Perform Fetching
    const fetchCode = async () => {
      setLoading(true);
      setError('');
      setCode('');

      const currentRequestSymbol = Symbol('FetchRequest');
      latestRequestRef.current = currentRequestSymbol;

      try {
        let response = await fetch(url);
        
        // If 404, fallback to "main" branch instead of "master"
        if (response.status === 404 && defaultBranch === 'master') {
          const fallbackUrl = `https://raw.githubusercontent.com/TheAlgorithms/${repo}/main/${githubPath}`;
          response = await fetch(fallbackUrl);
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch code (HTTP ${response.status})`);
        }

        const rawCode = await response.text();

        // Check if this request is still the latest one (prevent race conditions)
        if (latestRequestRef.current !== currentRequestSymbol) {
          return;
        }

        // Cache the response in both in-memory map and sessionStorage
        fetchCache.set(url, rawCode);
        try {
          sessionStorage.setItem(url, rawCode);
        } catch (e) {
          console.warn('Failed to save in sessionStorage:', e);
        }

        setCode(rawCode);
      } catch (err) {
        if (latestRequestRef.current === currentRequestSymbol) {
          console.error(err);
          setError('Code snippet currently unavailable for this language.');
        }
      } finally {
        if (latestRequestRef.current === currentRequestSymbol) {
          setLoading(false);
        }
      }
    };

    fetchCode();
  }, [language, githubPath]);

  if (loading) {
    return (
      <div 
        style={{
          background: '#1e1e1e',
          borderRadius: '8px',
          padding: '24px',
          fontFamily: 'monospace',
          border: '1px solid var(--border-glass, rgba(255, 255, 255, 0.08))',
          minHeight: '220px'
        }}
      >
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
        </div>
        <div className="skeleton-line" style={{ width: '40%', height: '16px' }} />
        <div className="skeleton-line" style={{ width: '75%', height: '16px' }} />
        <div className="skeleton-line" style={{ width: '60%', height: '16px' }} />
        <div className="skeleton-line" style={{ width: '90%', height: '16px' }} />
        <div className="skeleton-line" style={{ width: '50%', height: '16px' }} />
        <div className="skeleton-line" style={{ width: '70%', height: '16px' }} />
      </div>
    );
  }

  if (error) {
    return (
      <div 
        style={{
          background: 'rgba(239, 68, 68, 0.05)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          borderRadius: '8px',
          padding: '24px',
          color: '#ef4444',
          textAlign: 'center',
          fontFamily: 'var(--font-main, sans-serif)',
          fontSize: '0.95rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}
      >
        <span style={{ fontSize: '1.8rem' }}>⚠️</span>
        <div>{error}</div>
      </div>
    );
  }

  return (
    <div 
      style={{
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid var(--border-glass, rgba(255, 255, 255, 0.08))',
        background: '#1e1e1e'
      }}
    >
      <div 
        style={{
          background: '#252526',
          padding: '8px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}
      >
        <span style={{ color: '#858585', fontSize: '0.85rem', fontFamily: 'monospace' }}>
          {githubPath.split('/').pop()}
        </span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(code);
            alert('Code copied to clipboard! 📋');
          }}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '4px',
            color: '#ccc',
            padding: '4px 8px',
            fontSize: '0.75rem',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
        >
          Copy Code
        </button>
      </div>
      <SyntaxHighlighter 
        language={language?.toLowerCase() === 'cpp' ? 'cpp' : language?.toLowerCase() === 'java' ? 'java' : language?.toLowerCase() === 'javascript' ? 'javascript' : 'python'} 
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '16px',
          fontSize: '0.9rem',
          lineHeight: '1.5',
          background: 'transparent'
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
