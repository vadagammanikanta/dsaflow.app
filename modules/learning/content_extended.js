export const curriculumExtended = [
  /* ─── PHASE 0: PROGRAMMING FUNDAMENTALS ─── */
  {
    id: "language-syntax", title: "Language Syntax", category: "Fundamentals", difficulty: "Beginner", icon: "📝", iconColor: "cyan", summary: "Basic rules for writing code: variables, data types, and operators.", readTime: "5 mins",
    details: `<h2>Language Syntax</h2><p>Syntax is the grammar of a programming language. Before learning algorithms, you must understand how to declare variables, use basic data types (integers, strings, booleans), and apply operators (+, -, ==, !=).</p>`
  },
  {
    id: "control-structures", title: "Control Structures", category: "Fundamentals", difficulty: "Beginner", icon: "🔀", iconColor: "emerald", summary: "If/else statements, loops (for, while), and switch cases.", readTime: "6 mins",
    details: `<h2>Control Structures</h2><p>Control structures direct the flow of your program.</p><ul><li><strong>Conditionals:</strong> <code>if</code>, <code>else if</code>, <code>else</code>, <code>switch</code></li><li><strong>Loops:</strong> <code>for</code>, <code>while</code>, <code>do-while</code> for repetition.</li></ul>`
  },
  {
    id: "functions", title: "Functions", category: "Fundamentals", difficulty: "Beginner", icon: "⚙️", iconColor: "purple", summary: "Reusable blocks of code. Parameters, return values, and scope.", readTime: "5 mins",
    details: `<h2>Functions</h2><p>Functions allow you to encapsulate logic into reusable blocks. Understanding pass-by-value vs pass-by-reference is critical for DSA, especially when modifying arrays or objects.</p>`
  },
  {
    id: "oop-basics", title: "OOP Basics", category: "Fundamentals", difficulty: "Intermediate", icon: "🏗️", iconColor: "amber", summary: "Classes, Objects, Inheritance, and Polymorphism.", readTime: "8 mins",
    details: `<h2>Object-Oriented Programming</h2><p>Many data structures (like Linked Lists and Trees) are implemented using Classes/Objects. You need to understand how to create a <code>Node</code> class with properties and methods.</p>`
  },
  {
    id: "pseudo-code", title: "Pseudo Code", category: "Fundamentals", difficulty: "Beginner", icon: "📄", iconColor: "cyan", summary: "Writing logic in plain English before coding.", readTime: "4 mins",
    details: `<h2>Pseudo Code</h2><p>Pseudo code bridges the gap between human logic and programming syntax. In interviews, always write pseudo-code first to validate your algorithmic approach before writing actual code.</p>`
  },

  /* ─── PHASE 2: ALGORITHMIC COMPLEXITY ─── */
  {
    id: "asymptotic-notation", title: "Asymptotic Notation", category: "Complexity", difficulty: "Beginner", icon: "📈", iconColor: "emerald", summary: "Big-O, Big-Theta, and Big-Omega notations.", readTime: "6 mins",
    details: `<h2>Asymptotic Notation</h2>
    <ul>
      <li><strong>Big-O (O):</strong> Upper bound (Worst-case). Most commonly used.</li>
      <li><strong>Big-Omega (Ω):</strong> Lower bound (Best-case).</li>
      <li><strong>Big-Theta (Θ):</strong> Tight bound (Average-case / Exact bound).</li>
    </ul>`
  },

  /* ─── SORTING ALGORITHMS EXPANSION ─── */
  { id: "bubble-sort", title: "Bubble Sort", category: "Sorting", difficulty: "Beginner", icon: "🫧", iconColor: "rose", summary: "Repeatedly steps through the list, swaps adjacent elements. O(N²).", readTime: "3 mins", details: `<h2>Bubble Sort</h2><p>The simplest sorting algorithm. Repeatedly swaps adjacent elements if they are in the wrong order. Very inefficient for large datasets.</p><ul><li>Worst/Average: O(N²)</li><li>Best: O(N) (if already sorted)</li><li>Space: O(1)</li></ul>` },
  { id: "insertion-sort", title: "Insertion Sort", category: "Sorting", difficulty: "Beginner", icon: "📥", iconColor: "amber", summary: "Builds the sorted array one item at a time. O(N²).", readTime: "4 mins", details: `<h2>Insertion Sort</h2><p>Builds the final sorted array one item at a time. Much more efficient in practice than most other simple quadratic algorithms like selection sort or bubble sort. Great for small or nearly-sorted arrays.</p>` },
  { id: "selection-sort", title: "Selection Sort", category: "Sorting", difficulty: "Beginner", icon: "🎯", iconColor: "amber", summary: "Finds the minimum element and puts it at the beginning. O(N²).", readTime: "3 mins", details: `<h2>Selection Sort</h2><p>Divides the input list into two parts: a sorted sublist and an unsorted sublist. Repeatedly finds the minimum element from the unsorted part and puts it at the beginning.</p>` },
  { id: "merge-sort-node", title: "Merge Sort", category: "Sorting", difficulty: "Intermediate", icon: "🔀", iconColor: "emerald", summary: "Divide and conquer algorithm. O(N log N) guaranteed.", readTime: "5 mins", details: `<h2>Merge Sort</h2><p>Divides the array into halves, recursively sorts them, and then merges the sorted halves. Highly efficient and stable, but requires O(N) auxiliary space.</p>` },
  { id: "quick-sort", title: "Quick Sort", category: "Sorting", difficulty: "Intermediate", icon: "⚡", iconColor: "emerald", summary: "Picks a pivot, partitions array. O(N log N) average.", readTime: "6 mins", details: `<h2>Quick Sort</h2><p>Picks an element as pivot and partitions the given array around the picked pivot. In-place sorting. Worst case O(N²), but usually the fastest in practice.</p>` },
  { id: "heap-sort", title: "Heap Sort", category: "Sorting", difficulty: "Intermediate", icon: "⛰️", iconColor: "purple", summary: "Uses a Binary Heap to sort. O(N log N) time, O(1) space.", readTime: "5 mins", details: `<h2>Heap Sort</h2><p>Builds a Max-Heap from the array, then repeatedly extracts the maximum element and rebuilds the heap. In-place and guarantees O(N log N) worst-case time.</p>` },

  /* ─── TREE EXPANSION ─── */
  { id: "tree-traversal", title: "Tree Traversals", category: "Trees", difficulty: "Beginner", icon: "🛤️", iconColor: "cyan", summary: "Inorder, Preorder, Postorder, and Level Order traversals.", readTime: "5 mins", details: `<h2>Tree Traversals</h2><ul><li><strong>In-Order (L-Root-R):</strong> Used to get elements of BST in sorted order.</li><li><strong>Pre-Order (Root-L-R):</strong> Used to create a copy of the tree.</li><li><strong>Post-Order (L-R-Root):</strong> Used to delete the tree.</li><li><strong>Level-Order (BFS):</strong> Traverses layer by layer using a Queue.</li></ul>` },
  { id: "avl-trees", title: "AVL Trees", category: "Trees", difficulty: "Advanced", icon: "⚖️", iconColor: "rose", summary: "Self-balancing Binary Search Tree. Lookups in strictly O(log N).", readTime: "7 mins", details: `<h2>AVL Trees</h2><p>A self-balancing BST where the difference between heights of left and right subtrees cannot be more than one for all nodes. Uses rotations (Left, Right, Left-Right, Right-Left) to maintain balance during insertions and deletions.</p>` },
  { id: "b-trees", title: "B-Trees", category: "Trees", difficulty: "Advanced", icon: "🗄️", iconColor: "purple", summary: "Self-balancing search trees optimized for systems that read/write large blocks of data.", readTime: "6 mins", details: `<h2>B-Trees</h2><p>Generalization of a BST where a node can have more than two children. Commonly used in databases and file systems to minimize disk I/O operations.</p>` },

  /* ─── GRAPH EXPANSION ─── */
  { id: "directed-undirected", title: "Directed vs Undirected", category: "Graphs", difficulty: "Beginner", icon: "↔️", iconColor: "cyan", summary: "Understanding one-way vs two-way graph edges.", readTime: "3 mins", details: `<h2>Graph Types</h2><p><strong>Undirected Graph:</strong> Edges have no direction. If A is connected to B, B is connected to A.<br><strong>Directed Graph (Digraph):</strong> Edges have direction (A -> B doesn't mean B -> A). Often used for dependency resolution.</p>` },
  { id: "dijkstra", title: "Dijkstra's Algorithm", category: "Graphs", difficulty: "Advanced", icon: "🗺️", iconColor: "amber", summary: "Shortest path from single source to all nodes (no negative weights).", readTime: "8 mins", details: `<h2>Dijkstra's Algorithm</h2><p>Finds the shortest path from a starting node to all other nodes in a weighted graph. Uses a Min-Priority Queue. <strong>Cannot handle negative edge weights.</strong> Time complexity: O((V + E) log V).</p>` },
  { id: "bellman-ford", title: "Bellman-Ford", category: "Graphs", difficulty: "Advanced", icon: "📉", iconColor: "rose", summary: "Shortest path algorithm that handles negative weights.", readTime: "7 mins", details: `<h2>Bellman-Ford Algorithm</h2><p>Slower than Dijkstra's (O(V*E)), but can handle graphs with negative weight edges. It is also used to detect negative weight cycles in a graph.</p>` },
  { id: "mst", title: "Minimum Spanning Tree", category: "Graphs", difficulty: "Advanced", icon: "🌲", iconColor: "emerald", summary: "Subset of edges that connects all vertices with minimum total edge weight.", readTime: "6 mins", details: `<h2>Minimum Spanning Tree (MST)</h2><p>An MST of a weighted, connected, undirected graph is a spanning tree with weight less than or equal to the weight of every other spanning tree.</p><ul><li><strong>Prim's Algorithm:</strong> Builds the tree one vertex at a time.</li><li><strong>Kruskal's Algorithm:</strong> Sorts edges and adds them if they don't form a cycle (uses Union-Find).</li></ul>` },

  /* ─── ADVANCED & COMPLEX DATA STRUCTURES ─── */
  { id: "segment-trees", title: "Segment Trees", category: "Advanced DS", difficulty: "Advanced", icon: "📏", iconColor: "purple", summary: "Allows answering range queries and updating arrays in O(log N).", readTime: "8 mins", details: `<h2>Segment Trees</h2><p>A tree data structure used for storing information about intervals, or segments. It allows querying which of the stored segments contain a given point, or answering range queries (like sum, min, max) in O(log N) time.</p>` },
  { id: "fenwick-trees", title: "Fenwick Trees (BIT)", category: "Advanced DS", difficulty: "Advanced", icon: "🌲", iconColor: "emerald", summary: "Binary Indexed Tree for efficient prefix sums and updates.", readTime: "7 mins", details: `<h2>Fenwick Trees</h2><p>A data structure that can efficiently update elements and calculate prefix sums in a table of numbers. Takes O(log N) for both updates and queries, with a much smaller constant factor and less code than a Segment Tree.</p>` },
  { id: "disjoint-set", title: "Disjoint Set (Union-Find)", category: "Advanced DS", difficulty: "Advanced", icon: "🔗", iconColor: "cyan", summary: "Tracks a set of elements partitioned into a number of disjoint subsets.", readTime: "6 mins", details: `<h2>Disjoint Set (Union-Find)</h2><p>Supports two operations: <strong>Find</strong> (determines which subset an element is in) and <strong>Union</strong> (joins two subsets). Used heavily in Kruskal's MST algorithm and for cycle detection in undirected graphs.</p>` },
  { id: "suffix-trees", title: "Suffix Trees / Arrays", category: "Advanced DS", difficulty: "Advanced", icon: "🔠", iconColor: "rose", summary: "Advanced string manipulation structures for fast substring search.", readTime: "8 mins", details: `<h2>Suffix Trees & Arrays</h2><p>A compressed trie containing all the suffixes of the given text as their keys and positions in the text as their values. Used for extremely fast string matching, longest repeated substring, and longest common substring problems.</p>` },

  /* ─── PROBLEM SOLVING TECHNIQUES ─── */
  { id: "brute-force", title: "Brute Force", category: "Problem Solving", difficulty: "Beginner", icon: "🔨", iconColor: "cyan", summary: "Straightforward approach generating all possible solutions.", readTime: "4 mins", details: `<h2>Brute Force</h2><p>The most basic problem-solving technique. It involves trying all possible combinations to find a solution. While often O(N²) or O(2^N), it is the essential first step in an interview before optimizing.</p>` },
  { id: "randomised-algos", title: "Randomised Algorithms", category: "Problem Solving", difficulty: "Intermediate", icon: "🎲", iconColor: "amber", summary: "Algorithms that use random numbers to decide what to do next.", readTime: "5 mins", details: `<h2>Randomised Algorithms</h2><p>Employs a degree of randomness as part of its logic. Example: Randomized QuickSort, which picks a random pivot to guarantee O(N log N) average time and avoid the O(N²) worst-case on sorted arrays.</p>` },
  { id: "two-pointers", title: "Two Pointer Technique", category: "Problem Solving", difficulty: "Intermediate", icon: "✌️", iconColor: "emerald", summary: "Using two indices to traverse an array, often reducing O(N²) to O(N).", readTime: "6 mins", details: `<h2>Two Pointer Technique</h2><p>Used for searching pairs in a sorted array (like Two Sum II) or reversing arrays. Pointers can move towards each other from opposite ends, or move in the same direction (like fast & slow pointers).</p>` },
  { id: "sliding-window", title: "Sliding Window", category: "Problem Solving", difficulty: "Intermediate", icon: "🖼️", iconColor: "purple", summary: "Creating a window over an array/string to solve subset/substring problems.", readTime: "6 mins", details: `<h2>Sliding Window</h2><p>A subset of the two-pointer technique. It involves maintaining a 'window' of elements (between a left and right pointer) that satisfies a certain condition. Used for problems like "Longest Substring Without Repeating Characters".</p>` }
];

