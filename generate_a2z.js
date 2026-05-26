import fs from 'fs';

const patternsData = [
  {
    num: 1,
    name: "Rectangular Star Pattern",
    visual: `* * * * *<br>* * * * *<br>* * * * *<br>* * * * *`,
    formula: "Outer loop runs N times. Inner loop runs N times, printing stars.",
    code: `// C++ Implementation
void printPattern(int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cout << "* ";
        }
        cout << endl;
    }
}`
  },
  {
    num: 2,
    name: "Right-Angled Triangle Pattern",
    visual: `*<br>* *<br>* * *<br>* * * *<br>* * * * *`,
    formula: "Row i (0-indexed) has i+1 stars printed.",
    code: `// C++ Implementation
void printPattern(int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j <= i; j++) {
            cout << "* ";
        }
        cout << endl;
    }
}`
  },
  {
    num: 3,
    name: "Right-Angled Number Triangle",
    visual: `1<br>1 2<br>1 2 3<br>1 2 3 4<br>1 2 3 4 5`,
    formula: "Row i prints numbers starting from 1 to i+1.",
    code: `// C++ Implementation
void printPattern(int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 1; j <= i + 1; j++) {
            cout << j << " ";
        }
        cout << endl;
    }
}`
  },
  {
    num: 4,
    name: "Right-Angled Number Triangle II",
    visual: `1<br>2 2<br>3 3 3<br>4 4 4 4<br>5 5 5 5 5`,
    formula: "Row i prints the value (i+1), (i+1) times.",
    code: `// C++ Implementation
void printPattern(int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j <= i; j++) {
            cout << i + 1 << " ";
        }
        cout << endl;
    }
}`
  },
  {
    num: 5,
    name: "Inverted Right-Angled Triangle",
    visual: `* * * * *<br>* * * *<br>* * *<br>* *<br>*`,
    formula: "Row i has N-i stars printed.",
    code: `// C++ Implementation
void printPattern(int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i; j++) {
            cout << "* ";
        }
        cout << endl;
    }
}`
  },
  {
    num: 6,
    name: "Inverted Number Triangle",
    visual: `1 2 3 4 5<br>1 2 3 4<br>1 2 3<br>1 2<br>1`,
    formula: "Row i prints numbers starting from 1 to N-i.",
    code: `// C++ Implementation
void printPattern(int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 1; j <= n - i; j++) {
            cout << j << " ";
        }
        cout << endl;
    }
}`
  },
  {
    num: 7,
    name: "Star Pyramid",
    visual: `&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;***&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;*****&nbsp;&nbsp;<br>&nbsp;*******&nbsp;<br>*********`,
    formula: "Row i has N-i-1 spaces, 2*i+1 stars, N-i-1 spaces.",
    code: `// C++ Implementation
void printPattern(int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i - 1; j++) cout << " ";
        for (int j = 0; j < 2 * i + 1; j++) cout << "*";
        for (int j = 0; j < n - i - 1; j++) cout << " ";
        cout << endl;
    }
}`
  },
  {
    num: 8,
    name: "Inverted Star Pyramid",
    visual: `*********<br>&nbsp;*******&nbsp;<br>&nbsp;&nbsp;*****&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;***&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;`,
    formula: "Row i has i spaces, 2*(N-i)-1 stars, i spaces.",
    code: `// C++ Implementation
void printPattern(int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < i; j++) cout << " ";
        for (int j = 0; j < 2 * (n - i) - 1; j++) cout << "*";
        for (int j = 0; j < i; j++) cout << " ";
        cout << endl;
    }
}`
  },
  {
    num: 9,
    name: "Diamond Star Pattern",
    visual: `&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;***&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;*****&nbsp;&nbsp;<br>&nbsp;*******&nbsp;<br>*********<br>*********<br>&nbsp;*******&nbsp;<br>&nbsp;&nbsp;*****&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;***&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;`,
    formula: "Combine Star Pyramid (Pattern 7) followed by Inverted Star Pyramid (Pattern 8).",
    code: `// C++ Implementation
void printPattern(int n) {
    // Print upper pyramid (Pattern 7)
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i - 1; j++) cout << " ";
        for (int j = 0; j < 2 * i + 1; j++) cout << "*";
        cout << endl;
    }
    // Print lower inverted pyramid (Pattern 8)
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < i; j++) cout << " ";
        for (int j = 0; j < 2 * (n - i) - 1; j++) cout << "*";
        cout << endl;
    }
}`
  },
  {
    num: 10,
    name: "Half Diamond Star Pattern",
    visual: `*<br>**<br>***<br>****<br>*****<br>****<br>***<br>**<br>*`,
    formula: "Runs 2*N-1 rows. Up to N, stars = i+1. Beyond N, stars = 2*N-(i+1).",
    code: `// C++ Implementation
void printPattern(int n) {
    for (int i = 1; i <= 2 * n - 1; i++) {
        int stars = i <= n ? i : 2 * n - i;
        for (int j = 0; j < stars; j++) cout << "*";
        cout << endl;
    }
}`
  },
  {
    num: 11,
    name: "Binary Number Triangle",
    visual: `1<br>0 1<br>1 0 1<br>0 1 0 1<br>1 0 1 0 1`,
    formula: "Row i starts with 1 if i is even, 0 if odd. Alternates columns.",
    code: `// C++ Implementation
void printPattern(int n) {
    for (int i = 0; i < n; i++) {
        int start = i % 2 == 0 ? 1 : 0;
        for (int j = 0; j <= i; j++) {
            cout << start << " ";
            start = 1 - start;
        }
        cout << endl;
    }
}`
  },
  {
    num: 12,
    name: "Number Crown Pattern",
    visual: `1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1<br>12&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;21<br>123&nbsp;&nbsp;&nbsp;&nbsp;321<br>1234&nbsp;&nbsp;4321<br>1234554321`,
    formula: "Row i has i numbers, 2*(N-i) spaces, then i numbers in reverse.",
    code: `// C++ Implementation
void printPattern(int n) {
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++) cout << j;
        for (int j = 1; j <= 2 * (n - i); j++) cout << " ";
        for (int j = i; j >= 1; j--) cout << j;
        cout << endl;
    }
}`
  },
  {
    num: 13,
    name: "Increasing Number Triangle",
    visual: `1<br>2 3<br>4 5 6<br>7 8 9 10`,
    formula: "Print consecutively incrementing numbers in a right-angled triangle.",
    code: `// C++ Implementation
void printPattern(int n) {
    int num = 1;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++) {
            cout << num++ << " ";
        }
        cout << endl;
    }
}`
  },
  {
    num: 14,
    name: "Letter Triangle",
    visual: `A<br>A B<br>A B C<br>A B C D`,
    formula: "Row i prints letters starting from 'A' up to 'A'+i.",
    code: `// C++ Implementation
void printPattern(int n) {
    for (int i = 0; i < n; i++) {
        for (char ch = 'A'; ch <= 'A' + i; ch++) {
            cout << ch << " ";
        }
        cout << endl;
    }
}`
  },
  {
    num: 15,
    name: "Inverted Letter Triangle",
    visual: `A B C D<br>A B C<br>A B<br>A`,
    formula: "Row i prints letters starting from 'A' up to 'A'+(N-i-1).",
    code: `// C++ Implementation
void printPattern(int n) {
    for (int i = 0; i < n; i++) {
        for (char ch = 'A'; ch < 'A' + (n - i); ch++) {
            cout << ch << " ";
        }
        cout << endl;
    }
}`
  },
  {
    num: 16,
    name: "Letter Triangle II",
    visual: `A<br>B B<br>C C C<br>D D D D`,
    formula: "Row i prints character ('A'+i), i+1 times.",
    code: `// C++ Implementation
void printPattern(int n) {
    for (int i = 0; i < n; i++) {
        char ch = (char)('A' + i);
        for (int j = 0; j <= i; j++) {
            cout << ch << " ";
        }
        cout << endl;
    }
}`
  },
  {
    num: 17,
    name: "Alpha-Hill Pattern",
    visual: `&nbsp;&nbsp;&nbsp;A&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;ABA&nbsp;&nbsp;<br>&nbsp;ABCBA&nbsp;<br>ABCDCBA`,
    formula: "Row i has N-i-1 spaces, characters from A up to A+i and back to A, then N-i-1 spaces.",
    code: `// C++ Implementation
void printPattern(int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i - 1; j++) cout << " ";
        char ch = 'A';
        int breakpoint = (2 * i + 1) / 2;
        for (int j = 1; j <= 2 * i + 1; j++) {
            cout << ch;
            if (j <= breakpoint) ch++;
            else ch--;
        }
        for (int j = 0; j < n - i - 1; j++) cout << " ";
        cout << endl;
    }
}`
  },
  {
    num: 18,
    name: "Inverted Letter Triangle II",
    visual: `E<br>E D<br>E D C<br>E D C B<br>E D C B A`,
    formula: "Row i prints letters starting from ('A'+N-1) decreasing by 1 for i+1 items.",
    code: `// C++ Implementation
void printPattern(int n) {
    for (int i = 0; i < n; i++) {
        for (char ch = (char)('A' + n - 1); ch >= (char)('A' + n - 1 - i); ch--) {
            cout << ch << " ";
        }
        cout << endl;
    }
}`
  },
  {
    num: 19,
    name: "Symmetric Void Pattern",
    visual: `**********<br>****&nbsp;&nbsp;****<br>***&nbsp;&nbsp;&nbsp;&nbsp;***<br>**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**<br>*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*<br>*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*<br>**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**<br>***&nbsp;&nbsp;&nbsp;&nbsp;***<br>****&nbsp;&nbsp;****<br>**********`,
    formula: "Top half: stars = N-i, spaces = 2*i, stars = N-i. Bottom half: mirror of top half.",
    code: `// C++ Implementation
void printPattern(int n) {
    // Top half
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i; j++) cout << "*";
        for (int j = 0; j < 2 * i; j++) cout << " ";
        for (int j = 0; j < n - i; j++) cout << "*";
        cout << endl;
    }
    // Bottom half
    for (int i = 0; i < n; i++) {
        for (int j = 0; j <= i; j++) cout << "*";
        for (int j = 0; j < 2 * (n - i - 1); j++) cout << " ";
        for (int j = 0; j <= i; j++) cout << "*";
        cout << endl;
    }
}`
  },
  {
    num: 20,
    name: "Symmetric Butterfly Pattern",
    visual: `*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*<br>**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**<br>***&nbsp;&nbsp;&nbsp;&nbsp;***<br>****&nbsp;&nbsp;****<br>**********<br>****&nbsp;&nbsp;****<br>***&nbsp;&nbsp;&nbsp;&nbsp;***<br>**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**<br>*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*`,
    formula: "Total 2*N-1 rows. Row i has stars, spaces, then stars, changing according to center symmetry.",
    code: `// C++ Implementation
void printPattern(int n) {
    int spaces = 2 * n - 2;
    for (int i = 1; i <= 2 * n - 1; i++) {
        int stars = i <= n ? i : 2 * n - i;
        for (int j = 1; j <= stars; j++) cout << "*";
        for (int j = 1; j <= spaces; j++) cout << " ";
        for (int j = 1; j <= stars; j++) cout << "*";
        cout << endl;
        if (i < n) spaces -= 2;
        else spaces += 2;
    }
}`
  },
  {
    num: 21,
    name: "Hollow Star Square",
    visual: `****<br>*&nbsp;&nbsp;*<br>*&nbsp;&nbsp;*<br>****`,
    formula: "Print stars for boundary cells (i == 0, i == N-1, j == 0, j == N-1), spaces otherwise.",
    code: `// C++ Implementation
void printPattern(int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (i == 0 || j == 0 || i == n - 1 || j == n - 1) cout << "*";
            else cout << " ";
        }
        cout << endl;
    }
}`
  },
  {
    num: 22,
    name: "Concentric Number Square",
    visual: `4444444<br>4333334<br>4322234<br>4321234<br>4322234<br>4333334<br>4444444`,
    formula: "Value at cell (i, j) in a (2N-1)x(2N-1) grid is: N - min(distance from 4 boundaries).",
    code: `// C++ Implementation
void printPattern(int n) {
    for (int i = 0; i < 2 * n - 1; i++) {
        for (int j = 0; j < 2 * n - 1; j++) {
            int top = i, left = j;
            int bottom = 2 * n - 2 - i, right = 2 * n - 2 - j;
            cout << (n - min({top, left, bottom, right})) << " ";
        }
        cout << endl;
    }
}`
  }
];

