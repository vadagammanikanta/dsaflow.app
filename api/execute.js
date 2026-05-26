const COMPILER_MAP = {
  'javascript': 'nodejs-20.17.0',
  'js': 'nodejs-20.17.0',
  'python': 'cpython-3.12.7',
  'py': 'cpython-3.12.7',
  'cpp': 'gcc-13.2.0',
  'c++': 'gcc-13.2.0',
  'java': 'openjdk-jdk-22+36',
  'c': 'gcc-13.2.0-c',
  'csharp': 'mono-head',
  'cs': 'mono-head',
  'go': 'go-head',
  'rust': 'rust-head',
  'rs': 'rust-head',
  'ruby': 'ruby-head',
  'rb': 'ruby-head',
  'php': 'php-head',
  'swift': 'swift-head',
  'kotlin': 'kotlin-head',
  'kt': 'kotlin-head'
};

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { language, code, driver, stdin } = req.body;

  if (!language || !code) {
    return res.status(400).json({ error: 'Missing language or code' });
  }

  const normalizedKey = language.toLowerCase();
  const compiler = COMPILER_MAP[normalizedKey];
  
  if (!compiler) {
    return res.status(400).json({ error: `Unsupported language: ${language}` });
  }

  // Concatenate user code with driver code if provided
  let fullContent = code;
  if (driver && driver.trim().length > 0) {
    fullContent = code + "\n\n" + driver;
  }

  const payload = {
    compiler: compiler,
    code: fullContent,
    stdin: stdin || ""
  };

  // Wandbox Java requires the public class to be named "prog".
  // We transparently rename any public class declaration to "prog" before submission.
  if (normalizedKey === 'java') {
    payload.code = payload.code.replace(/public\s+class\s+(\w+)/g, 'public class prog');
  }

  let data = null;
  let attempts = 3;
  let lastErr = null;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const wandboxRes = await fetch('https://wandbox.org/api/compile.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!wandboxRes.ok) {
        throw new Error(`Upstream compilation service returned status ${wandboxRes.status}`);
      }

      data = await wandboxRes.json();

      // Check if this is a transient sandbox error, e.g. OCI runtime container allocation failure
      const isTransientError = data.program_error && (
        data.program_error.includes("OCI runtime error") || 
        data.program_error.includes("Resource temporarily unavailable") || 
        data.status === "126"
      );

      if (isTransientError && attempt < attempts) {
        console.warn(`Wandbox transient error (attempt ${attempt}/${attempts}):`, data.program_error);
        await new Promise(resolve => setTimeout(resolve, 500));
        continue;
      }

      // If we got a valid response (either compile error, runtime success, or actual programmer runtime error)
      break;
    } catch (err) {
      lastErr = err;
      if (attempt === attempts) {
        console.error("Wandbox execution exhausted all retry attempts:", err);
        return res.status(502).json({ error: `Upstream compiler error: ${err.message}` });
      }
      console.warn(`Wandbox connection attempt ${attempt}/${attempts} failed, retrying...`, err.message);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  // Check for compilation errors
  const hasCompileError = data.compiler_error && data.compiler_error.trim().length > 0;
  if (hasCompileError) {
    return res.status(200).json({
      success: false,
      status: 'Compilation Error',
      output: data.compiler_error || '',
      error: data.compiler_error || 'Compilation failed',
      stderr: data.compiler_error || ''
    });
  }

  const success = data.status === '0';

  return res.status(200).json({
    success: success,
    status: success ? 'Success' : 'Runtime Error',
    output: data.program_output || data.program_message || '',
    stdout: data.program_output || '',
    stderr: data.program_error || '',
    error: success ? '' : (data.program_error || 'Process exited with non-zero status')
  });
};