export const newRoadmapPhases = [
  {
    label: "Phase 0 — Programming Fundamentals",
    nodes: ["language-syntax", "control-structures", "functions", "oop-basics", "pseudo-code"]
  },
  {
    label: "Phase 1 — Complexity & Basic Structures",
    nodes: ["big-o", "asymptotic-notation", "arrays", "strings"]
  },
  {
    label: "Phase 2 — Linear Data Structures",
    nodes: ["stack-queue", "linked-list", "hash-tables"]
  },
  {
    label: "Phase 3 — Sorting & Searching",
    nodes: ["searching", "bubble-sort", "insertion-sort", "selection-sort", "merge-sort-node", "quick-sort", "heap-sort"]
  },
  {
    label: "Phase 4 — Trees",
    nodes: ["trees-bst", "tree-traversal", "avl-trees", "b-trees", "tries"]
  },
  {
    label: "Phase 5 — Graphs",
    nodes: ["graphs", "directed-undirected", "dijkstra", "bellman-ford", "mst"]
  },
  {
    label: "Phase 6 — Advanced Data Structures",
    nodes: ["heaps", "segment-trees", "fenwick-trees", "disjoint-set", "suffix-trees"]
  },
  {
    label: "Phase 7 — Problem Solving Techniques",
    nodes: ["brute-force", "recursion-backtracking", "two-pointers", "sliding-window", "divide-conquer", "greedy", "dynamic-programming", "randomised-algos"]
  }
];
