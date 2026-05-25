// Data Structures Visualizer Module for DSA Learning Hub

let viewport = null;
let currentDS = 'ds-stack';

// Structures state
let stackData = [45, 12, 89];
let queueData = [23, 76, 54, 88];
let listData = [17, 39, 62, 95];

class BSTNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
let bstRoot = null;

// Initialize some default BST nodes
function initDefaultBST() {
  bstRoot = new BSTNode(50);
  bstRoot.left = new BSTNode(30);
  bstRoot.right = new BSTNode(70);
  bstRoot.left.left = new BSTNode(20);
  bstRoot.left.right = new BSTNode(40);
  bstRoot.right.left = new BSTNode(60);
  bstRoot.right.right = new BSTNode(80);
}
initDefaultBST();

// Complexity mapping
export const dsComplexity = {
  "ds-stack": { worstTime: "Push/Pop: O(1)", bestTime: "Search: O(N)", space: "O(N)", desc: "A Stack is a LIFO (Last In First Out) structure. Elements are added and removed from the top only." },
  "ds-queue": { worstTime: "Enqueue/Dequeue: O(1)", bestTime: "Search: O(N)", space: "O(N)", desc: "A Queue is a FIFO (First In First Out) structure. Elements are enqueued at the back and dequeued from the front." },
  "ds-linkedlist": { worstTime: "Insert (Head): O(1)", bestTime: "Lookup: O(N)", space: "O(N)", desc: "A Singly Linked List is a linear collection of nodes where each node links to the next. Offers O(1) head insertion." },
  "ds-bst": { worstTime: "Search/Insert: O(log N)", bestTime: "Worst (unbalanced): O(N)", space: "O(N)", desc: "A Binary Search Tree orders children such that left < parent < right. Provides fast binary searches." }
};

// Pseudocode for data structures
const dsPseudocode = {
  "ds-stack": [
    "stack.push(val):",
    "  array.append(val)",
    "  top = val",
    "",
    "stack.pop():",
    "  if array.isEmpty: return null",
    "  return array.removeLast()"
  ],
  "ds-queue": [
    "queue.enqueue(val):",
    "  array.append(val)",
    "  rear = val",
    "",
    "queue.dequeue():",
    "  if array.isEmpty: return null",
    "  return array.removeFirst()"
  ],
  "ds-linkedlist": [
    "list.insertAtHead(val):",
    "  newNode = Node(val)",
    "  newNode.next = head",
    "  head = newNode",
    "",
    "list.deleteHead():",
    "  if head is null: return null",
    "  head = head.next"
  ],
  "ds-bst": [
    "bst.insert(node, val):",
    "  if node is null: return Node(val)",
    "  if val < node.val:",
    "    node.left = insert(node.left, val)",
    "  else:",
    "    node.right = insert(node.right, val)",
    "  return node"
  ]
};

export function initDS(viewportContainer, type) {
  viewport = viewportContainer;
  currentDS = type;
  
  // Show inputs
  document.getElementById('ds-controls-group').style.display = 'flex';
  document.getElementById('btn-generate').style.display = 'none';
  document.getElementById('btn-play-pause').style.display = 'none';
  document.getElementById('btn-step').style.display = 'none';
  
  // Show search button only for BST and Linked List
  const searchBtn = document.getElementById('ds-btn-search');
  if (type === 'ds-bst' || type === 'ds-linkedlist') {
    searchBtn.style.display = 'inline-flex';
  } else {
    searchBtn.style.display = 'none';
  }

  // Load pseudocode
  loadDSPseudocode(type);
  
  renderDS();
}

function loadDSPseudocode(type) {
  const container = document.getElementById('pseudocode-container');
  container.innerHTML = '';
  const lines = dsPseudocode[type] || [];
  lines.forEach((lineText, idx) => {
    const lineDiv = document.createElement('div');
    lineDiv.className = 'pseudocode-line';
    lineDiv.id = `ds-pc-line-${idx}`;
    lineDiv.textContent = lineText;
    container.appendChild(lineDiv);
  });
}

function highlightDSPseudocodeLine(idx) {
  document.querySelectorAll('.pseudocode-line').forEach(el => el.classList.remove('active'));
  if (idx !== null) {
    const activeEl = document.getElementById(`ds-pc-line-${idx}`);
    if (activeEl) activeEl.classList.add('active');
  }
}

// Main DS Render Dispatcher
export function renderDS() {
  viewport.innerHTML = '';
  // Clear SVG lines
  const svg = document.getElementById('tree-svg');
  svg.innerHTML = '';
  const treeNodes = document.getElementById('tree-nodes');
  treeNodes.innerHTML = '';

  if (currentDS === 'ds-stack') {
    renderStack();
  } else if (currentDS === 'ds-queue') {
    renderQueue();
  } else if (currentDS === 'ds-linkedlist') {
    renderLinkedList();
  } else if (currentDS === 'ds-bst') {
    renderBST();
  }
}

