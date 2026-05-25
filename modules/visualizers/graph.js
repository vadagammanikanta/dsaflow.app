// Graph Visualizer Module for DSA Learning Hub
// Implements Dijkstra's Shortest Path with a State Machine Architecture

export const graphComplexity = {
  "graph-dijkstra": { worstTime: "O((V+E) log V)", bestTime: "O((V+E) log V)", space: "O(V)", desc: "Dijkstra's Algorithm finds the shortest paths from a source node to all other nodes in a weighted graph." }
};

const graphPseudocode = {
  "graph-dijkstra": [
    "function Dijkstra(Graph, source):",
    "  for each vertex v in Graph:",
    "    dist[v] = infinity",
    "    visited[v] = false",
    "  dist[source] = 0",
    "",
    "  while there are unvisited nodes:",
    "    u = unvisited node with minimum dist",
    "    visited[u] = true",
    "",
    "    for each neighbor v of u:",
    "      alt = dist[u] + length(u, v)",
    "      if alt < dist[v]:",
    "        dist[v] = alt"
  ]
};

// Fixed graph definition (coordinates are percentages)
const nodes = [
  { id: 'A', x: 15, y: 50 },
  { id: 'B', x: 40, y: 20 },
  { id: 'C', x: 40, y: 80 },
  { id: 'D', x: 65, y: 35 },
  { id: 'E', x: 65, y: 90 },
  { id: 'F', x: 85, y: 55 }
];

const edges = [
  { u: 'A', v: 'B', weight: 4 },
  { u: 'A', v: 'C', weight: 2 },
  { u: 'B', v: 'C', weight: 1 },
  { u: 'B', v: 'D', weight: 5 },
  { u: 'C', v: 'D', weight: 8 },
  { u: 'C', v: 'E', weight: 10 },
  { u: 'D', v: 'E', weight: 2 },
  { u: 'D', v: 'F', weight: 6 },
  { u: 'E', v: 'F', weight: 3 }
];

let viewport = null;
let svgContainer = null;
let nodesContainer = null;
let states = [];
let currentStateIndex = 0;
let isPlaying = false;
let playIntervalId = null;
let delay = 600;

export function initGraph(vpContainer) {
  viewport = vpContainer;
  svgContainer = document.getElementById('graph-svg');
  nodesContainer = document.getElementById('graph-nodes');
  
  isPlaying = false;
  clearInterval(playIntervalId);
  currentStateIndex = 0;
  states = [];
  
  loadGraphPseudocode('graph-dijkstra');
  
  // Precompute the entire algorithm state machine
  computeDijkstraStates('A');
  
  // Render the initial state (Step 0)
  renderState(states[0]);
}

function loadGraphPseudocode(algo) {
  const container = document.getElementById('pseudocode-container');
  if (!container) return;
  const lines = graphPseudocode[algo];
  container.innerHTML = lines.map((line, i) => `<div class="code-line" id="code-line-${i}">${line.replace(/ /g, '&nbsp;')}</div>`).join('');
}

function highlightCodeLine(lineIdx) {
  document.querySelectorAll('.code-line').forEach(el => el.classList.remove('active'));
  if (lineIdx >= 0) {
    const el = document.getElementById(`code-line-${lineIdx}`);
    if (el) el.classList.add('active');
  }
}

// ── STATE MACHINE GENERATOR ─────────────────────────────────────────

function computeDijkstraStates(sourceId) {
  let dist = {};
  let visited = {};
  
  // Initialize distances
  nodes.forEach(n => {
    dist[n.id] = Infinity;
    visited[n.id] = false;
  });
  dist[sourceId] = 0;

  // Clone current state for pushing to array
  const pushState = (activeNode, activeEdge, pathEdges, lineIdx) => {
    states.push({
      dist: { ...dist },
      visited: { ...visited },
      activeNode,
      activeEdge,
      pathEdges: [...pathEdges], // Edges that form the shortest path tree
      lineIdx
    });
  };

  pushState(null, null, [], 4); // Initialize

  let pathEdges = [];

  while (true) {
    // Find unvisited node with minimum distance
    pushState(null, null, pathEdges, 6);
    
    let u = null;
    let minDist = Infinity;
    for (let node of nodes) {
      if (!visited[node.id] && dist[node.id] < minDist) {
        minDist = dist[node.id];
        u = node.id;
      }
    }

    if (u === null) break; // All reachable nodes visited

    pushState(u, null, pathEdges, 7); // Selected u
    
    visited[u] = true;
    pushState(u, null, pathEdges, 8); // Marked visited

    // Find neighbors
    let neighbors = edges.filter(e => e.u === u || e.v === u);
    pushState(u, null, pathEdges, 10);
    
    for (let edge of neighbors) {
      let v = edge.u === u ? edge.v : edge.u;
      
      if (!visited[v]) {
        pushState(u, edge, pathEdges, 11); // evaluating edge
        
        let alt = dist[u] + edge.weight;
        if (alt < dist[v]) {
          dist[v] = alt;
          // Update path edges (remove old edge to v, add new edge)
          pathEdges = pathEdges.filter(pe => !(pe.u === v || pe.v === v));
          pathEdges.push(edge);
          
          pushState(u, edge, pathEdges, 13); // relaxed
        }
      }
    }
  }
  
  pushState(null, null, pathEdges, -1); // Finished
}

