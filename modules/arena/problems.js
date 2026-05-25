// LeetCode-style Problem Schema and Database for dsa.flow Coding Arena

export const problems = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays",
    content: `# Two Sum

Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.

You may assume that each input would have ***exactly* one solution**, and you may not use the *same* element twice.

You can return the answer in any order.

### Basic Syntax (Hints)
- **JavaScript**: Use a \`Map\` or two nested loops.
- **Python**: Use a dictionary \`{}\` for O(N) lookup.
- **C++**: Use \`std::unordered_map\` or nested loops.
- **Java**: Use \`HashMap\` or brute force.

### Example 1
**Input**: \`nums = [2,7,11,15], target = 9\`
**Output**: \`[0,1]\`
**Explanation**: Because nums[0] + nums[1] == 9, we return [0, 1].
`,
    starterCode: {
      javascript: `// JavaScript Boilerplate
function twoSum(nums, target) {
    // Write your code here
    
}`,
      python: `# Python Boilerplate
def twoSum(nums, target):
    # Write your code here
    pass`,
      cpp: `// C++ Boilerplate
#include <vector>
#include <unordered_map>

class Solution {
public:
    std::vector<int> twoSum(std::vector<int>& nums, int target) {
        // Write your code here
        return {};
    }
};`,
      java: `// Java Boilerplate
import java.util.HashMap;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
        return new int[]{};
    }
}`
    },
    drivers: {
      javascript: `
// --- JS Driver ---
const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\\n');
if (input.length >= 2) {
  const nums = JSON.parse(input[0]);
  const target = parseInt(input[1]);
  console.log(JSON.stringify(twoSum(nums, target)));
}
`,
      python: `
# --- Python Driver ---
import sys
import json
lines = sys.stdin.read().splitlines()
if len(lines) >= 2:
    nums = json.loads(lines[0])
    target = int(lines[1])
    print(json.dumps(twoSum(nums, target)))
`,
      cpp: `
// --- C++ Driver ---
#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>

int main() {
    std::string line1, line2;
    if (std::getline(std::cin, line1) && std::getline(std::cin, line2)) {
        line1.erase(std::remove(line1.begin(), line1.end(), '['), line1.end());
        line1.erase(std::remove(line1.begin(), line1.end(), ']'), line1.end());
        std::stringstream ss(line1);
        std::vector<int> nums;
        int val;
        while (ss >> val) {
            nums.push_back(val);
            if (ss.peek() == ',') ss.ignore();
        }
        int target = std::stoi(line2);
        Solution sol;
        std::vector<int> res = sol.twoSum(nums, target);
        std::cout << "[";
        for (size_t i = 0; i < res.size(); ++i) {
            std::cout << res[i] << (i + 1 < res.size() ? "," : "");
        }
        std::cout << "]" << std::endl;
    }
    return 0;
}
`,
      java: `
// --- Java Driver ---
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        String line2 = br.readLine();
        if (line1 != null && line2 != null) {
            line1 = line1.replace("[", "").replace("]", "");
            String[] parts = line1.split(",");
            int[] nums = new int[parts.length];
            for (int i = 0; i < parts.length; i++) {
                nums[i] = Integer.parseInt(parts[i].trim());
            }
            int target = Integer.parseInt(line2.trim());
            Solution sol = new Solution();
            int[] res = sol.twoSum(nums, target);
            System.out.println(Arrays.toString(res).replace(" ", ""));
        }
    }
}
`
    },
    testCases: [
      {
        input: "[2,7,11,15]\n9",
        expectedOutput: "[0,1]",
        isHidden: false
      },
      {
        input: "[3,2,4]\n6",
        expectedOutput: "[1,2]",
        isHidden: false
      },
      {
        input: "[3,3]\n6",
        expectedOutput: "[0,1]",
        isHidden: true
      }
    ]
  },
  {
    id: "reverse-string",
    title: "Reverse String",
    difficulty: "Easy",
    category: "Strings",
    content: `# Reverse String

Write a function that reverses a string. The input string is given as a string \`s\`.

You must return the reversed string.

### Basic Syntax (Hints)
- **JavaScript**: Use \`split('').reverse().join('')\` or a two-pointer approach.
- **Python**: Use string slicing \`s[::-1]\` or a list approach.
- **C++**: Use \`std::reverse(s.begin(), s.end())\`.
- **Java**: Use \`StringBuilder(s).reverse().toString()\`.

### Example 1
**Input**: \`s = "hello"\`
**Output**: \`"olleh"\`
`,
    starterCode: {
      javascript: `// JavaScript Boilerplate
function reverseString(s) {
    // Write your code here
    
}`,
      python: `# Python Boilerplate
def reverseString(s):
    # Write your code here
    pass`,
      cpp: `// C++ Boilerplate
#include <string>
#include <algorithm>

class Solution {
public:
    std::string reverseString(std::string s) {
        // Write your code here
        return "";
    }
};`,
      java: `// Java Boilerplate
class Solution {
    public String reverseString(String s) {
        // Write your code here
        return "";
    }
}`
    },
    drivers: {
      javascript: `
// --- JS Driver ---
const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim();
if (input) {
  const s = JSON.parse(input);
  console.log(JSON.stringify(reverseString(s)));
}
`,
      python: `
# --- Python Driver ---
import sys
import json
input_str = sys.stdin.read().strip()
if input_str:
    s = json.loads(input_str)
    print(json.dumps(reverseString(s)))
`,
      cpp: `
// --- C++ Driver ---
#include <iostream>
#include <string>

int main() {
    std::string line;
    if (std::getline(std::cin, line)) {
        if (line.size() >= 2 && line.front() == '"' && line.back() == '"') {
            line = line.substr(1, line.size() - 2);
        }
        Solution sol;
        std::cout << "\\"" << sol.reverseString(line) << "\\"" << std::endl;
    }
    return 0;
}
`,
      java: `
// --- Java Driver ---
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line != null) {
            line = line.replace("\\"", "");
            Solution sol = new Solution();
            System.out.println("\\"" + sol.reverseString(line) + "\\"");
        }
    }
}
`
    },
    testCases: [
      {
        input: "\"hello\"",
        expectedOutput: "\"olleh\"",
        isHidden: false
      },
      {
        input: "\"Hannah\"",
        expectedOutput: "\"hannaH\"",
        isHidden: false
      },
      {
        input: "\"dsa.flow\"",
        expectedOutput: "\"wolf.asd\"",
        isHidden: true
      }
    ]
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    content: `# Valid Parentheses

Given a string \`s\` containing just the characters \`'\('\`, \`'\)'\`, \`'\{'\`, \`'\}'\`, \`'\['\` and \`'\]'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

### Example 1
**Input**: \`s = "()"\`
**Output**: \`true\`

### Example 2
**Input**: \`s = "()[]{}"\`
**Output**: \`true\`

### Example 3
**Input**: \`s = "(]"\`
**Output**: \`false\`
`,
    starterCode: {
      javascript: `// JavaScript Boilerplate
function isValid(s) {
    // Write your code here
    
}`,
      python: `# Python Boilerplate
def isValid(s):
    # Write your code here
    pass`,
      cpp: `// C++ Boilerplate
#include <string>
#include <stack>

class Solution {
public:
    bool isValid(std::string s) {
        // Write your code here
        return false;
    }
};`,
      java: `// Java Boilerplate
import java.util.Stack;

class Solution {
    public boolean isValid(String s) {
        // Write your code here
        return false;
    }
}`
    },
    drivers: {
      javascript: `
// --- JS Driver ---
const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim();
if (input) {
  const s = JSON.parse(input);
  console.log(isValid(s) ? "true" : "false");
}
`,
      python: `
# --- Python Driver ---
import sys
import json
input_str = sys.stdin.read().strip()
if input_str:
    s = json.loads(input_str)
    print("true" if isValid(s) else "false")
`,
      cpp: `
// --- C++ Driver ---
#include <iostream>
#include <string>

int main() {
    std::string line;
    if (std::getline(std::cin, line)) {
        if (line.size() >= 2 && line.front() == '"' && line.back() == '"') {
            line = line.substr(1, line.size() - 2);
        }
        Solution sol;
        std::cout << (sol.isValid(line) ? "true" : "false") << std::endl;
    }
    return 0;
}
`,
      java: `
// --- Java Driver ---
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line != null) {
            line = line.replace("\\"", "");
            Solution sol = new Solution();
            System.out.println(sol.isValid(line) ? "true" : "false");
        }
    }
}
`
    },
    testCases: [
      {
        input: "\"()\"",
        expectedOutput: "true",
        isHidden: false
      },
      {
        input: "\"()[]{}\"",
        expectedOutput: "true",
        isHidden: false
      },
      {
        input: "\"(]\"",
        expectedOutput: "false",
        isHidden: false
      },
      {
        input: "\"{[]}\"",
        expectedOutput: "true",
        isHidden: true
      }
    ]
  }
];
