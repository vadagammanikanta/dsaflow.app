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

  const options = {
    hostname: 'generativelanguage.googleapis.com',
    port: 443,
    path: `/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
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

    // req.body is already parsed as an object by Vercel
    const payload = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    googleReq.write(payload);
    googleReq.end();
  });
};
