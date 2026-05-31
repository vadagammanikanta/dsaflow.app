// Premium Curated Video & Resource Mapping (With Placement Analytics)
export const resourceLibrary = {
  // ── PHASE 0: PROGRAMMING FUNDAMENTALS ──
  "language-syntax": {
    youtubeId: "EAR7De6Goz4",
    creator: "Take U Forward",
    primaryLink: { title: "GeeksforGeeks Data Types Reference", url: "https://www.geeksforgeeks.org/c-data-types/" },
    additionalResources: [
      { title: "W3Schools Programming Syntax", url: "https://www.w3schools.com/" }
    ],
    placementRelevance: {
      patterns: ["Memory Allocation", "Data Type Ranges"],
      realWorldApp: "Selecting correct data types to prevent overflow bugs in aerospace, automotive, or financial software systems.",
      targetCompanies: ["Infosys", "Wipro", "TCS", "Cognizant"]
    }
  },
  "control-structures": {
    youtubeId: "EAR7De6Goz4",
    creator: "Take U Forward",
    primaryLink: { title: "LeetCode Fundamental Cards", url: "https://leetcode.com/explore/learn/" },
    additionalResources: [],
    placementRelevance: {
      patterns: ["Conditional Logic Branching", "Loop Invariants"],
      realWorldApp: "Routing client requests in web servers, implementing retry mechanisms, and filtering query datasets.",
      targetCompanies: ["Capgemini", "Accenture", "Infosys"]
    }
  },
  "functions": {
    youtubeId: "EAR7De6Goz4",
    creator: "Take U Forward",
    primaryLink: { title: "Javascript Info - Closures & Scope", url: "https://javascript.info/closure" },
    additionalResources: [],
    placementRelevance: {
      patterns: ["Stack Frame Execution", "Scope Isolation"],
      realWorldApp: "Writing modular event handlers in web apps, maintaining private state variables, and callback handling.",
      targetCompanies: ["Walmart", "HCL Tech", "Tech Mahindra"]
    }
  },
  "oop-basics": {
    youtubeId: "pTB0EiLXUC8",
    creator: "Programming with Mosh",
    primaryLink: { title: "Java OOP Concepts Guide", url: "https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/" },
    additionalResources: [],
    placementRelevance: {
      patterns: ["Encapsulation", "Polymorphism", "Inheritance", "Abstraction"],
      realWorldApp: "Structuring models in enterprise backend systems (Java/C#), designing extensible UI frameworks and widgets.",
      targetCompanies: ["Oracle", "Salesforce", "IBM"]
    }
  },
  "recursion-intro": {
    youtubeId: "yVdKa8dnKiE",
    creator: "Take U Forward",
    primaryLink: { title: "LeetCode Recursion Explore Card", url: "https://leetcode.com/explore/featured/card/recursion-i/" },
    additionalResources: [],
    placementRelevance: {
      patterns: ["Base Case Validation", "Call Stack Tracing"],
      realWorldApp: "Traversing hierarchical folders, parsing nested XML/JSON files, and writing backtracking solvers.",
      targetCompanies: ["Adobe", "Intuit", "PayPal"]
    }
  },

  // ── PHASE 1: ALGORITHMIC COMPLEXITY ──
  "big-o": {
    youtubeId: "BgLTDT03QtU", // Verified: NeetCode "Big-O Notation"
    creator: "NeetCode",
    primaryLink: { title: "Big-O Cheat Sheet Matrix", url: "https://www.bigocheatsheet.com/" },
    additionalResources: [
      { title: "Khan Academy: Asymptotic Bounds", url: "https://www.khanacademy.org/computing/computer-science/algorithms" }
    ],
    placementRelevance: {
      patterns: ["Time/Space Tradeoffs", "Amortized Analysis"],
      realWorldApp: "Deciding whether to use a Python List (O(N) search) or a Python Set (O(1) search) when handling millions of user records in a backend API.",
      targetCompanies: ["Google", "Meta", "Amazon"]
    }
  },
  "asymptotic-notation": {
    youtubeId: "AykYmp39A4M",
    creator: "Abdul Bari",
    primaryLink: { title: "Khan Academy Asymptotic Bounds", url: "https://www.khanacademy.org/computing/computer-science/algorithms" },
    additionalResources: [],
    placementRelevance: {
      patterns: ["Theta/Omega/O Bound analysis", "Growth rates"],
      realWorldApp: "Benchmarking microservices and database engines to guarantee strict SLA execution times under massive loads.",
      targetCompanies: ["Qualcomm", "NVIDIA", "Intel"]
    }
  },
  "arrays": {
    youtubeId: "37E9ckMDdTk", // Verified: Take U Forward Array Intro/Patterns
    creator: "Take U Forward",
    primaryLink: { title: "NeetCode 150 - Arrays & Hashing", url: "https://neetcode.io/practice" },
    additionalResources: [
      { title: "LeetCode: Top Interview 150", url: "https://leetcode.com/studyplan/top-interview-150/" }
    ],
    placementRelevance: {
      patterns: ["Sliding Window", "Two Pointers", "Prefix Sum"],
      realWorldApp: "Implementing image processing algorithms (2D Arrays) or managing continuous streams of stock market data in Java financial applications.",
      targetCompanies: ["Virtusa", "TCS Digital", "Microsoft", "Uber"]
    }
  },
  "strings": {
    youtubeId: "U13Tf-wz7vA",
    creator: "NeetCode",
    primaryLink: { title: "LeetCode String Interview Prep", url: "https://leetcode.com/tag/string/" },
    additionalResources: [],
    placementRelevance: {
      patterns: ["Substring Search", "Anagram Detection", "Sliding Window on Strings"],
      realWorldApp: "Building text editors, compiler parsers, search engine indexing, and validation filters.",
      targetCompanies: ["Amazon", "Bloomberg", "Netflix"]
    }
  },
  "searching": {
    youtubeId: "MHf6awe89xw",
    creator: "Take U Forward",
    primaryLink: { title: "Striver's Binary Search Index", url: "https://takeuforward.org/strivers-a2z-dsa-course/" },
    additionalResources: [],
    placementRelevance: {
      patterns: ["Binary Search", "Search Space Reduction"],
      realWorldApp: "Retrieving records from sorted database indices, locating numerical root thresholds in scientific calculators.",
      targetCompanies: ["Microsoft", "LinkedIn", "Uber"]
    }
  },

  // ── PHASE 2: LINEAR DATA STRUCTURES ──
  "stack-queue": {
    youtubeId: "lVFn7Yog-B0",
    creator: "NeetCode",
    primaryLink: { title: "GeeksforGeeks Stack Problems", url: "https://www.geeksforgeeks.org/stack-data-structure/" },
    additionalResources: [],
    placementRelevance: {
      patterns: ["Monotonic Stack", "FIFO/LIFO queue handling"],
      realWorldApp: "Implementing undo-redo systems, task queue schedulers, and network packet buffers.",
      targetCompanies: ["JPMorgan Chase", "Morgan Stanley", "Visa"]
    }
  },
  "linked-list": {
    youtubeId: "7LjQ57RqgEc", // Verified: Take U Forward "Middle of Linked List"
    creator: "Take U Forward",
    primaryLink: { title: "Visualgo: Linked List Visualization", url: "https://visualgo.net/en/list" },
    additionalResources: [
      { title: "LeetCode: Linked List Explore Card", url: "https://leetcode.com/explore/learn/card/linked-list/" }
    ],
    placementRelevance: {
      patterns: ["Fast & Slow Pointers (Tortoise and Hare)", "Dummy Node Technique", "In-place Reversal"],
      realWorldApp: "Managing browser history navigation, OS process allocations, and collision chaining in Hash Maps.",
      targetCompanies: ["Apple", "Amazon", "Goldman Sachs"]
    }
  },
  "hash-tables": {
    youtubeId: "zHi5v78W1f0",
    creator: "NeetCode",
    primaryLink: { title: "Visualgo Hash Table Visualization", url: "https://visualgo.net/en/hash-table" },
    additionalResources: [],
    placementRelevance: {
      patterns: ["Collision Resolution", "O(1) Hash Map lookup"],
      realWorldApp: "Caching heavy API responses, tracking user session tokens (Redis), and tracking lookup tables.",
      targetCompanies: ["Meta", "Twitter", "Amazon"]
    }
  },
  "heaps": {
    youtubeId: "HqPJF2M5hKU",
    creator: "Abdul Bari",
    primaryLink: { title: "NeetCode Heap Coding Roadmap", url: "https://neetcode.io/practice" },
    additionalResources: [],
    placementRelevance: {
      patterns: ["Min-Heap/Max-Heap priority extraction", "HeapSort"],
      realWorldApp: "Operating system priority scheduling, streaming analytics sorting, and network routing priority.",
      targetCompanies: ["Netflix", "Spotify", "Pinterest"]
    }
  },
  "matrices": {
    youtubeId: "Z0R2u6gd3GU",
    creator: "Take U Forward",
    primaryLink: { title: "LeetCode Matrix Tag", url: "https://leetcode.com/tag/matrix/" },
    additionalResources: [],
    placementRelevance: {
      patterns: ["2D Array Traversal", "Matrix Rotation"],
      realWorldApp: "Image pixel manipulation, graphic rendering algorithms, and spreadsheet cells storage.",
      targetCompanies: ["Intel", "Samsung", "Epic Games"]
    }
  },

  // ── PHASE 3: NON-LINEAR DATA STRUCTURES (TREES & GRAPHS) ──
  "trees-bst": {
    youtubeId: "ih50Uk7RvaY", // Verified: Take U Forward "Binary Trees Intro"
    creator: "Take U Forward",
    primaryLink: { title: "Striver's Tree Traversal Guide", url: "https://takeuforward.org/binary-tree/binary-tree-traversal-inorder-preorder-postorder/" },
    additionalResources: [
      { title: "GeeksforGeeks: Binary Search Tree", url: "https://www.geeksforgeeks.org/binary-search-tree-data-structure/" }
    ],
    placementRelevance: {
      patterns: ["Depth-First Search (DFS)", "Breadth-First Search (BFS)", "Top-Down / Bottom-Up Recursion"],
      realWorldApp: "Rendering the DOM tree in web browsers, organizing database file paths, and parsing XML/JSON structures.",
      targetCompanies: ["Microsoft", "Oracle", "Cisco"]
    }
  },
  "tree-traversal": {
    youtubeId: "jmy0lFOf6_4",
    creator: "NeetCode",
    primaryLink: { title: "Visualgo Binary Tree Traversal", url: "https://visualgo.net/en/bst" },
    additionalResources: [],
    placementRelevance: {
      patterns: ["Level Order BFS", "Pre/In/Postorder Traversals"],
      realWorldApp: "Parsing compiler Abstract Syntax Trees (AST), generating folder outline previews in file explorers.",
      targetCompanies: ["Apple", "Red Hat", "Microsoft"]
    }
  },
  "avl-trees": {
    youtubeId: "jDM6_VxOdI4",
    creator: "Abdul Bari",
    primaryLink: { title: "GeeksforGeeks AVL Tree In-Depth", url: "https://www.geeksforgeeks.org/avl-tree-set-1-insertion/" },
    additionalResources: [],
    placementRelevance: {
      patterns: ["Self-Balancing Rotation", "Strict O(log N) depth"],
      realWorldApp: "Designing robust file indexes, and real-time gaming databases containing massive frequent inserts.",
      targetCompanies: ["Oracle", "PostgreSQL", "MongoDB"]
    }
  },
  "tries": {
    youtubeId: "dBGUmUfwp0Y",
    creator: "Take U Forward",
    primaryLink: { title: "LeetCode Trie Explore Card", url: "https://leetcode.com/explore/learn/card/trie/" },
    additionalResources: [],
    placementRelevance: {
      patterns: ["Prefix Search", "Character Path Node Traversal"],
      realWorldApp: "Creating auto-complete search inputs, dictionary spell-checkers, and IP address routing maps.",
      targetCompanies: ["Google", "Baidu", "Yandex"]
    }
  },
  "graphs": {
    youtubeId: "Mhnclp_0bEc",
    creator: "Take U Forward",
    primaryLink: { title: "Striver's Comprehensive Graph Index", url: "https://takeuforward.org/graph/word-ladder-i-g-29/" },
    additionalResources: [],
    placementRelevance: {
      patterns: ["DFS on Graph", "BFS Shortest Path on unweighted edges"],
      realWorldApp: "Indexing package dependencies in build tools, crawling web documents, mapping social network circles.",
      targetCompanies: ["Meta", "LinkedIn", "GitHub"]
    }
  },

  // ── PHASE 4: ADVANCED ALGORITHMS ──
  "dynamic-programming": {
    youtubeId: "tyB0HaHpIVE", // Verified: Take U Forward "DP Introduction"
    creator: "Take U Forward",
    primaryLink: { title: "LeetCode: DP Patterns", url: "https://leetcode.com/explore/learn/card/dynamic-programming/" },
    additionalResources: [
      { title: "CP-Algorithms: DP Reference", url: "https://cp-algorithms.com/dynamic_programming/intro.html" }
    ],
    placementRelevance: {
      patterns: ["0/1 Knapsack", "Longest Common Subsequence", "Memoization vs Tabulation"],
      realWorldApp: "Optimizing text-diffing engines (like Git version control) or building spell-checking logic for search engines.",
      targetCompanies: ["Google", "Directi", "Atlassian"]
    }
  },
  "greedy": {
    youtubeId: "l8bWf_D7gS8",
    creator: "Take U Forward",
    primaryLink: { title: "GeeksforGeeks Greedy Algorithms", url: "https://www.geeksforgeeks.org/greedy-algorithms/" },
    additionalResources: [],
    placementRelevance: {
      patterns: ["Local Optimal Selection", "Sorting-Based Greedy choices"],
      realWorldApp: "Compacting files using Huffman Encoding, computing coin change returns, optimization layouts.",
      targetCompanies: ["Walmart", "Target", "Amazon"]
    }
  },
  "recursion-backtracking": {
    youtubeId: "RncrXWw67Sg",
    creator: "NeetCode",
    primaryLink: { title: "LeetCode Backtracking Section", url: "https://leetcode.com/tag/backtracking/" },
    additionalResources: [],
    placementRelevance: {
      patterns: ["Constraint Propagation", "Recursion state backtracking"],
      realWorldApp: "Solving constraint satisfaction tables, Sudoku solvers, game theory AI branching tree routes.",
      targetCompanies: ["Electronic Arts", "Epic Games", "Adobe"]
    }
  },
  "bit-manipulation": {
    youtubeId: "ZwU6wSkbAn0",
    creator: "Take U Forward",
    primaryLink: { title: "Hackerearth Bit Manipulation Tutorial", url: "https://www.hackerearth.com/practice/basic-programming/bit-manipulation/basics-of-bit-manipulation/tutorial/" },
    additionalResources: [],
    placementRelevance: {
      patterns: ["Bitwise Flags", "Bitmask Subsets"],
      realWorldApp: "Managing state masks in embedded microcontrollers, writing compression protocols, hashing keys.",
      targetCompanies: ["NVIDIA", "Qualcomm", "Intel"]
    }
  },
  "divide-conquer": {
    youtubeId: "rwXv8N_8AvI",
    creator: "Tushar Roy",
    primaryLink: { title: "CP-Algorithms Segment Tree Guide", url: "https://cp-algorithms.com/data_structures/segment_tree.html" },
    additionalResources: [],
    placementRelevance: {
      patterns: ["Merge Sort division", "Recursion Tree division"],
      realWorldApp: "Optimizing multi-core parallel sorting routines, rendering divide-and-conquer map sectors.",
      targetCompanies: ["Intel", "IBM", "AMD"]
    }
  },
  "range-queries": {
    youtubeId: "rwXv8N_8AvI",
    creator: "Tushar Roy",
    primaryLink: { title: "CP-Algorithms Segment Tree Guide", url: "https://cp-algorithms.com/data_structures/segment_tree.html" },
    additionalResources: [],
    placementRelevance: {
      patterns: ["Prefix Sums", "Query Splitting"],
      realWorldApp: "Calculating cumulative database analytics over custom date parameters.",
      targetCompanies: ["Bloomberg", "Citadel", "Jane Street"]
    }
  },

  // ── PHASE 5: ADVANCED DATA STRUCTURES ──
  "disjoint-set": {
    youtubeId: "wU6udHRIkcc", // Verified: Abdul Bari "Disjoint Sets"
    creator: "Abdul Bari",
    primaryLink: { title: "HackerEarth: Union-Find Basics", url: "https://www.hackerearth.com/practice/notes/disjoint-set-union-union-find/" },
    additionalResources: [
      { title: "LeetCode: Graph Valid Tree", url: "https://leetcode.com/problems/graph-valid-tree/" }
    ],
    placementRelevance: {
      patterns: ["Path Compression", "Union by Rank/Size"],
      realWorldApp: "Detecting cycles in network routing protocols, grouping connected components in social networks (e.g., 'People you may know').",
      targetCompanies: ["LinkedIn", "Meta", "Amazon"]
    }
  },
  "segment-tree": {
    youtubeId: "-dZmQZIp-W8",
    creator: "Take U Forward",
    primaryLink: { title: "GeeksforGeeks Segment Tree Set-1", url: "https://www.geeksforgeeks.org/segment-tree-set-1-sum-of-given-range/" },
    additionalResources: [],
    placementRelevance: {
      patterns: ["O(log N) Dynamic Range Queries", "Lazy Propagation"],
      realWorldApp: "Real-time stock price analysis over custom date intervals, managing dynamic geographic grids.",
      targetCompanies: ["Bloomberg", "Citadel", "Jane Street"]
    }
  },
  "fenwick-tree": {
    youtubeId: "v_wj_mOAlig",
    creator: "Tushar Roy",
    primaryLink: { title: "Topcoder BIT Tutorial Documentation", url: "https://www.topcoder.com/thrive/articles/Binary%20Indexed%20Trees" },
    additionalResources: [],
    placementRelevance: {
      patterns: ["Binary Indexed updates", "Prefix sum dynamic tracking"],
      realWorldApp: "Calculating running sales metrics, managing coordinate tracking logs in real-time game loops.",
      targetCompanies: ["Goldman Sachs", "Square Enix", "Google"]
    }
  },
  "lru-cache": {
    youtubeId: "7Vf5G1bUcAs",
    creator: "NeetCode",
    primaryLink: { title: "LeetCode LRU Cache System Design Problem", url: "https://leetcode.com/problems/lru-cache/" },
    additionalResources: [],
    placementRelevance: {
      patterns: ["Hash Map + Doubly Linked List integration", "O(1) eviction policy"],
      realWorldApp: "Speeding up database load times via web application caches, managing memory swap sectors in OS.",
      targetCompanies: ["Meta", "Amazon", "Uber"]
    }
  },
  "bitwise-trie": {
    youtubeId: "EIhxDZW6EG8",
    creator: "Take U Forward",
    primaryLink: { title: "GeeksforGeeks Maximum XOR Array Problems", url: "https://www.geeksforgeeks.org/maximum-xor-of-two-numbers-in-an-array/" },
    additionalResources: [],
    placementRelevance: {
      patterns: ["Binary bit tracking in Trie", "XOR maximization"],
      realWorldApp: "Building fast cryptographic hashes and routing dynamic internet traffic (IP prefixes).",
      targetCompanies: ["Cisco", "Cloudflare", "Akamai"]
    }
  },

  // ── PHASE 6: ADVANCED GRAPHS ──
  "dijkstra-algo": {
    youtubeId: "V6H1qAeB-l4", // Verified: Take U Forward "Dijkstra's Algorithm"
    creator: "Take U Forward",
    primaryLink: { title: "Visualgo: Shortest Path", url: "https://visualgo.net/en/sssp" },
    additionalResources: [
      { title: "NeetCode: Network Delay Time", url: "https://neetcode.io/problems/network-delay-time" }
    ],
    placementRelevance: {
      patterns: ["Priority Queue / Min-Heap Integration", "Greedy Pathfinding"],
      realWorldApp: "Calculating ETAs and shortest routes in Google Maps, or routing data packets efficiently through IP networks.",
      targetCompanies: ["Uber", "Google", "Swiggy"]
    }
  },
  "bellman-ford": {
    youtubeId: "0vVofAhAYjc",
    creator: "Take U Forward",
    primaryLink: { title: "CP-Algorithms Bellman-Ford Reference", url: "https://cp-algorithms.com/graph/bellman_ford.html" },
    additionalResources: [],
    placementRelevance: {
      patterns: ["Negative weight relaxation", "Negative cycle detection"],
      realWorldApp: "Detecting currency arbitrage opportunities in financial markets, routing internet packets dynamically.",
      targetCompanies: ["Bloomberg", "Citadel", "HSBC"]
    }
  },
  "floyd-warshall": {
    youtubeId: "YbY8cVwWSvU",
    creator: "Take U Forward",
    primaryLink: { title: "GeeksforGeeks Floyd-Warshall Comprehensive", url: "https://www.geeksforgeeks.org/floyd-warshall-algorithm-dp-16/" },
    additionalResources: [],
    placementRelevance: {
      patterns: ["All-pairs shortest path", "Dynamic Programming on Graphs"],
      realWorldApp: "Calculating route matrix tables for ride-hailing maps, evaluating network topology connectivity.",
      targetCompanies: ["Uber", "Lyft", "Google"]
    }
  },
  "kruskal-mst": {
    youtubeId: "DMnDM_I06-4",
    creator: "Take U Forward",
    primaryLink: { title: "LeetCode Min Cost to Connect All Points", url: "https://leetcode.com/problems/min-cost-to-connect-all-points/" },
    additionalResources: [],
    placementRelevance: {
      patterns: ["Greedy Edge Sorting", "Disjoint-Set (Union-Find) Integration"],
      realWorldApp: "Designing physical layouts for electric power grids, computer networks, and pipe systems at minimal cost.",
      targetCompanies: ["Cisco", "Tesla", "General Electric"]
    }
  },
  "prim-mst": {
    youtubeId: "mJcZgoaKnZg",
    creator: "Take U Forward",
    primaryLink: { title: "Visualgo MST Visual Animations", url: "https://visualgo.net/en/mst" },
    additionalResources: [],
    placementRelevance: {
      patterns: ["Min-Heap node exploration", "Greedy cut property"],
      realWorldApp: "Optimizing fiber optic cable layout routes, building minimum spans in computer graphics grids.",
      targetCompanies: ["Google", "Microsoft", "Intel"]
    }
  }
};