function generatePatternsDetails() {
  let html = `<h2>Must-Do Logical Patterns</h2>

<section>
  <h3>Concept Overview</h3>
  <p>Pattern-based printing exercises are designed to build a strong foundation in **nested loops** and **logical reasoning**. In interview preparation, these problems help you visualize indexing, multidimensional grids, and mathematical relations which are fundamental for array operations, matrix navigation, and search spaces.</p>
</section>

<section style="background: rgba(0, 229, 255, 0.04); border: 1px solid rgba(0, 229, 255, 0.15); border-radius: 8px; padding: 18px 22px; margin: 20px 0;">
  <h3 style="margin-top: 0; display: flex; align-items: center; gap: 8px; color: var(--text-main);">
    <span>💡</span> Striver's 4 Golden Rules for Nested Loops
  </h3>
  <ol style="margin-top: 10px; padding-left: 16px; line-height: 1.6; color: var(--text-secondary);">
    <li style="margin-bottom: 8px;"><strong>Row Traversal (Outer Loop):</strong> First, count the total number of rows/lines in the pattern. The outer loop runs <code>N</code> times (e.g. <code>for (int i = 0; i &lt; n; i++)</code>).</li>
    <li style="margin-bottom: 8px;"><strong>Inner Loops (Column Management):</strong> For each row, identify the columns and what elements are printed (stars, numbers, characters). Set up inner loops accordingly.</li>
    <li style="margin-bottom: 8px;"><strong>Formula Connection:</strong> Find the mathematical relationship between the outer loop index <code>i</code> and the number of printed items in the row.</li>
    <li style="margin-bottom: 0;"><strong>Space Alignment:</strong> For symmetrical or pyramid layouts, calculate the exact number of leading spaces as a function of the row index <code>i</code> and print them before your symbols.</li>
  </ol>
</section>

<section style="margin-top: 24px;">
  <h3>Example &amp; Complexity Analysis</h3>
  <p>Every pattern problem shares a common complexity profile due to double traversal:</p>
  <table class="complexity-table">
    <thead>
      <tr>
        <th>Metric</th>
        <th>Complexity</th>
        <th>Scenario</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Time Complexity</td>
        <td><span class="complexity-badge complexity-yellow">O(N²)</span></td>
        <td>Two nested loops each running up to N iterations.</td>
      </tr>
      <tr>
        <td>Space Complexity</td>
        <td><span class="complexity-badge complexity-green">O(1)</span></td>
        <td>In-place console output operations requiring no auxiliary storage.</td>
      </tr>
    </tbody>
  </table>
</section>

<section style="margin-top: 28px;">
  <h3>All 22 Striver Patterns Reference Guide</h3>
  <p style="margin-bottom: 16px;">Expand each pattern card below to view its visual mockup, loop logic, and standard C++ solution code:</p>
  
  <div class="patterns-accordion-list">`;

  patternsData.forEach((p) => {
    html += `
    <details style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-glass); border-radius: 8px; margin-bottom: 12px; overflow: hidden;">
      <summary style="padding: 14px 18px; font-weight: 600; color: var(--text-main); cursor: pointer; outline: none; user-select: none; display: flex; align-items: center; gap: 8px;">
        <span>⭐</span> Pattern ${p.num}: ${p.name}
      </summary>
      <div style="padding: 16px 18px; border-top: 1px solid rgba(255, 255, 255, 0.05); background: rgba(0, 0, 0, 0.15);">
        <div style="margin-bottom: 12px;">
          <strong>Target Output:</strong>
          <pre style="background: #111 !important; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 0.85rem; color: #ffca28; margin: 8px 0; border: 1px solid rgba(255,255,255,0.03); line-height: 1.4;">${p.visual}</pre>
        </div>
        <div style="margin-bottom: 12px; font-size: 0.88rem; color: var(--text-secondary);">
          <strong>Mathematical Logic:</strong> ${p.formula}
        </div>
        <div>
          <strong>C++ Reference Code:</strong>
          <pre style="background: #1e1e1e !important; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 0.85rem; color: #9cdcfe; margin: 8px 0; border: 1px solid rgba(255,255,255,0.05); line-height: 1.5; overflow-x: auto;"><code>${p.code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        </div>
      </div>
    </details>`;
  });

  html += `
  </div>
</section>

<section style="margin-top: 24px;">
  <h3>Interview Placement Notes</h3>
  <ul>
    <li><strong>Key Insight:</strong> Never try to memorize code for these patterns. Always map the number of elements to the outer loop variable <code>i</code>.</li>
    <li><strong>Take U Forward Tips:</strong> Focus on understanding how loops work and how boundary conditions behave. This will be highly useful for two-dimensional array traversals.</li>
  </ul>
</section>`;

  return html;
}

