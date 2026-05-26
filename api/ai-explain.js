const https = require('https');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ 
      error: 'API Key is missing. Please add GEMINI_API_KEY to your Vercel Environment Variables.' 
    });
  }

  const { title, description, language } = req.body;

  if (!title || !description || !language) {
    return res.status(400).json({ error: 'Missing title, description, or language' });
  }

  const SYSTEM_PROMPT = `You are a world-class, magical DSA Tutor. Your mission is to take a complete beginner and transform them into a DSA Specialist. The user has asked you to explain "${title}" using ${language}.

You must strictly follow this 3-step teaching structure:
Step 1: The Kid Analogy (Explain Like I'm 5): Start with a highly relatable, fun, real-world analogy. No coding jargon yet. Make it intuitively make sense.
Step 2: The Core Concept: Show exactly how this works in ${language} with a very simple, well-commented code block.
Step 3: The Specialist Bridge: Explain why this specific concept matters for advanced Data Structures, Algorithms, or LeetCode problems. Give them a glimpse into how the pros use it.
Keep your response perfectly formatted in Markdown, concise, visually broken up, and highly encouraging.`;

  const payload = JSON.stringify({
    systemInstruction: {
      parts: [{ text: SYSTEM_PROMPT }]
    },
    contents: [
      {
        role: 'user',
        parts: [{ text: `Topic: ${title}\nDescription: ${description}\nLanguage: ${language}\nPlease explain this topic.` }]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1000,
    }
  });

  const options = {
    hostname: 'generativelanguage.googleapis.com',
    port: 443,
    path: `/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  return new Promise((resolve, reject) => {
    const googleReq = https.request(options, (googleRes) => {
      let responseBody = '';

      googleRes.on('data', (chunk) => {
        responseBody += chunk;
      });

      googleRes.on('end', () => {
        try {
          const data = JSON.parse(responseBody);
          res.status(googleRes.statusCode || 200).json(data);
          resolve();
        } catch (e) {
          console.error("JSON Parse Error:", e);
          res.status(500).json({ error: 'Invalid response from Google AI' });
          resolve();
        }
      });
    });

    googleReq.on('error', (error) => {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: 'Failed to communicate with Google AI' });
      resolve();
    });

    googleReq.write(payload);
    googleReq.end();
  });
};
