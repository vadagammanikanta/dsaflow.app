// Learning Curriculum and Quiz Question Database for DSA Learning Hub

export const curriculum = [
  {
    id: "big-o",
    title: "Big O Notation",
    category: "Fundamentals",
    summary: "Understand how to analyze and compare algorithm efficiency using time and space complexities.",
    readTime: "5 mins",
    complexity: {
      worstTime: "O(1) to O(2^N)",
      bestTime: "N/A",
      space: "N/A"
    },
    details: `
      <h2>Introduction to Big O Notation</h2>
      <p>Big O notation is a mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity. In computer science, it is used to classify algorithms according to how their run time or space requirements grow as the input size (usually denoted as <strong>N</strong>) grows.</p>
      
      <h3>Real-World Analogy</h3>
      <p>Imagine you have a file on a USB drive and you need to send it to a friend living across town:</p>
      <ul>
        <li><strong>O(1) - Constant Time:</strong> Flying or driving to your friend's house. No matter how large the file on the USB is (1MB or 1TB), the travel time remains the same.</li>
        <li><strong>O(N) - Linear Time:</strong> Transferring the file over the internet. If it takes 2 minutes to send 1GB, it will take 20 minutes to send 10GB. The time scales directly with the file size.</li>
      </ul>

      <h3>Common Complexities Chart</h3>
      <table class="complexity-table">
        <thead>
          <tr>
            <th>Complexity</th>
            <th>Name</th>
            <th>Efficiency Status</th>
            <th>Example Operation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="complexity-badge complexity-green">O(1)</span></td>
            <td>Constant Time</td>
            <td>Excellent</td>
            <td>Accessing an array element by index.</td>
          </tr>
          <tr>
            <td><span class="complexity-badge complexity-green">O(log N)</span></td>
            <td>Logarithmic Time</td>
            <td>Excellent</td>
            <td>Searching in a sorted array using Binary Search.</td>
          </tr>
          <tr>
            <td><span class="complexity-badge complexity-green">O(N)</span></td>
            <td>Linear Time</td>
            <td>Good</td>
            <td>Finding the minimum element in an unsorted array.</td>
          </tr>
          <tr>
            <td><span class="complexity-badge complexity-yellow">O(N log N)</span></td>
            <td>Linearithmic Time</td>
            <td>Fair</td>
            <td>Sorting items using Merge Sort or Quick Sort.</td>
          </tr>
          <tr>
            <td><span class="complexity-badge complexity-red">O(N²)</span></td>
            <td>Quadratic Time</td>
            <td>Poor</td>
            <td>Comparing all elements in nested loops (Bubble Sort).</td>
          </tr>
          <tr>
            <td><span class="complexity-badge complexity-red">O(2^N)</span></td>
            <td>Exponential Time</td>
            <td>Very Bad</td>
            <td>Solving the Towers of Hanoi or finding all subsets.</td>
          </tr>
        </tbody>
      </table>

      <h3>Key Rules of Analysis</h3>
      <ol>
        <li><strong>Focus on Worst-Case:</strong> We usually design for the absolute worst-case scenario.</li>
        <li><strong>Drop Constants:</strong> An algorithm taking <code>2N</code> operations is simplified to <code>O(N)</code>.</li>
        <li><strong>Drop Less Significant Terms:</strong> An algorithm taking <code>N² + N</code> operations is simplified to <code>O(N²)</code> because the quadratic term dominates for large N.</li>
      </ol>
    `
  },
  {
    id: "arrays",
    title: "Arrays & Strings",
    category: "Data Structures",
    summary: "The most basic and fundamental linear data structures that store elements in contiguous memory location.",
    readTime: "6 mins",
    complexity: {
      worstTime: "Access: O(1) | Search: O(N)",
      bestTime: "Insert: O(N) | Delete: O(N)",
      space: "O(N)"
    },
    details: `
      <h2>Arrays and Strings</h2>
      <p>An <strong>Array</strong> is a collection of elements of the same type stored in contiguous memory locations. Because memory is contiguous, the computer can calculate the address of any element instantly using its index, resulting in constant-time access.</p>
      <p>A <strong>String</strong> is simply an array of characters, often terminated by a special null character or stored with length metadata.</p>

      <h3>Real-World Analogy</h3>
      <p>Think of an array as a row of numbered mailboxes at a post office. If you know the mailbox number, you can immediately walk up to it and retrieve the mail (O(1) access). If you are looking for mail addressed to "John Doe" and don't know the mailbox number, you must check them one by one (O(N) search).</p>

      <h3>Operations & Efficiency</h3>
      <ul>
        <li><strong>Lookup (by index):</strong> <code>O(1)</code> - Direct memory address computation.</li>
        <li><strong>Insertion:</strong> <code>O(N)</code> - In the worst case (inserting at index 0), all subsequent elements must shift right to make room.</li>
        <li><strong>Deletion:</strong> <code>O(N)</code> - Similar to insertion; all elements to the right must shift left to close the gap.</li>
        <li><strong>Search:</strong> <code>O(N)</code> - Checking index 0 to N-1 for the target.</li>
      </ul>

      <div class="code-title">Array Insertion (JavaScript)</div>
      <pre><code>// Insert value at index in an array
function insertAt(arr, index, value) {
  // Shift elements to the right
  for (let i = arr.length; i > index; i--) {
    arr[i] = arr[i - 1];
  }
  arr[index] = value;
  return arr;
}</code></pre>
    `
  },
  {
    id: "stack-queue",
    title: "Stacks & Queues",
    category: "Data Structures",
    summary: "Linear data structures conforming to LIFO (Last In First Out) and FIFO (First In First Out) paradigms.",
    readTime: "7 mins",
    complexity: {
      worstTime: "Push/Pop: O(1) | Enqueue/Dequeue: O(1)",
      bestTime: "Search: O(N)",
      space: "O(N)"
    },
    details: `
      <h2>Stacks & Queues</h2>
      <p>These are restricted versions of linear lists. Rather than allowing insertion and removal at arbitrary indexes, they restrict operations to specific endpoints.</p>

      <h3>Stack (LIFO: Last-In, First-Out)</h3>
      <p>Elements are added to and removed from only one end, called the <strong>top</strong>.</p>
      <ul>
        <li><strong>Push:</strong> Add an element to the top (O(1)).</li>
        <li><strong>Pop:</strong> Remove the top element (O(1)).</li>
        <li><strong>Peek:</strong> View the top element without removing it (O(1)).</li>
      </ul>
      <p><em>Analogy:</em> A stack of dinner plates. You only add new plates to the top and wash the plate currently on top.</p>

      <h3>Queue (FIFO: First-In, First-Out)</h3>
      <p>Elements are added at the <strong>rear/back</strong> and removed from the <strong>front/head</strong>.</p>
      <ul>
        <li><strong>Enqueue:</strong> Add an element to the rear (O(1)).</li>
        <li><strong>Dequeue:</strong> Remove the front element (O(1)).</li>
      </ul>
      <p><em>Analogy:</em> A queue of people waiting in line at a movie theater. The first person to arrive is the first one served and leaves.</p>

      <div class="code-title">Stack Implementation (JavaScript)</div>
      <pre><code>class Stack {
  constructor() {
    this.items = [];
  }
  push(element) {
    this.items.push(element); // O(1)
  }
  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop(); // O(1)
  }
  peek() {
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length === 0;
  }
}</code></pre>
    `
  },
  {
    id: "linked-list",
    title: "Linked Lists",
    category: "Data Structures",
    summary: "Nodes scattered in memory, connected sequentially by pointers, offering O(1) head insertion.",
    readTime: "8 mins",
    complexity: {
      worstTime: "Insert (Head): O(1) | Insert (N-th): O(N)",
      bestTime: "Search: O(N) | Delete: O(1) (if node known)",
      space: "O(N)"
    },
    details: `
      <h2>Singly Linked Lists</h2>
      <p>Unlike arrays, elements in a <strong>Linked List</strong> are not stored in contiguous memory. Instead, each element is a wrapper called a <strong>Node</strong>, containing two components: the data value, and a <strong>Pointer/Reference</strong> pointing to the next node in the sequence.</p>

      <h3>Real-World Analogy</h3>
      <p>Think of a scavenger hunt. You are given a clue containing a message and the address of the next clue. You cannot jump directly to clue #5 without reading through clues 1, 2, 3, and 4 first.</p>

      <h3>Pros & Cons vs Arrays</h3>
      <ul>
        <li><strong>Pros:</strong> Dynamic sizing (never runs out of capacity), very fast insertion/deletion at the head (O(1)) because no elements have to be shifted.</li>
        <li><strong>Cons:</strong> No constant-time indexing (lookup is O(N) because you must traverse from the head), uses extra memory for pointers.</li>
      </ul>

      <div class="code-title">Singly Linked List Node (JavaScript)</div>
      <pre><code>class Node {
  constructor(value) {
    this.value = value;
    this.next = null; // Pointer to next node
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  
  insertAtHead(value) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode; // O(1)
  }
}</code></pre>
    `
  },
  {
    id: "trees-bst",
    title: "Trees & BSTs",
    category: "Data Structures",
    summary: "Hierarchical data structures. Learn Binary Search Trees for O(log N) lookup speeds.",
    readTime: "9 mins",
    complexity: {
      worstTime: "Search: O(N) (unbalanced) | O(log N) (balanced)",
      bestTime: "Insert/Delete: O(log N)",
      space: "O(N)"
    },
    details: `
      <h2>Trees and Binary Search Trees</h2>
      <p>A <strong>Tree</strong> is a hierarchical data structure consisting of nodes connected by directed edges. A <strong>Binary Tree</strong> restricts each node to a maximum of two children, called the left child and right child.</p>
      
      <p>A <strong>Binary Search Tree (BST)</strong> is a binary tree that maintains a strict ordering property:</p>
      <ul>
        <li>All values in the <strong>left subtree</strong> of a node are less than the node's value.</li>
        <li>All values in the <strong>right subtree</strong> of a node are greater than the node's value.</li>
      </ul>

      <h3>Lookup & Insertion Speed</h3>
      <p>When searching for a value, at each node we can discard half of the remaining tree (just like Binary Search). This results in a search complexity of <strong>O(log N)</strong> on balanced trees.</p>
      <p>However, if nodes are inserted in sorted order, the tree can degrade into a linear linked list, resulting in <strong>O(N)</strong> search complexity. This is why self-balancing trees (AVL, Red-Black Trees) are used in production environments.</p>

      <div class="code-title">BST Insertion Logic (JavaScript)</div>
      <pre><code>class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function insertNode(root, value) {
  if (root === null) {
    return new TreeNode(value);
  }
  if (value < root.value) {
    root.left = insertNode(root.left, value);
  } else {
    root.right = insertNode(root.right, value);
  }
  return root;
}</code></pre>
    `
  },
  {
    id: "sorting-algos",
    title: "Sorting Algorithms",
    category: "Algorithms",
    summary: "Explore how different methods reorder array items efficiently, from O(N²) bubble sorts to O(N log N) merge sorts.",
    readTime: "10 mins",
    complexity: {
      worstTime: "Bubble/Selection: O(N²) | Merge: O(N log N)",
      bestTime: "Quick Sort: O(N log N) average | O(N²) worst-case",
      space: "Merge: O(N) | Quick/Heap: O(1) / O(log N)"
    },
    details: `
      <h2>Sorting Algorithms Overview</h2>
      <p>Sorting is the process of arranging data in a specific order (ascending or descending). It is one of the most fundamental operations in software systems, optimizing search efficiency dramatically (e.g. enabling O(log N) binary search).</p>

      <h3>Comparison of Common Sorting Algorithms</h3>
      <table class="complexity-table">
        <thead>
          <tr>
            <th>Algorithm</th>
            <th>Best Time</th>
            <th>Worst Time</th>
            <th>Space Complexity</th>
            <th>Stability</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Bubble Sort</strong></td>
            <td>O(N) (optimized)</td>
            <td>O(N²)</td>
            <td>O(1)</td>
            <td>Stable</td>
          </tr>
          <tr>
            <td><strong>Selection Sort</strong></td>
            <td>O(N²)</td>
            <td>O(N²)</td>
            <td>O(1)</td>
            <td>Unstable</td>
          </tr>
          <tr>
            <td><strong>Insertion Sort</strong></td>
            <td>O(N)</td>
            <td>O(N²)</td>
            <td>O(1)</td>
            <td>Stable</td>
          </tr>
          <tr>
            <td><strong>Merge Sort</strong></td>
            <td>O(N log N)</td>
            <td>O(N log N)</td>
            <td>O(N)</td>
            <td>Stable</td>
          </tr>
          <tr>
            <td><strong>Quick Sort</strong></td>
            <td>O(N log N)</td>
            <td>O(N²)</td>
            <td>O(log N)</td>
            <td>Unstable</td>
          </tr>
        </tbody>
      </table>

      <h3>Divide and Conquer</h3>
      <p>Advanced sorting algorithms like <strong>Merge Sort</strong> and <strong>Quick Sort</strong> use the "Divide and Conquer" strategy. They break the problem down into smaller sub-arrays, solve them recursively, and combine the results. This allows them to bypass the O(N²) boundary and achieve <strong>O(N log N)</strong> runtime.</p>
    `
  }
];

