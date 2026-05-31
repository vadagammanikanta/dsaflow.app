// resource_library.js
// ═══════════════════════════════════════════════════════════════════════════
//  Premium Curated Video & Resource Mapping (With Placement Analytics)
// ═══════════════════════════════════════════════════════════════════════════

export const resourceLibrary = {
  // ── PHASE 0: PROGRAMMING FUNDAMENTALS ──
  "language-syntax": {
    youtubeId: "EAR7De6Goz4",
    creator: "Take U Forward",
    primaryLink: { title: "C++ Data Types Reference", url: "https://www.geeksforgeeks.org/c-data-types/" },
    additionalResources: [
      { title: "Java Primitive Data Types", url: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html" },
      { title: "Python Type Casting", url: "https://www.w3schools.com/python/python_casting.asp" }
    ],
    placementRelevance: {
      patterns: ["Type Overflows", "Precision Loss", "Bit Limitations"],
      realWorldApp: "Preventing catastrophic integer overflows in banking systems or spacecraft navigation software (e.g., the Ariane 5 rocket crash).",
      targetCompanies: ["TCS", "Infosys", "Wipro", "Cognizant"]
    }
  },
  "control-structures": {
    youtubeId: "bSrm9RXwBaI",
    creator: "Neso Academy",
    primaryLink: { title: "LeetCode: Introduction to Flow Control", url: "https://leetcode.com/explore/learn/" },
    additionalResources: [
      { title: "MDN: Loops and Iteration", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration" }
    ],
    placementRelevance: {
      patterns: ["Infinite Loops", "Break/Continue Optimization"],
      realWorldApp: "Writing event-listeners that constantly wait for user input without crashing the main UI thread.",
      targetCompanies: ["Accenture", "Capgemini", "IBM"]
    }
  },
  "functions": {
    youtubeId: "M6H-gqO-qjw",
    creator: "Neso Academy",
    primaryLink: { title: "JavaScript.info: Functions & Scope", url: "https://javascript.info/function-basics" },
    additionalResources: [
      { title: "GeeksforGeeks: Pass by Value vs Reference", url: "https://www.geeksforgeeks.org/pass-by-value-and-pass-by-reference-in-c/" }
    ],
    placementRelevance: {
      patterns: ["Helper Functions", "Modularization", "Scope Closures"],
      realWorldApp: "Designing reusable UI components in React or encapsulating database queries in backend architectures.",
      targetCompanies: ["Zoho", "Freshworks", "Mindtree"]
    }
  },
  "oop-basics": {
    youtubeId: "pTB0EiLXUC8",
    creator: "Programming with Mosh",
    primaryLink: { title: "GeeksforGeeks: 4 Pillars of OOP", url: "https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/" },
    additionalResources: [
      { title: "Educative: OOP Interview Questions", url: "https://www.educative.io/blog/object-oriented-programming-interview-questions" }
    ],
    placementRelevance: {
      patterns: ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction"],
      realWorldApp: "Modeling real-world entities in E-Commerce platforms (e.g., treating 'User', 'Admin', and 'Guest' as inherited classes).",
      targetCompanies: ["Amazon", "Oracle", "SAP", "Salesforce"]
    }
  },
  "recursion-intro": {
    youtubeId: "yVdKa8dnKiE",
    creator: "Take U Forward",
    primaryLink: { title: "LeetCode: Recursion I", url: "https://leetcode.com/explore/featured/card/recursion-i/" },
    additionalResources: [
      { title: "FreeCodeCamp: Recursion in Programming", url: "https://www.freecodecamp.org/news/how-recursion-works-explained-with-flowcharts-and-a-video-de61f40cb7f9/" }
    ],
    placementRelevance: {
      patterns: ["Base Case Identification", "Call Stack Visualization"],
      realWorldApp: "Parsing complex XML/JSON data structures and traversing nested folder directories in an Operating System.",
      targetCompanies: ["Microsoft", "Google", "Atlassian"]
    }
  },

  // ── PHASE 1: ALGORITHMIC COMPLEXITY ──
  "big-o": {
    youtubeId: "BgLTDT03QtU",
    creator: "NeetCode",
    primaryLink: { title: "Big-O Cheat Sheet Matrix", url: "https://www.bigocheatsheet.com/" },
    additionalResources: [
      { title: "Khan Academy: Asymptotic Bounds", url: "https://www.khanacademy.org/computing/computer-science/algorithms" }
    ],
    placementRelevance: {
      patterns: ["Time/Space Tradeoffs", "Amortized Analysis", "In-Place Algorithms"],
      realWorldApp: "Deciding whether to use a List (O(N) search) or a Hash Set (O(1) search) when querying millions of user records in a high-traffic API.",
      targetCompanies: ["Google", "Meta", "Amazon", "Netflix"]
    }
  },
  "asymptotic-notation": {
    youtubeId: "AykYmp39A4M",
    creator: "Abdul Bari",
    primaryLink: { title: "GeeksforGeeks: Analysis of Algorithms", url: "https://www.geeksforgeeks.org/analysis-of-algorithms-set-1-asymptotic-analysis/" },
    additionalResources: [
      { title: "Brilliant: Big-Omega and Big-Theta", url: "https://brilliant.org/wiki/big-omega-and-big-theta/" }
    ],
    placementRelevance: {
      patterns: ["Best/Average/Worst Case Scenarios"],
      realWorldApp: "Predicting server load spikes and ensuring software runs smoothly even when inputs hit worst-case permutations.",
      targetCompanies: ["Goldman Sachs", "Morgan Stanley", "Intuit"]
    }
  },
  "arrays": {
    youtubeId: "3OamzN90kPg",
    creator: "NeetCode",
    primaryLink: { title: "NeetCode 150: Arrays & Hashing", url: "https://neetcode.io/practice" },
    additionalResources: [
      { title: "LeetCode: Top Interview 150", url: "https://leetcode.com/studyplan/top-interview-150/" },
      { title: "Take U Forward: Arrays Index", url: "https://takeuforward.org/arrays/data-structure-array-problems/" }
    ],
    placementRelevance: {
      patterns: ["Sliding Window", "Prefix Sum", "Two Pointers", "Kadane's Algorithm"],
      realWorldApp: "Processing pixel data in image editors (2D arrays) and maintaining continuous buffers for video streaming.",
      targetCompanies: ["Microsoft", "Uber", "Apple", "Virtusa"]
    }
  },
  "strings": {
    youtubeId: "wiGpQwD34H4",
    creator: "NeetCode",
    primaryLink: { title: "LeetCode: String Manipulation Problems", url: "https://leetcode.com/tag/string/" },
    additionalResources: [
      { title: "HackerEarth: String Algorithms", url: "https://www.hackerearth.com/practice/algorithms/string-algorithm/basics-of-string-manipulation/tutorial/" }
    ],
    placementRelevance: {
      patterns: ["Anagram Grouping", "Palindromic Substrings", "KMP Algorithm"],
      realWorldApp: "Developing DNA sequencing logic in bioinformatics or building spell-checking and plagiarism detection engines.",
      targetCompanies: ["Amazon", "Cisco", "Adobe"]
    }
  },
  "searching": {
    youtubeId: "MHf6awe89xw",
    creator: "Take U Forward",
    primaryLink: { title: "Striver's Binary Search Index", url: "https://takeuforward.org/strivers-a2z-dsa-course/" },
    additionalResources: [
      { title: "LeetCode: Binary Search Explore Card", url: "https://leetcode.com/explore/learn/card/binary-search/" }
    ],
    placementRelevance: {
      patterns: ["Search on Answer Space", "Rotated Sorted Arrays", "Finding Lower/Upper Bounds"],
      realWorldApp: "Rapidly querying auto-complete suggestions and narrowing down log files when debugging large-scale server crashes.",
      targetCompanies: ["Google", "Directi", "Flipkart"]
    }
  },

  // ── PHASE 2: LINEAR DATA STRUCTURES ──
  "stack-queue": {
    youtubeId: "I5IilX_b-1w",
    creator: "NeetCode",
    primaryLink: { title: "GeeksforGeeks: Stack Data Structure", url: "https://www.geeksforgeeks.org/stack-data-structure/" },
    additionalResources: [
      { title: "Visualgo: Stack & Queue", url: "https://visualgo.net/en/list" }
    ],
    placementRelevance: {
      patterns: ["Monotonic Stack", "Next Greater Element", "Parenthesis Matching"],
      realWorldApp: "Implementing 'Undo/Redo' functionality in IDEs (Stacks) and managing print task spoolers or web server request lines (Queues).",
      targetCompanies: ["Microsoft", "Paypal", "Visa"]
    }
  },
  "linked-list": {
    youtubeId: "G0_I-ZF0S38",
    creator: "NeetCode",
    primaryLink: { title: "LeetCode: Linked List Path", url: "https://leetcode.com/explore/learn/card/linked-list/" },
    additionalResources: [
      { title: "Take U Forward: Linked List Complete Logic", url: "https://takeuforward.org/linked-list/linked-list-introduction/" }
    ],
    placementRelevance: {
      patterns: ["Fast & Slow Pointers (Tortoise/Hare)", "In-Place Reversal", "Dummy Nodes"],
      realWorldApp: "Managing dynamic memory allocation in C/C++ and enabling forward/backward navigation in web browsers.",
      targetCompanies: ["Amazon", "Qualcomm", "Nvidia"]
    }
  },
  "hash-tables": {
    youtubeId: "zHi5v78W1f0",
    creator: "NeetCode",
    primaryLink: { title: "Visualgo: Hash Table Visualization", url: "https://visualgo.net/en/hashtable" },
    additionalResources: [
      { title: "HackerEarth: Hash Table Operations", url: "https://www.hackerearth.com/practice/data-structures/hash-tables/basics-of-hash-tables/tutorial/" }
    ],
    placementRelevance: {
      patterns: ["Frequency Maps", "Collision Chaining", "Rolling Hashes"],
      realWorldApp: "Powering Redis in-memory databases, DNS IP lookups, and session management in web applications.",
      targetCompanies: ["Meta", "Stripe", "Airbnb"]
    }
  },
  "heaps": {
    youtubeId: "HqPJF2M5hKU",
    creator: "Abdul Bari",
    primaryLink: { title: "NeetCode: Heap / Priority Queue Problems", url: "https://neetcode.io/practice" },
    additionalResources: [
      { title: "GeeksforGeeks: Heap Data Structure", url: "https://www.geeksforgeeks.org/heap-data-structure/" }
    ],
    placementRelevance: {
      patterns: ["Top K Elements", "Merge K Sorted Arrays", "Median Finding"],
      realWorldApp: "Scheduling operating system threads by priority and implementing Dijkstra's algorithm efficiently.",
      targetCompanies: ["Uber", "LinkedIn", "Twitter"]
    }
  },
  "matrices": {
    youtubeId: "Z0R2u6gd3GU",
    creator: "Take U Forward",
    primaryLink: { title: "LeetCode: Matrix Interview Questions", url: "https://leetcode.com/tag/matrix/" },
    additionalResources: [
      { title: "Techie Delight: Matrix Problems", url: "https://www.techiedelight.com/matrix-interview-questions/" }
    ],
    placementRelevance: {
      patterns: ["Spiral Traversal", "In-Place 90-Degree Rotation", "BFS/DFS on Grids"],
      realWorldApp: "Creating board games (like Chess or Battleship), geographic mapping systems, and cellular automata simulations.",
      targetCompanies: ["EA Games", "Samsung", "Oracle"]
    }
  },

  // ── PHASE 3: NON-LINEAR DATA STRUCTURES (TREES & GRAPHS) ──
  "trees-bst": {
    youtubeId: "OnSn2XEQ4MY",
    creator: "NeetCode",
    primaryLink: { title: "Striver's Binary Tree Index Sheet", url: "https://takeuforward.org/binary-tree/binary-tree-traversal-inorder-preorder-postorder/" },
    additionalResources: [
      { title: "LeetCode: Introduction to Data Structure - Tree", url: "https://leetcode.com/explore/learn/card/data-structure-tree/" }
    ],
    placementRelevance: {
      patterns: ["Lowest Common Ancestor", "Tree Serialization", "Depth/Diameter Checks"],
      realWorldApp: "Rendering HTML/XML Document Object Models (DOM) and structuring hierarchical file systems.",
      targetCompanies: ["Google", "Amazon", "VMware"]
    }
  },
  "tree-traversal": {
    youtubeId: "jmy0lFOf6_4",
    creator: "NeetCode",
    primaryLink: { title: "Visualgo: BST Traversals", url: "https://visualgo.net/en/bst" },
    additionalResources: [
      { title: "GeeksforGeeks: Tree Traversals", url: "https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/" }
    ],
    placementRelevance: {
      patterns: ["Iterative Traversals (using Stack)", "Level Order (BFS)", "Morris Traversal (O(1) space)"],
      realWorldApp: "Evaluating mathematical expression trees and compiling syntax trees in language compilers (like V8 or GCC).",
      targetCompanies: ["Microsoft", "Cisco", "Intel"]
    }
  },
  "avl-trees": {
    youtubeId: "jDM6_VxOdI4",
    creator: "Abdul Bari",
    primaryLink: { title: "GeeksforGeeks: AVL Tree Overview", url: "https://www.geeksforgeeks.org/avl-tree-set-1-insertion/" },
    additionalResources: [
      { title: "Baeldung: AVL Trees in Java", url: "https://www.baeldung.com/java-avl-trees" }
    ],
    placementRelevance: {
      patterns: ["Self-Balancing Logic", "Left-Right / Right-Left Rotations"],
      realWorldApp: "Ensuring database queries remain strictly O(log N) regardless of how sequential data is inserted into the table index.",
      targetCompanies: ["Oracle", "IBM", "SAP"]
    }
  },
  "tries": {
    youtubeId: "oobHOYngOJM",
    creator: "NeetCode",
    primaryLink: { title: "LeetCode: Explore Tries", url: "https://leetcode.com/explore/learn/card/trie/" },
    additionalResources: [
      { title: "HackerEarth: Trie Tutorial", url: "https://www.hackerearth.com/practice/data-structures/advanced-data-structures/trie-keyword-tree/tutorial/" }
    ],
    placementRelevance: {
      patterns: ["Prefix Matching", "Word Search II", "Lexicographical Sorting"],
      realWorldApp: "Powering Google search autocomplete, router IP prefix matching, and mobile T9 predictive text keyboards.",
      targetCompanies: ["Google", "Apple", "Yelp"]
    }
  },
  "graphs": {
    youtubeId: "cUUliAMVKcg",
    creator: "NeetCode",
    primaryLink: { title: "Take U Forward: Graph Algorithms", url: "https://takeuforward.org/graph/word-ladder-i-g-29/" },
    additionalResources: [
      { title: "LeetCode: Graph Valid Tree", url: "https://leetcode.com/explore/featured/card/graph/" }
    ],
    placementRelevance: {
      patterns: ["Topological Sort", "Bipartite Checking", "Cycle Detection", "Multi-Source BFS"],
      realWorldApp: "Mapping friends of friends in social networks, scheduling dependent background jobs, and optimizing GPS navigation.",
      targetCompanies: ["Meta", "Uber", "Swiggy", "Zomato"]
    }
  },

  // ── PHASE 4: ADVANCED ALGORITHMS ──
  "dynamic-programming": {
    youtubeId: "73r3KWiEvyk",
    creator: "NeetCode",
    primaryLink: { title: "LeetCode: Dynamic Programming Card", url: "https://leetcode.com/explore/learn/card/dynamic-programming/" },
    additionalResources: [
      { title: "CP-Algorithms: DP Introduction", url: "https://cp-algorithms.com/dynamic_programming/intro.html" },
      { title: "Abdul Bari: 0/1 Knapsack", url: "https://www.youtube.com/watch?v=8LusJS5-OUo" }
    ],
    placementRelevance: {
      patterns: ["1D/2D Memoization", "Knapsack Variations", "Longest Common Subsequence", "State Transitions"],
      realWorldApp: "Diffing source code files (Git), DNA sequence alignment in biology, and optimizing resource allocation in cloud computing.",
      targetCompanies: ["Google", "Directi", "Atlassian", "DE Shaw"]
    }
  },
  "greedy": {
    youtubeId: "l8bWf_D7gS8",
    creator: "Take U Forward",
    primaryLink: { title: "GeeksforGeeks: Greedy Algorithms", url: "https://www.geeksforgeeks.org/greedy-algorithms/" },
    additionalResources: [
      { title: "HackerEarth: Greedy Strategies", url: "https://www.hackerearth.com/practice/algorithms/greedy/basics-of-greedy-algorithms/tutorial/" }
    ],
    placementRelevance: {
      patterns: ["Interval Scheduling", "Huffman Coding", "Activity Selection"],
      realWorldApp: "Compressing files into ZIP archives (Huffman Coding) and minimizing latency in packet routing.",
      targetCompanies: ["Amazon", "Cisco", "Walmart Global Tech"]
    }
  },
  "recursion-backtracking": {
    youtubeId: "pfiQ_PS1g8E",
    creator: "NeetCode",
    primaryLink: { title: "LeetCode: Backtracking Tag", url: "https://leetcode.com/tag/backtracking/" },
    additionalResources: [
      { title: "GeeksforGeeks: Backtracking Intro", url: "https://www.geeksforgeeks.org/backtracking-algorithms/" }
    ],
    placementRelevance: {
      patterns: ["Combinations & Permutations", "Subsets", "State Reversion (Undo)"],
      realWorldApp: "Solving constraint satisfaction problems like Sudoku, optimizing delivery truck packings, and generating cryptographic keys.",
      targetCompanies: ["Microsoft", "Palantir", "Expedia"]
    }
  },
  "bit-manipulation": {
    youtubeId: "ZwU6wSkbAn0",
    creator: "Take U Forward",
    primaryLink: { title: "HackerEarth: Bit Manipulation Magic", url: "https://www.hackerearth.com/practice/basic-programming/bit-manipulation/basics-of-bit-manipulation/tutorial/" },
    additionalResources: [
      { title: "LeetCode: Bitwise Problems", url: "https://leetcode.com/tag/bit-manipulation/" }
    ],
    placementRelevance: {
      patterns: ["XOR Cancellations", "Bit Masking", "Checking Powers of 2"],
      realWorldApp: "Writing low-level device drivers, compressing network headers, and implementing high-speed cryptographic hashing.",
      targetCompanies: ["Nvidia", "Intel", "AMD", "Qualcomm"]
    }
  },
  "divide-conquer": {
    youtubeId: "AykYmp39A4M",
    creator: "Abdul Bari",
    primaryLink: { title: "Khan Academy: Divide and Conquer", url: "https://www.khanacademy.org/computing/computer-science/algorithms/merge-sort/a/divide-and-conquer" },
    additionalResources: [
      { title: "GeeksforGeeks: D&C Patterns", url: "https://www.geeksforgeeks.org/divide-and-conquer-algorithm-introduction/" }
    ],
    placementRelevance: {
      patterns: ["Merge Sort Logic", "Quick Select for Kth Largest", "Master Theorem"],
      realWorldApp: "Executing fast Fourier transforms for audio processing and handling massive database sorting in parallel clusters.",
      targetCompanies: ["Google", "Bloomberg", "Goldman Sachs"]
    }
  },

  // ── PHASE 5: ADVANCED DATA STRUCTURES ──
  "disjoint-set": {
    youtubeId: "wU6udHRIkcc",
    creator: "Abdul Bari",
    primaryLink: { title: "HackerEarth: Union-Find Basics", url: "https://www.hackerearth.com/practice/notes/disjoint-set-union-union-find/" },
    additionalResources: [
      { title: "CP-Algorithms: DSU", url: "https://cp-algorithms.com/data_structures/disjoint_set_union.html" }
    ],
    placementRelevance: {
      patterns: ["Path Compression", "Union by Rank/Size", "Dynamic Connectivity"],
      realWorldApp: "Detecting cycles in large scale power grids and grouping connected user components in social networks.",
      targetCompanies: ["Meta", "Amazon", "LinkedIn"]
    }
  },
  "segment-tree": {
    youtubeId: "-dZmQZIp-W8",
    creator: "Take U Forward",
    primaryLink: { title: "CP-Algorithms: Segment Trees", url: "https://cp-algorithms.com/data_structures/segment_tree.html" },
    additionalResources: [
      { title: "GeeksforGeeks: Segment Tree Fundamentals", url: "https://www.geeksforgeeks.org/segment-tree-set-1-sum-of-given-range/" }
    ],
    placementRelevance: {
      patterns: ["Range Sum/Min/Max Queries", "Lazy Propagation", "Point Updates"],
      realWorldApp: "Handling real-time analytics dashboards (like calculating total ad clicks over arbitrary time windows instantly).",
      targetCompanies: ["Google", "Rubrik", "Tower Research"]
    }
  },
  "fenwick-tree": {
    youtubeId: "v_wj_mOAlig",
    creator: "Tushar Roy",
    primaryLink: { title: "Topcoder: Binary Indexed Trees", url: "https://www.topcoder.com/thrive/articles/Binary%20Indexed%20Trees" },
    additionalResources: [
      { title: "CP-Algorithms: Fenwick Tree", url: "https://cp-algorithms.com/data_structures/fenwick.html" }
    ],
    placementRelevance: {
      patterns: ["Bitwise Indexing", "Prefix Sums with Updates", "O(N) Memory Trees"],
      realWorldApp: "Used in competitive programming and memory-constrained embedded systems needing fast cumulative frequency counts.",
      targetCompanies: ["CodeNation", "Sprinklr", "Media.net"]
    }
  },
  "lru-cache": {
    youtubeId: "7Vf5G1bUcAs",
    creator: "NeetCode",
    primaryLink: { title: "LeetCode: LRU Cache Challenge", url: "https://leetcode.com/problems/lru-cache/" },
    additionalResources: [
      { title: "System Design: Caching Basics", url: "https://github.com/donnemartin/system-design-primer#cache" }
    ],
    placementRelevance: {
      patterns: ["Hash Map + Doubly Linked List Combination", "O(1) Data Eviction"],
      realWorldApp: "System architecture for memcached, database query caching, and CPU memory caches.",
      targetCompanies: ["Netflix", "Amazon", "Stripe", "Dropbox"]
    }
  },
  "bitwise-trie": {
    youtubeId: "EIhxDZW6EG8",
    creator: "Take U Forward",
    primaryLink: { title: "GeeksforGeeks: Maximum XOR Array Problems", url: "https://www.geeksforgeeks.org/maximum-xor-of-two-numbers-in-an-array/" },
    additionalResources: [
      { title: "LeetCode: Maximum XOR", url: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/" }
    ],
    placementRelevance: {
      patterns: ["Bit-level Traversal", "Greedy XOR Maximization"],
      realWorldApp: "Advanced packet routing algorithms and low-level telecommunications data processing.",
      targetCompanies: ["Cisco", "Juniper Networks", "Arista"]
    }
  },

  // ── PHASE 6: ADVANCED GRAPHS ──
  "dijkstra-algo": {
    youtubeId: "V6H1qAeB-l4",
    creator: "Take U Forward",
    primaryLink: { title: "Visualgo: Single-Source Shortest Path", url: "https://visualgo.net/en/sssp" },
    additionalResources: [
      { title: "NeetCode: Network Delay Time", url: "https://neetcode.io/problems/network-delay-time" }
    ],
    placementRelevance: {
      patterns: ["Min-Heap Integration", "Greedy Graph Traversal", "Non-Negative Relaxations"],
      realWorldApp: "Calculating ETAs and shortest routes in Google Maps, and routing data packets efficiently via OSPF in IP networks.",
      targetCompanies: ["Uber", "Google", "Lyft", "Swiggy"]
    }
  },
  "bellman-ford": {
    youtubeId: "0vVofAhAYjc",
    creator: "Take U Forward",
    primaryLink: { title: "CP-Algorithms: Bellman-Ford", url: "https://cp-algorithms.com/graph/bellman_ford.html" },
    additionalResources: [
      { title: "GeeksforGeeks: Bellman-Ford DP", url: "https://www.geeksforgeeks.org/bellman-ford-algorithm-dp-23/" }
    ],
    placementRelevance: {
      patterns: ["Negative Weight Cycles", "Edge Relaxation (V-1 Times)"],
      realWorldApp: "Used in distance-vector routing protocols (like RIP) and detecting arbitrage opportunities in foreign exchange financial markets.",
      targetCompanies: ["Morgan Stanley", "Bloomberg", "Two Sigma"]
    }
  },
  "floyd-warshall": {
    youtubeId: "YbY8cVwWSvU",
    creator: "Take U Forward",
    primaryLink: { title: "GeeksforGeeks: Floyd-Warshall", url: "https://www.geeksforgeeks.org/floyd-warshall-algorithm-dp-16/" },
    additionalResources: [
      { title: "LeetCode: Find the City with the Smallest Number of Neighbors", url: "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/" }
    ],
    placementRelevance: {
      patterns: ["All-Pairs Shortest Path", "Adjacency Matrix DP", "O(V³) Graph Traversal"],
      realWorldApp: "Pre-computing network reachability matrices for fast infrastructure analytics.",
      targetCompanies: ["Akamai", "Cloudflare", "Microsoft"]
    }
  },
  "kruskal-mst": {
    youtubeId: "DMnDM_I06-4",
    creator: "Take U Forward",
    primaryLink: { title: "LeetCode: Min Cost to Connect All Points", url: "https://leetcode.com/problems/min-cost-to-connect-all-points/" },
    additionalResources: [
      { title: "Visualgo: MST Algorithms", url: "https://visualgo.net/en/mst" }
    ],
    placementRelevance: {
      patterns: ["Edge Sorting", "Cycle Prevention with DSU", "Greedy Spanning"],
      realWorldApp: "Laying out telecommunication network cables and electrical grids with the absolute minimum amount of copper wire.",
      targetCompanies: ["Amazon", "Samsung", "National Instruments"]
    }
  },
  "prim-mst": {
    youtubeId: "mJcZgoaKnZg",
    creator: "Take U Forward",
    primaryLink: { title: "CP-Algorithms: Prim's Algorithm", url: "https://cp-algorithms.com/graph/mst_prim.html" },
    additionalResources: [
      { title: "GeeksforGeeks: Prim's MST", url: "https://www.geeksforgeeks.org/prims-minimum-spanning-tree-mst-greedy-algo-5/" }
    ],
    placementRelevance: {
      patterns: ["Node-Centric Spanning", "Priority Queue Implementation"],
      realWorldApp: "Generating mazes in game development and performing optimal cluster analysis in machine learning algorithms.",
      targetCompanies: ["EA Games", "Nvidia", "TCS Digital"]
    }
  }
};