function getDelay() {
  return parseInt(document.getElementById('speed-slider').value, 10);
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/* =========================================================================
   STACK OPERATIONS
   ========================================================================= */
function renderStack(highlightIndex = null) {
  viewport.innerHTML = '';
  
  // Outer stack barrel
  const barrel = document.createElement('div');
  barrel.style.width = '180px';
  barrel.style.height = '85%';
  barrel.style.border = '3px dashed var(--border-glass)';
  barrel.style.borderTop = 'none';
  barrel.style.borderRadius = '0 0 var(--radius-lg) var(--radius-lg)';
  barrel.style.display = 'flex';
  barrel.style.flexDirection = 'column-reverse';
  barrel.style.alignItems = 'center';
  barrel.style.justifyContent = 'flex-start';
  barrel.style.padding = '12px';
  barrel.style.gap = '8px';
  barrel.style.background = 'rgba(255, 255, 255, 0.02)';
  
  stackData.forEach((val, idx) => {
    const element = document.createElement('div');
    element.className = 'struct-node';
    element.style.borderRadius = 'var(--radius-md)';
    element.style.width = '100%';
    element.style.height = '48px';
    element.textContent = val;
    
    if (idx === stackData.length - 1) {
      element.classList.add('active');
      const ptr = document.createElement('span');
      ptr.className = 'struct-node-pointer';
      ptr.textContent = 'TOP';
      element.appendChild(ptr);
    }
    
    if (idx === highlightIndex) {
      element.classList.add('highlight');
    }
    
    barrel.appendChild(element);
  });
  
  viewport.appendChild(barrel);
}

export async function pushStack(val) {
  if (stackData.length >= 6) {
    alert("Stack Overflow! Maximum visualization capacity reached.");
    return;
  }
  highlightDSPseudocodeLine(0);
  await sleep(getDelay() / 2);
  stackData.push(val);
  highlightDSPseudocodeLine(1);
  renderStack(stackData.length - 1);
  await sleep(getDelay());
  highlightDSPseudocodeLine(2);
  renderStack();
}

export async function popStack() {
  if (stackData.length === 0) {
    alert("Stack Underflow!");
    return;
  }
  highlightDSPseudocodeLine(4);
  await sleep(getDelay() / 2);
  highlightDSPseudocodeLine(5);
  renderStack(stackData.length - 1);
  await sleep(getDelay());
  stackData.pop();
  highlightDSPseudocodeLine(6);
  renderStack();
}

/* =========================================================================
   QUEUE OPERATIONS
   ========================================================================= */
function renderQueue(highlightIndex = null) {
  viewport.innerHTML = '';
  
  const lineContainer = document.createElement('div');
  lineContainer.className = 'linear-container';
  
  queueData.forEach((val, idx) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'node-wrapper';
    
    const node = document.createElement('div');
    node.className = 'struct-node';
    node.textContent = val;
    
    // Front pointer
    if (idx === 0) {
      node.style.borderColor = 'var(--accent-cyan)';
      const ptr = document.createElement('span');
      ptr.className = 'struct-node-pointer';
      ptr.textContent = 'FRONT';
      node.appendChild(ptr);
    }
    // Rear pointer
    if (idx === queueData.length - 1 && queueData.length > 1) {
      node.style.borderColor = 'var(--accent-purple)';
      const ptr = document.createElement('span');
      ptr.className = 'struct-node-pointer';
      ptr.textContent = 'REAR';
      node.appendChild(ptr);
    } else if (idx === queueData.length - 1 && queueData.length === 1) {
      // Single element is both FRONT and REAR
      const ptr = node.querySelector('.struct-node-pointer');
      if (ptr) ptr.textContent = 'FRONT / REAR';
    }
    
    if (idx === highlightIndex) {
      node.classList.add('highlight');
    }
    
    wrapper.appendChild(node);
    
    // Add arrow if not last
    if (idx < queueData.length - 1) {
      const arrow = document.createElement('div');
      arrow.className = 'struct-arrow';
      wrapper.appendChild(arrow);
    }
    
    lineContainer.appendChild(wrapper);
  });
  
  viewport.appendChild(lineContainer);
}

export async function enqueueQueue(val) {
  if (queueData.length >= 7) {
    alert("Queue Full! Maximum visualization capacity reached.");
    return;
  }
  highlightDSPseudocodeLine(0);
  await sleep(getDelay() / 2);
  queueData.push(val);
  highlightDSPseudocodeLine(1);
  renderQueue(queueData.length - 1);
  await sleep(getDelay());
  highlightDSPseudocodeLine(2);
  renderQueue();
}

