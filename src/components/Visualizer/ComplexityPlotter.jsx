import React from 'react';

export default function ComplexityPlotter({ activeComplexity = 'O(N)', n = 50 }) {
  // SVG ViewBox Dimensions
  const width = 500;
  const height = 280;

  // Margins
  const marginLeft = 50;
  const marginRight = 30;
  const marginTop = 25;
  const marginBottom = 45;

  const plottingWidth = width - marginLeft - marginRight;
  const plottingHeight = height - marginTop - marginBottom;

  // Max value to scale operations on Y-axis
  const maxY = 600;

  // Helper coordinates mapping functions
  const getX = (val) => marginLeft + (val / 100) * plottingWidth;
  const getY = (ops) => height - marginBottom - (Math.min(ops, maxY) / maxY) * plottingHeight;

  // Heuristic scaling formulas for curves mapping N [1..100] to operations [0..600]
  const calculateOps = (complexityKey, inputSize) => {
    const key = complexityKey.replace(/\s+/g, '').toLowerCase();

    if (key.includes('o(1)')) {
      return 15; // flat constant line
    }
    if (key.includes('log') && !key.includes('nlog')) {
      return 10 + 25 * Math.log2(inputSize);
    }
    if (key.includes('nlogn')) {
      return 0.85 * inputSize * Math.log2(Math.max(inputSize, 2));
    }
    if (key.includes('o(n)') && !key.includes('nlogn')) {
      return 4.2 * inputSize;
    }
    if (key.includes('n^2') || key.includes('n2')) {
      return 0.08 * inputSize * inputSize;
    }
    if (key.includes('2^n') || key.includes('2n') || key.includes('exp')) {
      return 0.2 * Math.pow(2, Math.min(inputSize, 12));
    }
    if (key.includes('n!') || key.includes('fact')) {
      let fact = 1;
      for (let i = 1; i <= Math.min(inputSize, 7); i++) fact *= i;
      return 0.2 * fact;
    }
    // Default to Linear O(N) fallback
    return 4.2 * inputSize;
  };

  const complexities = [
    { label: 'O(1)', key: 'o(1)', color: 'var(--accent-emerald)', desc: 'Constant Time' },
    { label: 'O(log N)', key: 'o(log n)', color: 'var(--accent-cyan)', desc: 'Logarithmic Time' },
    { label: 'O(N)', key: 'o(n)', color: 'var(--accent-purple)', desc: 'Linear Time' },
    { label: 'O(N log N)', key: 'o(n log n)', color: 'var(--accent-orange)', desc: 'Linearithmic Time' },
    { label: 'O(N^2)', key: 'o(n^2)', color: 'var(--accent-rose)', desc: 'Quadratic Time' },
    { label: 'O(2^N)', key: 'o(2^n)', color: '#ff007f', desc: 'Exponential Time' }
  ];

  // Helper to generate SVG path string
  const getPathData = (complexityKey) => {
    const points = [];
    for (let i = 1; i <= 100; i += 2) {
      const ops = calculateOps(complexityKey, i);
      points.push(`${getX(i)},${getY(ops)}`);
    }
    return `M ${points.join(' L ')}`;
  };

  // Helper to find the active complexity item
  const cleanActive = activeComplexity.replace(/\s+/g, '').toLowerCase();
  const activeItem = complexities.find(item => cleanActive.includes(item.key)) || complexities[2]; // Default to O(N)

  // Calculate current intersection for active curve at current slider N
  const activeOps = calculateOps(activeItem.key, n);
  const activeX = getX(n);
  const activeY = getY(activeOps);

  // Generate grid lines
  const gridLinesX = [20, 40, 60, 80, 100];
  const gridLinesY = [150, 300, 450, 600];

  return (
    <div className="complexity-plot-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      <div 
        className="complexity-chart-card" 
        style={{
          background: 'rgba(0, 0, 0, 0.2)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          border: '1px solid var(--border-glass)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="auto" style={{ display: 'block' }}>
          <defs>
            {/* Soft Glow filter for active complexity line */}
            <filter id="active-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            {/* Linear gradients for color fill effects */}
            <linearGradient id="grid-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--text-muted)" stopOpacity="0.08" />
              <stop offset="100%" stopColor="var(--text-muted)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {gridLinesX.map((tick, index) => (
            <line
              key={`grid-x-${index}`}
              x1={getX(tick)}
              y1={getY(0)}
              x2={getX(tick)}
              y2={getY(maxY)}
              stroke="var(--border-glass)"
              strokeWidth="0.8"
              strokeDasharray="2 3"
            />
          ))}
          {gridLinesY.map((tick, index) => (
            <line
              key={`grid-y-${index}`}
              x1={getX(0)}
              y1={getY(tick)}
              x2={getX(100)}
              y2={getY(tick)}
              stroke="var(--border-glass)"
              strokeWidth="0.8"
              strokeDasharray="2 3"
            />
          ))}

          {/* Y Axis Line */}
          <line
            x1={marginLeft}
            y1={getY(0)}
            x2={marginLeft}
            y2={getY(maxY)}
            stroke="var(--text-muted)"
            strokeWidth="1.2"
          />

          {/* X Axis Line */}
          <line
            x1={getX(0)}
            y1={height - marginBottom}
            x2={getX(100)}
            y2={height - marginBottom}
            stroke="var(--text-muted)"
            strokeWidth="1.2"
          />

          {/* X-axis labels */}
          {gridLinesX.map((tick, index) => (
            <text
              key={`lbl-x-${index}`}
              x={getX(tick)}
              y={height - marginBottom + 16}
              fill="var(--text-secondary)"
              fontSize="9"
              textAnchor="middle"
              fontFamily="var(--font-main)"
            >
              {tick}
            </text>
          ))}

          {/* Y-axis labels */}
          <text
            x={marginLeft - 8}
            y={getY(maxY) + 4}
            fill="var(--text-secondary)"
            fontSize="9"
            textAnchor="end"
            fontFamily="var(--font-main)"
          >
            Max ops
          </text>
          <text
            x={marginLeft - 8}
            y={getY(0)}
            fill="var(--text-secondary)"
            fontSize="9"
            textAnchor="end"
            fontFamily="var(--font-main)"
          >
            0
          </text>

          {/* Axis Titles */}
          <text
            x={marginLeft + plottingWidth / 2}
            y={height - 10}
            fill="var(--text-secondary)"
            fontSize="10.5"
            fontWeight="500"
            textAnchor="middle"
            fontFamily="var(--font-main)"
            letterSpacing="0.04em"
          >
            Input Size (N)
          </text>
          
          <text
            transform={`rotate(-90) translate(${-marginTop - plottingHeight / 2}, 14)`}
            fill="var(--text-secondary)"
            fontSize="10.5"
            fontWeight="500"
            textAnchor="middle"
            fontFamily="var(--font-main)"
            letterSpacing="0.04em"
          >
            Operations / Time
          </text>

          {/* Complexity Curves */}
          {complexities.map((item) => {
            const isSelf = activeItem.key === item.key;
            return (
              <path
                key={item.key}
                d={getPathData(item.key)}
                fill="none"
                stroke={item.color}
                strokeWidth={isSelf ? 3.5 : 1.5}
                strokeDasharray={isSelf ? 'none' : '3 3'}
                opacity={isSelf ? 1 : 0.28}
                filter={isSelf ? 'url(#active-glow)' : 'none'}
                style={{ transition: 'stroke-width 0.2s, opacity 0.2s' }}
              />
            );
          })}

          {/* Vertical Slider N marker indicator line */}
          <line
            x1={activeX}
            y1={getY(0)}
            x2={activeX}
            y2={getY(maxY)}
            stroke="var(--accent-cyan)"
            strokeWidth="1.2"
            strokeDasharray="5 4"
            opacity="0.55"
          />

          {/* Dynamic Intersecting Dot */}
          <circle
            cx={activeX}
            cy={activeY}
            r="7"
            fill={activeItem.color}
            stroke="#ffffff"
            strokeWidth="2"
            style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.7))' }}
          />

          {/* Pulsing Outer Ring */}
          <circle
            cx={activeX}
            cy={activeY}
            r="12"
            fill="none"
            stroke={activeItem.color}
            strokeWidth="1.5"
            opacity="0.6"
          >
            <animate
              attributeName="r"
              values="7;15;7"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.8;0;0.8"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Small floating tooltip box on the graph */}
          <g transform={`translate(${activeX > width - 130 ? activeX - 125 : activeX + 12}, ${activeY > height - 80 ? activeY - 55 : activeY - 15})`}>
            <rect
              width="112"
              height="40"
              rx="6"
              fill="rgba(7, 8, 16, 0.9)"
              stroke="var(--border-glass)"
              strokeWidth="1"
            />
            <text x="8" y="16" fill="#ffffff" fontSize="9.5" fontWeight="700" fontFamily="var(--font-main)">
              {activeItem.label} complexity
            </text>
            <text x="8" y="30" fill="var(--text-secondary)" fontSize="9" fontFamily="var(--font-main)">
              ~{Math.round(activeOps).toLocaleString()} simulated ops
            </text>
          </g>
        </svg>

        {/* Textual Overlay indicator for modern premium branding */}
        <div 
          className="graph-badge" 
          style={{
            position: 'absolute',
            top: '12px',
            right: '16px',
            background: 'rgba(0, 0, 0, 0.45)',
            border: '1px solid var(--border-glass)',
            padding: '4px 10px',
            borderRadius: '20px',
            fontSize: '0.72rem',
            color: activeItem.color,
            fontFamily: 'var(--font-code)',
            fontWeight: 700,
            textShadow: `0 0 8px ${activeItem.color}55`
          }}
        >
          ACTIVE: {activeItem.label} ({activeItem.desc})
        </div>
      </div>

      {/* Numerical list showing simulated steps across all complexities for comparison */}
      <div 
        className="complexity-comparison-grid" 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '8px'
        }}
      >
        {complexities.map((item) => {
          const isSelf = activeItem.key === item.key;
          const cmpOps = calculateOps(item.key, n);
          return (
            <div 
              key={item.key}
              style={{
                background: isSelf ? `${item.color}15` : 'rgba(255, 255, 255, 0.02)',
                border: isSelf ? `1px solid ${item.color}45` : '1px solid var(--border-glass)',
                borderRadius: 'var(--radius-sm)',
                padding: '10px',
                textAlign: 'center',
                transition: 'var(--transition)'
              }}
            >
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                {item.label}
              </div>
              <div 
                style={{ 
                  fontSize: '1rem', 
                  fontWeight: 700, 
                  color: isSelf ? item.color : 'var(--text-primary)',
                  marginTop: '4px',
                  fontFamily: 'var(--font-code)'
                }}
              >
                {Math.round(cmpOps).toLocaleString()}
              </div>
              <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                operations
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