export const quizQuestions = [
  {
    question: "Which data structure follows the Last-In, First-Out (LIFO) model?",
    options: [
      "Queue",
      "Stack",
      "Singly Linked List",
      "Binary Search Tree"
    ],
    answer: 1, // Index of correct option (Stack)
    explanation: "A **Stack** operates on LIFO (Last-In, First-Out). Elements are added ('pushed') and removed ('popped') from the same end, matching how plates are stacked."
  },
  {
    question: "What is the worst-case search complexity of an unbalanced Binary Search Tree (BST)?",
    options: [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N log N)"
    ],
    answer: 2, // O(N)
    explanation: "If a BST is unbalanced (e.g. elements inserted in sorted order, forming a single chain), searching requires traversal of every node in the worst case, degrading to **O(N)**."
  },
  {
    question: "Which of the following sorting algorithms has a guaranteed worst-case time complexity of O(N log N)?",
    options: [
      "Bubble Sort",
      "Quick Sort",
      "Selection Sort",
      "Merge Sort"
    ],
    answer: 3, // Merge Sort
    explanation: "**Merge Sort** guarantees **O(N log N)** time complexity under all conditions (best, average, worst) because it always divides the array in half and performs linear merges."
  },
  {
    question: "If you need to access elements at arbitrary indices instantly, which data structure is most suitable?",
    options: [
      "Linked List",
      "Stack",
      "Array",
      "Queue"
    ],
    answer: 2, // Array
    explanation: "An **Array** stores elements in contiguous memory slots, allowing **O(1) constant time index access**. Linked Lists require starting from the head and traversing sequentially."
  },
  {
    question: "What does the Big O notation simplify for an algorithm taking 5N² + 10N + 3 operations?",
    options: [
      "O(N²)",
      "O(5N²)",
      "O(N)",
      "O(N³)"
    ],
    answer: 0, // O(N2)
    explanation: "Under Big O notation, we **drop constant factors** (5) and **lower-order terms** (10N + 3) since they become negligible as N grows large. Thus, the complexity is **O(N²)**."
  }
];