export async function dequeueQueue() {
  if (queueData.length === 0) {
    alert("Queue Empty!");
    return;
  }
  highlightDSPseudocodeLine(4);
  await sleep(getDelay() / 2);
  highlightDSPseudocodeLine(5);
  renderQueue(0);
  await sleep(getDelay());
  queueData.shift();
  highlightDSPseudocodeLine(6);
  renderQueue();
}

/* =========================================================================
   LINKED LIST OPERATIONS
   ========================================================================= */
function renderLinkedList(activeIndices = {}, animateArrowIndex = null) {
  viewport.innerHTML = '';
  
  const listContainer = document.createElement('div');
  listContainer.className = 'linear-container';
  
  listData.forEach((val, idx) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'node-wrapper';
    
    const node = document.createElement('div');
    node.className = 'struct-node';
    node.textContent = val;
    
    if (idx === 0) {
      const ptr = document.createElement('span');
      ptr.className = 'struct-node-pointer';
      ptr.textContent = 'HEAD';
      node.appendChild(ptr);
    }
    
    if (activeIndices[idx]) {
      node.classList.add(activeIndices[idx]);
    }
    
    wrapper.appendChild(node);
    
    // Add sequential arrow
    const arrow = document.createElement('div');
    arrow.className = 'struct-arrow';
    if (animateArrowIndex === idx) {
      arrow.classList.add('active');
    }
    wrapper.appendChild(arrow);
    
    // Null marker for the last element
    if (idx === listData.length - 1) {
      const nullNode = document.createElement('div');
      nullNode.className = 'struct-node';
      nullNode.style.border = '1px dashed var(--text-muted)';
      nullNode.style.color = 'var(--text-muted)';
      nullNode.style.width = '36px';
      nullNode.style.height = '36px';
      nullNode.textContent = 'Ø';
      wrapper.appendChild(nullNode);
    }
    
    listContainer.appendChild(wrapper);
  });
  
  viewport.appendChild(listContainer);
}

export async function insertHeadList(val) {
  if (listData.length >= 6) {
    alert("List size limit reached!");
    return;
  }
  highlightDSPseudocodeLine(0);
  await sleep(getDelay() / 2);
  highlightDSPseudocodeLine(1);
  // Animate adding node
  listData.unshift(val);
  highlightDSPseudocodeLine(2);
  renderLinkedList({ 0: 'highlight' });
  await sleep(getDelay());
  highlightDSPseudocodeLine(3);
  renderLinkedList();
}

export async function deleteHeadList() {
  if (listData.length === 0) {
    alert("List is empty!");
    return;
  }
  highlightDSPseudocodeLine(5);
  await sleep(getDelay() / 2);
  highlightDSPseudocodeLine(6);
  renderLinkedList({ 0: 'highlight' });
  await sleep(getDelay());
  listData.shift();
  highlightDSPseudocodeLine(7);
  renderLinkedList();
}

export async function searchList(val) {
  if (listData.length === 0) {
    alert("List is empty!");
    return;
  }
  let found = false;
  for (let i = 0; i < listData.length; i++) {
    renderLinkedList({ [i]: 'active' });
    await sleep(getDelay());
    
    if (listData[i] === val) {
      renderLinkedList({ [i]: 'success' });
      found = true;
      break;
    }
  }
  if (!found) {
    alert(`Value ${val} not found in the list.`);
    renderLinkedList();
  }
}

/* =========================================================================
   BINARY SEARCH TREE (BST) OPERATIONS
   ========================================================================= */
let treeCoords = {};

function calculateCoords(node, x, y, level, dx) {
  if (!node) return;
  treeCoords[node.value] = { x, y };
  calculateCoords(node.left, x - dx, y + 60, level + 1, dx / 1.7);
  calculateCoords(node.right, x + dx, y + 60, level + 1, dx / 1.7);
}

function renderBST(highlightedNodes = {}) {
  const treeNodes = document.getElementById('tree-nodes');
  const svg = document.getElementById('tree-svg');
  
  treeNodes.innerHTML = '';
  svg.innerHTML = '';
  
  if (!bstRoot) return;

  const width = viewport.clientWidth || 600;
  treeCoords = {};
  calculateCoords(bstRoot, width / 2, 40, 1, width / 4.5);

  // Draw lines
  drawTreeEdges(bstRoot, svg);
  // Draw nodes
  drawTreeNodes(bstRoot, treeNodes, highlightedNodes);
}

