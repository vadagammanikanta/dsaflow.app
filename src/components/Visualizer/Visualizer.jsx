import React, { useState, useEffect, useRef } from 'react';
import { initSorting, setDelay as setSortingSpeed } from '../../../modules/visualizers/sorting';
import { initDS as initStructures } from '../../../modules/visualizers/structures';
import { initBST, setBSTDelay as setBSTSpeed } from '../../../modules/visualizers/bst';
import { initGraph, setGraphDelay as setGraphSpeed } from '../../../modules/visualizers/graph';

export default function Visualizer() {
  const [source, setSource] = useState('visualgo'); // 'visualgo' by default, or 'native'
  const [visualgoAlgo, setVisualgoAlgo] = useState('sorting');
  
  const initialized = useRef(false);

  useEffect(() => {
    if (source === 'native') {
      // Initialize the default native visualizer
      setTimeout(() => {
        initSorting();

        const select = document.getElementById('visualizer-select');
        const speedSlider = document.getElementById('speed-slider');
        const title = document.getElementById('visualizer-title');
        
        if (select) {
          select.addEventListener('change', (e) => {
            const val = e.target.value;
            const opt = e.target.options[e.target.selectedIndex].text;
            if (title) title.textContent = opt;

            // Reset containers
            document.getElementById('array-container').innerHTML = '';
            document.getElementById('array-container').style.display = 'none';
            document.getElementById('struct-container').innerHTML = '';
            document.getElementById('struct-container').style.display = 'none';
            document.getElementById('tree-nodes').innerHTML = '';
            document.getElementById('tree-svg').innerHTML = '';
            document.getElementById('graph-nodes').innerHTML = '';
            document.getElementById('graph-svg').innerHTML = '';
            document.getElementById('ds-controls-group').style.display = 'none';
            
            const btnGen = document.getElementById('btn-generate');
            if (btnGen) btnGen.style.display = (val.startsWith('ds-') || val.startsWith('graph-')) ? 'none' : 'block';

            if (val.startsWith('sort-')) {
              document.getElementById('array-container').style.display = 'flex';
              initSorting();
            } else if (val === 'ds-stack' || val === 'ds-queue' || val === 'ds-linkedlist') {
              document.getElementById('struct-container').style.display = 'flex';
              document.getElementById('ds-controls-group').style.display = 'flex';
              initStructures();
            } else if (val === 'ds-bst') {
              document.getElementById('ds-controls-group').style.display = 'flex';
              initBST();
            } else if (val.startsWith('graph-')) {
              initGraph();
            }
          });
        }

        if (speedSlider) {
          speedSlider.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            document.getElementById('speed-label').textContent = val + 'ms';
            setSortingSpeed(val);
            setBSTSpeed(val);
            setGraphSpeed(val);
          });
        }
      }, 50);
    }
  }, [source]);

  const handleVisualgoChange = (e) => {
    setVisualgoAlgo(e.target.value);
  };

  const visualgoMapping = {
    'sorting': 'Sorting Algorithms',
    'bitmask': 'Bitmask Operations',
    'list': 'Linked List, Stack, Queue',
    'bst': 'BST and AVL Tree',
    'heap': 'Binary Heap (Priority Queue)',
    'hashtable': 'Hash Table Lookup',
    'graphds': 'Graph Data Structures',
    'dfsbfs': 'Graph Traversal (DFS/BFS)',
    'mst': 'Minimum Spanning Tree',
    'sssp': 'Single-Source Shortest Paths',
    'recursion': 'Recursion Tree / Divide & Conquer',
    'convexhull': 'Computational Geometry',
    'segmenttree': 'Segment / Fenwick Tree',
    'ufds': 'Union-Find Disjoint Sets'
  };

  return (
    <div className="tab-pane active" id="visualizer" style={{ height: '100%', overflowY: 'auto' }}>
      
      {/* Source Toggle Selector */}
      <div className="section-header" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem' }}>Interactive Algorithm Visualizer</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '4px' }}>Analyze structures, execution flow and complex dry-runs.</p>
        </div>
        <div style={{ display: 'flex', background: 'var(--bg-input)', border: '1px solid var(--border-glass)', borderRadius: '50px', padding: '4px', gap: '4px' }}>
          <button 
            className="btn" 
            onClick={() => setSource('visualgo')} 
            style={{ 
              padding: '6px 16px', 
              fontSize: '0.8rem', 
              borderRadius: '50px',
              background: source === 'visualgo' ? 'var(--accent-purple)' : 'transparent',
              color: source === 'visualgo' ? '#fff' : 'var(--text-secondary)'
            }}
          >
            🌐 VisuAlgo (Enriched)
          </button>
          <button 
            className="btn" 
            onClick={() => setSource('native')} 
            style={{ 
              padding: '6px 16px', 
              fontSize: '0.8rem', 
              borderRadius: '50px',
              background: source === 'native' ? 'var(--accent-purple)' : 'transparent',
              color: source === 'native' ? '#fff' : 'var(--text-secondary)'
            }}
          >
            💻 dsa.flow (Native)
          </button>
        </div>
      </div>

      {source === 'visualgo' ? (
        /* VisuAlgo Enriched Visualizer Section */
        <div className="visualizer-workspace" style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: 'auto' }}>
          <div className="card" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>
              Selected Algorithm: <span style={{ color: 'var(--accent-cyan)' }}>{visualgoMapping[visualgoAlgo]}</span>
            </div>
            <select 
              className="algorithm-selector" 
              value={visualgoAlgo} 
              onChange={handleVisualgoChange}
              style={{ minWidth: '220px' }}
            >
              <option value="sorting">Sorting Algorithms</option>
              <option value="bitmask">Bitmask Operations</option>
              <option value="list">Linked List (Stack/Queue/List)</option>
              <option value="bst">Binary Search Tree / AVL</option>
              <option value="heap">Binary Heap (Priority Queue)</option>
              <option value="hashtable">Hash Table Lookup</option>
              <option value="graphds">Graph Data Structures</option>
              <option value="dfsbfs">Graph Traversal (DFS/BFS)</option>
              <option value="mst">Minimum Spanning Tree (MST)</option>
              <option value="sssp">Single-Source Shortest Paths</option>
              <option value="recursion">Recursion / Divide &amp; Conquer</option>
              <option value="convexhull">Convex Hull (Geometry)</option>
              <option value="segmenttree">Segment / Fenwick Tree</option>
              <option value="ufds">Union-Find Disjoint Sets (UFDS)</option>
            </select>
          </div>
          
          <div style={{ border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: '#000' }}>
            <iframe 
              src={`https://visualgo.net/en/${visualgoAlgo}`} 
              style={{ 
                width: '100%', 
                height: 'calc(100vh - var(--header-height) - 180px)', 
                border: 'none'
              }}
              title="VisuAlgo Enriched"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        </div>
      ) : (
        /* Native Visualizer Section */
        <div className="visualizer-workspace">
          <div className="canvas-container">
            <div className="canvas-header">
              <h2 id="visualizer-title">Bubble Sort</h2>
              <select className="algorithm-selector" id="visualizer-select">
                <optgroup label="Sorting">
                  <option value="sort-bubble" defaultValue>Bubble Sort</option>
                  <option value="sort-selection">Selection Sort</option>
                  <option value="sort-insertion">Insertion Sort</option>
                  <option value="sort-merge">Merge Sort</option>
                  <option value="sort-quick">Quick Sort</option>
                </optgroup>
                <optgroup label="Data Structures">
                  <option value="ds-stack">Stack (LIFO)</option>
                  <option value="ds-queue">Queue (FIFO)</option>
                  <option value="ds-linkedlist">Singly Linked List</option>
                  <option value="ds-bst">Binary Search Tree</option>
                </optgroup>
                <optgroup label="Graph Algorithms">
                  <option value="graph-dijkstra">Dijkstra's Shortest Path</option>
                </optgroup>
              </select>
            </div>
            <div className="visualization-viewport" id="viewport">
              <div className="array-container" id="array-container"></div>
              <div className="struct-container" id="struct-container" style={{ display: 'none' }}></div>
              <svg className="tree-svg-container" id="tree-svg"></svg>
              <div className="tree-nodes-container" id="tree-nodes"></div>
              <svg className="graph-svg-container" id="graph-svg"></svg>
              <div className="graph-nodes-container" id="graph-nodes"></div>
            </div>
            <div className="card controls-card">
              <div className="input-group" id="ds-controls-group" style={{ display: 'none', marginBottom: 0 }}>
                <input type="number" className="text-input" id="ds-input-val" placeholder="Value 0-99" min="0" max="99" style={{ width: '110px' }} />
                <button className="btn btn-primary" id="ds-btn-insert">Insert/Push</button>
                <button className="btn btn-secondary" id="ds-btn-remove">Remove/Pop</button>
                <button className="btn btn-secondary" id="ds-btn-search" style={{ display: 'none' }}>Search</button>
              </div>
              <button className="btn btn-secondary" id="btn-generate">New Array</button>
              <button className="btn btn-primary btn-icon" id="btn-play-pause" title="Play">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </button>
              <button className="btn btn-secondary btn-icon" id="btn-step" title="Step">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>
              </button>
              <div className="speed-control">
                <span>Speed:</span>
                <input type="range" id="speed-slider" min="50" max="1200" defaultValue="500" />
                <span id="speed-label">500ms</span>
              </div>
            </div>
          </div>
          <div className="visualizer-sidebar">
            <div className="card" style={{ padding: '20px' }}>
              <h3 style={{ marginBottom: '12px' }}>Complexity</h3>
              <div className="badge-group" style={{ marginBottom: '16px' }}>
                <span className="info-badge">Worst: <strong id="stat-worst-time">O(N²)</strong></span>
                <span className="info-badge">Best: <strong id="stat-best-time">O(N)</strong></span>
                <span className="info-badge">Space: <strong id="stat-space">O(1)</strong></span>
              </div>
              <p id="algorithm-description" style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}></p>
            </div>
            <div className="card" style={{ flexGrow: 1, padding: '20px', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginBottom: '12px' }}>Pseudocode Trace</h3>
              <div style={{ flexGrow: 1, overflowY: 'auto', background: 'var(--code-bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)', padding: '12px' }} id="pseudocode-container"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
