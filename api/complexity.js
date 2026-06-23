// api/complexity.js — AI-powered Time & Space Complexity Analyzer endpoint
// Requires GROQ_API_KEY environment variable. Can also fallback to custom user key if needed.

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { code, language, customApiKey } = req.body;
  if (!code) {
    return res.status(400).json({ error: 'Missing code in request body.' });
  }

  const systemPrompt = `You are a strict, elite algorithm complexity analysis system.
Analyze the provided code and return a JSON object with details of its Time and Space complexity.
Analyze loops, nested loops, recursion depth, auxiliary space, storage structures, and language-specific overhead.
Return a clean, valid JSON block.
Do NOT wrap the JSON block in any other text, markdown blocks, or explanation. Only return the raw JSON text.

The JSON schema must exactly be:
{
  "timeComplexity": "O(N)", // Must be one of: O(1), O(log N), O(N), O(N log N), O(N^2), O(2^N), O(N!)
  "spaceComplexity": "O(1)", // Must be one of: O(1), O(log N), O(N), O(N^2), etc.
  "explanation": "A concise paragraph explaining the overall complexities and reasons.",
  "steps": [
    "First step of explanation",
    "Second step..."
  ],
  "isOptimized": true,
  "optimizedSuggestion": "If isOptimized is false, provide a quick design tip on how to optimize it. Otherwise empty string."
}`;

  const userPrompt = `Language: ${language || 'unknown'}
Code to analyze:
\`\`\`
${code}
\`\`\``;

  const apiKey = (customApiKey && customApiKey.trim().length > 0) ? customApiKey.trim() : process.env.GROQ_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY environment variable is not configured.' });
  }

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
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.1, // low temperature for precise, deterministic JSON output
        max_tokens: 1500,
        stream: false
      })
    });

    if (!groqRes.ok) {
      const rawText = await groqRes.text();
      console.error('[complexity] Groq API error response:', rawText);
      return res.status(groqRes.status).json({ error: `Groq API Error: ${rawText}` });
    }

    const data = await groqRes.json();
    let reply = data.choices?.[0]?.message?.content || '';

    // Sanitize output to extract only the JSON object in case model wrapped it in markdown
    reply = reply.trim();
    if (reply.startsWith('```')) {
      reply = reply.replace(/^```json\s*/i, '').replace(/```$/, '').trim();
    }

    // Try parsing to verify it is valid JSON
    let parsedResult;
    try {
      parsedResult = JSON.parse(reply);
    } catch (parseErr) {
      console.warn('[complexity] AI returned invalid JSON. Content was:', reply);
      return res.status(500).json({ 
        error: 'AI did not return valid JSON.', 
        rawContent: reply 
      });
    }

    return res.status(200).json(parsedResult);

  } catch (err) {
    console.error('[complexity] Fetch error:', err);
    return res.status(502).json({ error: `Failed to reach Groq API: ${err.message}` });
  }
}
