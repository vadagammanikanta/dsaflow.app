// api/import-problem.js — Serverless endpoint to import LeetCode/GFG problems using AI knowledge and URL parsing

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'Missing problem URL.' });
  }

  // Extract slug/name to help the LLM
  let slug = '';
  try {
    const parsedUrl = new URL(url);
    const paths = parsedUrl.pathname.split('/').filter(Boolean);
    if (parsedUrl.hostname.includes('leetcode.com')) {
      const idx = paths.indexOf('problems');
      if (idx !== -1 && paths[idx + 1]) {
        slug = paths[idx + 1];
      }
    } else if (parsedUrl.hostname.includes('geeksforgeeks.org')) {
      if (paths[0] && paths[0] !== 'problems') {
        slug = paths[0];
      } else if (paths[1]) {
        slug = paths[1];
      }
    }
  } catch (e) {
    slug = url;
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY environment variable is not configured.' });
  }

  const systemPrompt = `You are a helper that converts any LeetCode or GeeksforGeeks problem into a strict JSON payload matching this exact format:
{
  "id": "slug-name-lowercase",
  "title": "Problem Title",
  "difficulty": "Easy" | "Intermediate" | "Advanced",
  "category": "Topic Name",
  "content": "Full markdown description including Examples and Constraints",
  "starterCode": {
    "javascript": "Starter function signature for JS",
    "python": "Starter signature for Python",
    "cpp": "Starter signature for C++ class Solution",
    "java": "Starter signature for Java class Solution"
  },
  "drivers": {
    "javascript": "Full driver code that reads input from standard input (stdin), parses arguments, calls the starter function, and prints output as JSON/plain string matching the expected outputs.",
    "python": "Full driver code that reads from sys.stdin, parses parameters, calls the function, and prints output as JSON/string.",
    "cpp": "Full driver code in C++ with main() reading from std::cin, calling Solution class, and printing result.",
    "java": "Full driver code in Java class Main with main() reading from BufferedReader, calling Solution class, and printing result."
  },
  "testCases": [
    {
      "input": "First test case input lines (stdin parameters separated by newline)",
      "expectedOutput": "Expected output from the driver for this test case",
      "isHidden": false
    },
    {
      "input": "Second test case input lines",
      "expectedOutput": "Expected output from the driver for this testcase",
      "isHidden": false
    },
    {
      "input": "Third hidden test case input lines",
      "expectedOutput": "Expected output",
      "isHidden": true
    }
  ]
}

Instructions:
1. Use your knowledge of the problem name, slug, or URL to retrieve the correct problem details.
2. The code templates must be syntactically correct.
3. The drivers must exactly read parameters from standard input (stdin) line by line, split, JSON parse (or custom parsing), call the solver, and format the output. Refer to standard inputs in the testCases. For example, if a function takes an array and a target, the input can be:
[2,7,11,15]
9
The driver reads the first line as array, second as target.
4. Output MUST be ONLY the raw JSON string. Do not wrap in markdown \`\`\`json blocks. Do not write text before or after the JSON.`;

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Import the problem from URL: ${url} (extracted slug: ${slug})` }
        ],
        temperature: 0.1,
        max_tokens: 4000,
        stream: false
      })
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      return res.status(groqRes.status).json({ error: `Groq API returned: ${errText}` });
    }

    const data = await groqRes.json();
    let reply = (data.choices?.[0]?.message?.content || '').trim();

    // Remove markdown code blocks if the model wrapped it anyway
    if (reply.startsWith('```')) {
      reply = reply.replace(/^```json\s*/i, '').replace(/```$/, '').trim();
    }

    // Attempt to validate JSON
    let parsedProblem;
    try {
      parsedProblem = JSON.parse(reply);
    } catch (parseErr) {
      console.error('Failed to parse AI output as JSON:', reply);
      return res.status(502).json({ error: 'Failed to generate clean JSON structure for the problem. Try again.' });
    }

    return res.status(200).json({ success: true, problem: parsedProblem });
  } catch (err) {
    return res.status(500).json({ error: `Import failed: ${err.message}` });
  }
}
