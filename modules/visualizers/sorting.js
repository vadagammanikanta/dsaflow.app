// Sorting Visualizer Module for DSA Learning Hub

let array = [];
const ARRAY_SIZE = 20;
let viewport = null;
let currentGen = null;
let isPlaying = false;
let playIntervalId = null;
let delay = 500;

// Metadata for complexities
export const sortingComplexity = {
  "sort-bubble": { worstTime: "O(N²)", bestTime: "O(N)", space: "O(1)", desc: "Bubble sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order." },
  "sort-selection": { worstTime: "O(N²)", bestTime: "O(N²)", space: "O(1)", desc: "Selection sort divides the array into sorted and unsorted parts, repeatedly finds the minimum element from the unsorted part, and puts it at the beginning." },
  "sort-insertion": { worstTime: "O(N²)", bestTime: "O(N)", space: "O(1)", desc: "Insertion sort builds the sorted array one item at a time, shifting larger elements to make room for each new element." },
  "sort-merge": { worstTime: "O(N log N)", bestTime: "O(N log N)", space: "O(N)", desc: "Merge sort is a divide-and-conquer algorithm that recursively splits the array in half, sorts each half, and merges them back together." },
  "sort-quick": { worstTime: "O(N²)", bestTime: "O(N log N)", space: "O(log N)", desc: "Quick sort is a divide-and-conquer algorithm that picks an element as pivot and partitions the array around it." }
};

// Pseudocode templates
const pseudocodeTemplates = {
  "sort-bubble": [
    "for i from 0 to N-1:",
    "  for j from 0 to N-i-2:",
    "    if array[j] > array[j+1]:",
    "      swap(array[j], array[j+1])"
  ],
  "sort-selection": [
    "for i from 0 to N-1:",
    "  min_idx = i",
    "  for j from i+1 to N-1:",
    "    if array[j] < array[min_idx]: min_idx = j",
    "  swap(array[i], array[min_idx])"
  ],
  "sort-insertion": [
    "for i from 1 to N-1:",
    "  key = array[i]",
    "  j = i - 1",
    "  while j >= 0 and array[j] > key:",
    "    array[j+1] = array[j]",
    "    j--",
    "  array[j+1] = key"
  ],
  "sort-merge": [
    "mergeSort(arr, l, r):",
    "  if l < r:",
    "    m = (l+r)/2",
    "    mergeSort(arr, l, m)",
    "    mergeSort(arr, m+1, r)",
    "    merge(arr, l, m, r)"
  ],
  "sort-quick": [
    "quickSort(arr, low, high):",
    "  if low < high:",
    "    pi = partition(arr, low, high)",
    "    quickSort(arr, low, pi - 1)",
    "    quickSort(arr, pi + 1, high)"
  ]
};

export function initSorting(viewportContainer) {
  viewport = viewportContainer;
  isPlaying = false;
  clearInterval(playIntervalId);
  generateRandomArray();
}

export function generateRandomArray() {
  array = [];
  for (let i = 0; i < ARRAY_SIZE; i++) {
    array.push(Math.floor(Math.random() * 80) + 15); // values between 15 and 95
  }
  renderArray();
  resetGenerator();
}

function renderArray(activeIndices = {}, stateClass = '') {
  let container = document.getElementById('array-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'array-container';
    container.className = 'array-container';
    viewport.appendChild(container);
  }
  container.innerHTML = '';

  array.forEach((val, idx) => {
    const bar = document.createElement('div');
    bar.className = 'array-bar';
    bar.style.height = `${val * 3}px`;
    bar.style.width = `calc(100% / ${ARRAY_SIZE} - 6px)`;

    // Show labels for smaller arrays
    const valSpan = document.createElement('span');
    valSpan.className = 'array-bar-value';
    valSpan.textContent = val;
    bar.appendChild(valSpan);

    // Apply color highlighting
    if (activeIndices[idx]) {
      bar.classList.add(activeIndices[idx]);
    }

    container.appendChild(bar);
  });
}

// Reset generator depending on selected algorithm
export function resetGenerator() {
  const select = document.getElementById('visualizer-select');
  const algo = select.value;
  
  // Load pseudocode
  loadPseudocode(algo);

  if (algo === 'sort-bubble') {
    currentGen = bubbleSortGen([...array]);
  } else if (algo === 'sort-selection') {
    currentGen = selectionSortGen([...array]);
  } else if (algo === 'sort-insertion') {
    currentGen = insertionSortGen([...array]);
  } else if (algo === 'sort-merge') {
    currentGen = mergeSortGen([...array]);
  } else if (algo === 'sort-quick') {
    currentGen = quickSortGen([...array]);
  }
}

export function setDelay(newDelay) {
  delay = newDelay;
  if (isPlaying) {
    pause();
    play();
  }
}

export function play() {
  if (isPlaying) return;
  isPlaying = true;
  document.getElementById('btn-play-pause').innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
  `;
  
  playIntervalId = setInterval(() => {
    const isDone = step();
    if (isDone) {
      pause();
    }
  }, delay);
}

export function pause() {
  isPlaying = false;
  clearInterval(playIntervalId);
  document.getElementById('btn-play-pause').innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
  `;
}

export function isCurrentlyPlaying() {
  return isPlaying;
}