try {
  const raw = fs.readFileSync('a2z_clean.json', 'utf8');
  let data = JSON.parse(raw);
  
  let curriculum = [];
  let roadmapPhases = [];
  
  data.forEach((step, stepIndex) => {
    const phaseLabel = `Step ${stepIndex + 1} — ${step.category_name}`;
    const phaseNodes = [];
    
    if (step.subcategories) {
      const subcats = [...step.subcategories];
      const patternsIdx = subcats.findIndex(s => s.subcategory_name === "Patterns");
      if (patternsIdx > -1) {
        const [patternsSubcat] = subcats.splice(patternsIdx, 1);
        subcats.unshift(patternsSubcat);
      }
      subcats.forEach((subcat) => {
        // Consolidated Patterns Subcategory
        if (subcat.subcategory_name === "Patterns") {
          const id = `a2z-s${stepIndex+1}-c${subcat.subcategory_id}-patterns`;
          phaseNodes.push(id);
          
          curriculum.push({
            id: id,
            title: "Patterns",
            category: step.category_name.replace(/striver/ig, 'Elite'),
            difficulty: "Beginner",
            icon: "⭐",
            iconColor: "amber",
            summary: "Master nested loops and logic building by solving 22 essential pattern problems in one shot.",
            readTime: "15 mins",
            details: generatePatternsDetails(),
            youtube: "https://www.youtube.com/watch?v=tNm_NNSB3_w"
          });
          return;
        }

        if (subcat.problems) {
          subcat.problems.forEach((prob, probIndex) => {
            const id = `a2z-s${stepIndex+1}-c${subcat.subcategory_id}-p${probIndex+1}`;
            phaseNodes.push(id);
            
            const name = prob.problem_name.replace(/striver/ig, 'Elite').trim();
            const difficulty = prob.difficulty === 'Easy' ? 'Beginner' : (prob.difficulty === 'Medium' ? 'Intermediate' : 'Advanced');
            
            let icon = '📝';
            let iconColor = 'emerald';
            
            if (name.includes('Pattern')) { icon = '⭐'; iconColor = 'amber'; }
            if (difficulty === 'Intermediate') { iconColor = 'amber'; }
            if (difficulty === 'Advanced') { iconColor = 'rose'; }
            
            // Build standard details HTML
            let leetcodeLink = prob.leetcode;
            let solveButton = leetcodeLink && leetcodeLink !== '$undefined'
              ? `<a href="${leetcodeLink}" target="_blank" class="btn btn-secondary" style="background:#2c2c2c; border:1px solid var(--border-glass); padding:8px 16px; border-radius:6px; color:#fff; text-decoration:none; display:inline-flex; align-items:center; gap:8px;">Solve on LeetCode 🚀</a>`
              : `<a href="https://leetcode.com/problemset/all/?search=${encodeURIComponent(name)}" target="_blank" class="btn btn-secondary" style="background:#2c2c2c; border:1px solid var(--border-glass); padding:8px 16px; border-radius:6px; color:#fff; text-decoration:none; display:inline-flex; align-items:center; gap:8px;">Search on LeetCode 🚀</a>`;

            let detailsHtml = `<h2>${name}</h2>

<section>
  <h3>Concept Overview</h3>
  <p><strong>${name}</strong> is a vital topic in <strong>${step.category_name.replace(/striver/ig, 'Elite')}</strong>. Understanding this concept forms the foundation for solving complex algorithmic problems during technical interviews. It is categorized under the <strong>${difficulty}</strong> level of difficulty.</p>
  <p>Solving this problem requires analyzing the structure of input data, identifying patterns, and applying the correct operations (such as linear scans, maps/hashing, or multi-pointer sweeps) to arrive at the solution efficiently.</p>
</section>


<section style="margin-top: 16px;">
  <h3>Algorithm &amp; Pseudocode</h3>
  <p>Here is the standard step-by-step logic to solve <strong>${name}</strong>:</p>
  <pre><code>// Pseudocode for ${name}
function solve${name.replace(/[^a-zA-Z0-9]/g, '')}(InputData):
    1. Validate input parameters (check for null, empty structures, or basic size constraints).
    2. Initialize tracking variables (pointers, counters, accumulator structures, or DP tables).
    3. Iterate through input elements:
       a. Compare current state with conditions.
       b. Update states or record indices matching criteria.
    4. Return the computed result or optimal state.</code></pre>
</section>


<section style="margin-top: 16px;">
  <h3>Example &amp; Complexity Analysis</h3>
  <p><strong>Example Scenario:</strong></p>
  <ul>
    <li><strong>Sample Input:</strong> Standard input constraints for ${name}.</li>
    <li><strong>Expected Output:</strong> Standard optimal output constraints.</li>
  </ul>
  <table class="complexity-table">
    <thead>
      <tr>
        <th>Metric</th>
        <th>Complexity</th>
        <th>Scenario</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Time Complexity</td>
        <td><span class="complexity-badge complexity-green">O(N)</span></td>
        <td>Optimal traversal and lookup.</td>
      </tr>
      <tr>
        <td>Space Complexity</td>
        <td><span class="complexity-badge complexity-yellow">O(1)</span></td>
        <td>Memory allocated for variables/storage.</td>
      </tr>
    </tbody>
  </table>
</section>


<section style="margin-top: 16px;">
  <h3>Interview Placement Notes (GFG &amp; Striver Guidelines)</h3>
  <ul>
    <li><strong>Key Insight:</strong> Always handle boundary constraints (e.g., negative numbers, empty arrays, single elements).</li>
    <li><strong>Take U Forward Tips:</strong> Draw out array/graph nodes manually and dry-run with pointers. Avoid writing nested loops when linear lookup (Hashing) can optimize performance.</li>
    <li><strong>GeeksforGeeks Advice:</strong> Complete similar exercises to reinforce memory and pattern matching.</li>
  </ul>
</section>

<div style="display:flex; gap:12px; margin-top:16px;">
  ${solveButton}
</div>`;

            curriculum.push({
              id: id,
              title: name,
              category: step.category_name.replace(/striver/ig, 'Elite'),
              difficulty: difficulty,
              icon: icon,
              iconColor: iconColor,
              summary: `Master the logic for ${name}.`,
              readTime: "5 mins",
              details: detailsHtml,
              youtube: (prob.youtube && prob.youtube !== '$undefined') ? prob.youtube : null
            });
          });
        }
      });
    }
    
    if (phaseNodes.length > 0) {
      roadmapPhases.push({
        label: phaseLabel.replace(/striver/ig, 'Elite'),
        nodes: phaseNodes
      });
    }
  });

  const fileContent = `// ═══════════════════════════════════════════════════════════════════
//  dsa.flow — Elite A-Z DSA Roadmap (18 Steps)
// ═══════════════════════════════════════════════════════════════════

export const curriculum = ${JSON.stringify(curriculum, null, 2)};

export const roadmapPhases = ${JSON.stringify(roadmapPhases, null, 2)};

export const githubAlgorithmMappings = {
  "a2z-s2-c487-p2": {
    topic: "Bubble Sort",
    paths: {
      javascript: "Sorts/BubbleSort.js",
      java: "src/main/java/com/thealgorithms/sorts/BubbleSort.java",
      cpp: "sorts/bubble_sort.cpp",
      python: "sorts/bubble_sort.py"
    }
  },
  "a2z-s2-c487-p1": {
    topic: "Selection Sort",
    paths: {
      javascript: "Sorts/SelectionSort.js",
      java: "src/main/java/com/thealgorithms/sorts/SelectionSort.java",
      cpp: "sorts/selection_sort.cpp",
      python: "sorts/selection_sort.py"
    }
  },
  "a2z-s2-c487-p3": {
    topic: "Insertion Sorting",
    paths: {
      javascript: "Sorts/InsertionSort.js",
      java: "src/main/java/com/thealgorithms/sorts/InsertionSort.java",
      cpp: "sorts/insertion_sort.cpp",
      python: "sorts/insertion_sort.py"
    }
  },
  "a2z-s2-c488-p1": {
    topic: "Merge Sorting",
    paths: {
      javascript: "Sorts/MergeSort.js",
      java: "src/main/java/com/thealgorithms/sorts/MergeSort.java",
      cpp: "sorts/merge_sort.cpp",
      python: "sorts/merge_sort.py"
    }
  },
  "a2z-s2-c488-p4": {
    topic: "Quick Sorting",
    paths: {
      javascript: "Sorts/QuickSort.js",
      java: "src/main/java/com/thealgorithms/sorts/QuickSort.java",
      cpp: "sorts/quick_sort.cpp",
      python: "sorts/quick_sort.py"
    }
  },
  "a2z-s4-c489-p1": {
    topic: "Binary Search",
    paths: {
      javascript: "Search/BinarySearch.js",
      java: "src/main/java/com/thealgorithms/searches/BinarySearch.java",
      cpp: "search/binary_search.cpp",
      python: "searches/binary_search.py"
    }
  }
};
`;

  fs.writeFileSync('modules/learning/content_a2z.js', fileContent);
  console.log('Successfully generated modules/learning/content_a2z.js with ' + curriculum.length + ' problems.');
} catch (e) {
  console.error("Error generating curriculum:", e.stack);
}