function drawTreeEdges(node, svg) {
  if (!node) return;
  
  const parentCoord = treeCoords[node.value];
  
  if (node.left) {
    const childCoord = treeCoords[node.left.value];
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', parentCoord.x);
    line.setAttribute('y1', parentCoord.y);
    line.setAttribute('x2', childCoord.x);
    line.setAttribute('y2', childCoord.y);
    line.setAttribute('stroke', 'rgba(255, 255, 255, 0.15)');
    line.setAttribute('stroke-width', '2');
    svg.appendChild(line);
    drawTreeEdges(node.left, svg);
  }
  
  if (node.right) {
    const childCoord = treeCoords[node.right.value];
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', parentCoord.x);
    line.setAttribute('y1', parentCoord.y);
    line.setAttribute('x2', childCoord.x);
    line.setAttribute('y2', childCoord.y);
    line.setAttribute('stroke', 'rgba(255, 255, 255, 0.15)');
    line.setAttribute('stroke-width', '2');
    svg.appendChild(line);
    drawTreeEdges(node.right, svg);
  }
}

function drawTreeNodes(node, container, highlightedNodes) {
  if (!node) return;
  
  const coord = treeCoords[node.value];
  const nodeDiv = document.createElement('div');
  nodeDiv.className = 'node-container';
  nodeDiv.style.left = `${coord.x - 24}px`; // Node center offset
  nodeDiv.style.top = `${coord.y - 24}px`;
  
  const valDiv = document.createElement('div');
  valDiv.className = 'struct-node';
  valDiv.textContent = node.value;
  
  if (highlightedNodes[node.value]) {
    valDiv.classList.add(highlightedNodes[node.value]);
  }
  
  nodeDiv.appendChild(valDiv);
  container.appendChild(nodeDiv);
  
  drawTreeNodes(node.left, container, highlightedNodes);
  drawTreeNodes(node.right, container, highlightedNodes);
}

export async function insertBST(val) {
  if (findBSTNode(bstRoot, val)) {
    alert("Value already exists in BST!");
    return;
  }
  
  highlightDSPseudocodeLine(0);
  bstRoot = await insertBSTHelper(bstRoot, val);
  renderBST();
  highlightDSPseudocodeLine(null);
}

async function insertBSTHelper(node, val) {
  if (!node) {
    highlightDSPseudocodeLine(1);
    const newNode = new BSTNode(val);
    // Draw the tree temporarily with the highlighted new node
    renderBST({ [val]: 'success' });
    await sleep(getDelay());
    return newNode;
  }
  
  // Highlight traversal step
  renderBST({ [node.value]: 'active' });
  await sleep(getDelay());

  if (val < node.value) {
    highlightDSPseudocodeLine(2);
    highlightDSPseudocodeLine(3);
    node.left = await insertBSTHelper(node.left, val);
  } else {
    highlightDSPseudocodeLine(4);
    highlightDSPseudocodeLine(5);
    node.right = await insertBSTHelper(node.right, val);
  }
  return node;
}

export async function deleteBST(val) {
  if (!findBSTNode(bstRoot, val)) {
    alert(`Value ${val} does not exist in the BST.`);
    return;
  }
  
  bstRoot = await deleteBSTHelper(bstRoot, val);
  renderBST();
}

async function deleteBSTHelper(node, val) {
  if (!node) return null;
  
  renderBST({ [node.value]: 'active' });
  await sleep(getDelay());
  
  if (val < node.value) {
    node.left = await deleteBSTHelper(node.left, val);
  } else if (val > node.value) {
    node.right = await deleteBSTHelper(node.right, val);
  } else {
    // Found the node to delete
    renderBST({ [node.value]: 'highlight' });
    await sleep(getDelay());
    
    // Case 1: No child or 1 child
    if (!node.left) return node.right;
    if (!node.right) return node.left;
    
    // Case 2: 2 children. Find min in right subtree
    let minNode = findMin(node.right);
    node.value = minNode.value;
    
    // Delete that min node
    node.right = await deleteBSTHelper(node.right, minNode.value);
  }
  return node;
}

function findMin(node) {
  while (node.left) node = node.left;
  return node;
}

export async function searchBST(val) {
  let curr = bstRoot;
  let found = false;
  
  while (curr) {
    renderBST({ [curr.value]: 'active' });
    await sleep(getDelay());
    
    if (curr.value === val) {
      renderBST({ [curr.value]: 'success' });
      found = true;
      break;
    } else if (val < curr.value) {
      curr = curr.left;
    } else {
      curr = curr.right;
    }
  }
  
  if (!found) {
    alert(`Value ${val} not found in the BST.`);
    renderBST();
  }
}

function findBSTNode(node, val) {
  if (!node) return false;
  if (node.value === val) return true;
  return val < node.value ? findBSTNode(node.left, val) : findBSTNode(node.right, val);
}