export function step() {
  if (!currentGen) resetGenerator();
  
  const res = currentGen.next();
  if (res.done) {
    // Mark everything as sorted
    renderArray({}, '');
    const bars = document.querySelectorAll('.array-bar');
    bars.forEach(bar => bar.classList.add('sorted'));
    return true;
  }

  const { type, indices, array: nextArr, line } = res.value;
  
  if (nextArr) {
    array = nextArr;
  }

  // Highlight pseudocode line
  highlightPseudocodeLine(line);

  // Map indices to highlight class
  const activeMap = {};
  if (indices) {
    indices.forEach(idx => {
      activeMap[idx] = type; // 'compare', 'swap', 'pivot', etc.
    });
  }

  renderArray(activeMap);
  return false;
}

// Pseudocode loaders
function loadPseudocode(algo) {
  const container = document.getElementById('pseudocode-container');
  container.innerHTML = '';
  const lines = pseudocodeTemplates[algo] || [];
  
  lines.forEach((lineText, idx) => {
    const lineDiv = document.createElement('div');
    lineDiv.className = 'pseudocode-line';
    lineDiv.id = `pc-line-${idx}`;
    lineDiv.textContent = lineText;
    container.appendChild(lineDiv);
  });
}

function highlightPseudocodeLine(lineIndex) {
  document.querySelectorAll('.pseudocode-line').forEach(el => el.classList.remove('active'));
  if (lineIndex !== undefined) {
    const activeEl = document.getElementById(`pc-line-${lineIndex}`);
    if (activeEl) activeEl.classList.add('active');
  }
}

/* =========================================================================
   SORTING GENERATORS
   ========================================================================= */

function* bubbleSortGen(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    yield { type: 'compare', indices: [], line: 0 };
    for (let j = 0; j < n - i - 1; j++) {
      yield { type: 'compare', indices: [j, j + 1], line: 1 };
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        yield { type: 'swap', indices: [j, j + 1], array: [...arr], line: 3 };
      }
    }
    // Element at n-i-1 is sorted
  }
}

function* selectionSortGen(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    yield { type: 'pivot', indices: [minIdx], line: 0 };
    yield { type: 'compare', indices: [], line: 1 };
    
    for (let j = i + 1; j < n; j++) {
      yield { type: 'compare', indices: [j, minIdx], line: 2 };
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        yield { type: 'pivot', indices: [minIdx], line: 3 };
      }
    }
    
    if (minIdx !== i) {
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
      yield { type: 'swap', indices: [i, minIdx], array: [...arr], line: 4 };
    }
  }
}

function* insertionSortGen(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    yield { type: 'pivot', indices: [i], line: 0 };
    yield { type: 'compare', indices: [i], line: 1 };
    
    while (j >= 0 && arr[j] > key) {
      yield { type: 'compare', indices: [j, j + 1], line: 3 };
      arr[j + 1] = arr[j];
      yield { type: 'swap', indices: [j, j + 1], array: [...arr], line: 4 };
      j--;
    }
    arr[j + 1] = key;
    yield { type: 'swap', indices: [j + 1], array: [...arr], line: 6 };
  }
}

function* quickSortGen(arr) {
  yield* quickSortHelper(arr, 0, arr.length - 1);
}

function* quickSortHelper(arr, low, high) {
  yield { type: 'compare', indices: [], line: 0 };
  if (low < high) {
    const pIdx = yield* partition(arr, low, high);
    yield* quickSortHelper(arr, low, pIdx - 1);
    yield* quickSortHelper(arr, pIdx + 1, high);
  }
}

function* partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  yield { type: 'pivot', indices: [high], line: 2 };
  
  for (let j = low; j < high; j++) {
    yield { type: 'compare', indices: [j, high] };
    if (arr[j] < pivot) {
      i++;
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      yield { type: 'swap', indices: [i, j], array: [...arr] };
    }
  }
  const temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;
  yield { type: 'swap', indices: [i + 1, high], array: [...arr] };
  return i + 1;
}

function* mergeSortGen(arr) {
  yield* mergeSortHelper(arr, 0, arr.length - 1);
}

function* mergeSortHelper(arr, l, r) {
  yield { type: 'compare', indices: [], line: 0 };
  if (l < r) {
    const m = Math.floor((l + r) / 2);
    yield* mergeSortHelper(arr, l, m);
    yield* mergeSortHelper(arr, m + 1, r);
    yield* merge(arr, l, m, r);
  }
}

function* merge(arr, l, m, r) {
  const n1 = m - l + 1;
  const n2 = r - m;
  const L = [];
  const R = [];
  
  for (let i = 0; i < n1; i++) L.push(arr[l + i]);
  for (let j = 0; j < n2; j++) R.push(arr[m + 1 + j]);
  
  let i = 0, j = 0, k = l;
  
  yield { type: 'compare', indices: [], line: 5 };
  while (i < n1 && j < n2) {
    yield { type: 'compare', indices: [l + i, m + 1 + j] };
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    yield { type: 'swap', indices: [k], array: [...arr] };
    k++;
  }
  
  while (i < n1) {
    arr[k] = L[i];
    yield { type: 'swap', indices: [k], array: [...arr] };
    i++;
    k++;
  }
  
  while (j < n2) {
    arr[k] = R[j];
    yield { type: 'swap', indices: [k], array: [...arr] };
    j++;
    k++;
  }
}
