const https = require('https');

const LANG_MAP = {
  'javascript': { language: 'js', version: '18.15.0' },
  'python': { language: 'python', version: '3.10.0' },
  'cpp': { language: 'c++', version: '10.2.0' },
  'java': { language: 'java', version: '15.0.2' }
};

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { language, code, stdin } = req.body;

  if (!language || !code) {
    return res.status(400).json({ error: 'Missing language or code' });
  }

  const mapped = LANG_MAP[language];
  if (!mapped) {
    return res.status(400).json({ error: `Unsupported language: ${language}` });
  }

  // Define file names based on language extensions
  let ext = 'js';
  if (mapped.language === 'python') ext = 'py';
  else if (mapped.language === 'c++') ext = 'cpp';
  else if (mapped.language === 'java') ext = 'java';

  const payload = JSON.stringify({
    language: mapped.language,
    version: mapped.version,
    files: [
      {
        name: `Solution.${ext}`,
        content: code
      }
    ],
    stdin: stdin || ""
  });

  const options = {
    hostname: 'emkc.org',
    port: 443,
    path: '/api/v2/piston/execute',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  return new Promise((resolve) => {
    const pistonReq = https.request(options, (pistonRes) => {
      let body = '';
      pistonRes.on('data', (chunk) => body += chunk);
      pistonRes.on('end', () => {
        try {
          const data = JSON.parse(body);
          if (data.message) {
            res.status(500).json({ error: data.message });
            resolve();
            return;
          }

          const run = data.run || {};
          const compile = data.compile || {};

          let status = 'Success';
          let error = '';

          // Compilation errors
          if (compile.code !== undefined && compile.code !== null && compile.code !== 0) {
            status = 'Compilation Error';
            error = compile.stderr || compile.output || 'Compilation failed';
          } 
          // Signal is set when process gets killed (e.g. by memory or time limits)
          else if (run.signal === 'SIGKILL' || run.signal === 'SIGTERM') {
            status = 'Time Limit Exceeded (TLE)';
            error = 'Execution timed out (Time Limit Exceeded).';
          } 
          // Runtime failures (nullpointer, syntax errors in dynamic langs)
          else if (run.code !== undefined && run.code !== null && run.code !== 0) {
            status = 'Runtime Error';
            error = run.stderr || run.output || 'Process exited with non-zero status';
          }

          res.status(200).json({
            status,
            stdout: run.stdout || '',
            stderr: run.stderr || '',
            output: run.output || '',
            compileOutput: compile.output || '',
            error,
            code: run.code,
            signal: run.signal
          });
          resolve();
        } catch (e) {
          console.error("Piston parse error:", e);
          res.status(500).json({ error: 'Failed to parse execution output' });
          resolve();
        }
      });
    });

    pistonReq.on('error', (err) => {
      console.error("Piston connection error:", err);
      res.status(500).json({ error: 'Code execution service connection timed out' });
      resolve();
    });

    pistonReq.write(payload);
    pistonReq.end();
  });
};