// ── RENDERER ────────────────────────────────────────────────────────

function renderState(state) {
  svgContainer.innerHTML = '';
  nodesContainer.innerHTML = '';
  
  highlightCodeLine(state.lineIdx);

  // Draw Edges
  edges.forEach(edge => {
    const nodeU = nodes.find(n => n.id === edge.u);
    const nodeV = nodes.find(n => n.id === edge.v);
    
    const isActive = state.activeEdge && state.activeEdge.u === edge.u && state.activeEdge.v === edge.v;
    const isPath = state.pathEdges.some(pe => pe.u === edge.u && pe.v === edge.v);
    
    let edgeClass = 'graph-edge';
    if (isActive) edgeClass += ' edge-active';
    else if (isPath) edgeClass += ' edge-path';
    
    // Line
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", `${nodeU.x}%`);
    line.setAttribute("y1", `${nodeU.y}%`);
    line.setAttribute("x2", `${nodeV.x}%`);
    line.setAttribute("y2", `${nodeV.y}%`);
    line.setAttribute("class", edgeClass);
    svgContainer.appendChild(line);
    
    // Weight Label
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", `${(nodeU.x + nodeV.x) / 2}%`);
    text.setAttribute("y", `${(nodeU.y + nodeV.y) / 2 - 2}%`);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("class", "graph-edge-label");
    text.textContent = edge.weight;
    svgContainer.appendChild(text);
  });

  // Draw Nodes
  nodes.forEach(node => {
    const isVisited = state.visited[node.id];
    const isEvaluating = state.activeNode === node.id;
    
    let nodeClass = 'graph-node';
    if (isEvaluating) nodeClass += ' node-evaluating';
    else if (isVisited) nodeClass += ' node-visited';
    else nodeClass += ' node-unvisited';
    
    const nodeDiv = document.createElement('div');
    nodeDiv.className = nodeClass;
    nodeDiv.style.left = `${node.x}%`;
    nodeDiv.style.top = `${node.y}%`;
    nodeDiv.innerHTML = node.id;
    
    const distDiv = document.createElement('div');
    distDiv.className = 'graph-node-dist';
    distDiv.innerHTML = state.dist[node.id] === Infinity ? '∞' : state.dist[node.id];
    
    nodeDiv.appendChild(distDiv);
    nodesContainer.appendChild(nodeDiv);
  });
}

// ── PLAYBACK CONTROLS ───────────────────────────────────────────────

export function stepGraphForward() {
  if (currentStateIndex < states.length - 1) {
    currentStateIndex++;
    renderState(states[currentStateIndex]);
    return false; // Not finished
  }
  return true; // Finished
}

export function playGraph() {
  if (isPlaying) return;
  if (currentStateIndex >= states.length - 1) currentStateIndex = 0; // Restart if at end
  
  isPlaying = true;
  document.getElementById('btn-play-pause').innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
  `;
  
  playIntervalId = setInterval(() => {
    const isDone = stepGraphForward();
    if (isDone) pauseGraph();
  }, delay);
}

export function pauseGraph() {
  isPlaying = false;
  clearInterval(playIntervalId);
  document.getElementById('btn-play-pause').innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
  `;
}

export function isGraphPlaying() {
  return isPlaying;
}

export function setGraphDelay(newDelay) {
  delay = newDelay;
  if (isPlaying) {
    pauseGraph();
    playGraph();
  }
}
