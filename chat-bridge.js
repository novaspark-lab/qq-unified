#!/usr/bin/env node

/**
 * QQ Chat Bridge
 * Connects dashboard to QQ agent for real conversations
 * Runs on port 8081
 */

const http = require('http');
const { execSync } = require('child_process');

const PORT = 8081;

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === '/api/chat' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { message } = JSON.parse(body);
        
        // Send to QQ via sessions_send (using OpenClaw gateway)
        // QQ should respond short because of its personality
        const response = await sendToQQ(message);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ reply: response }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message, reply: 'Hmm...' }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

async function sendToQQ(message) {
  // Call OpenClaw's sessions_send via the gateway API
  // The gateway runs on localhost with auth
  
  try {
    // Use OpenClaw CLI or direct API call
    // For now, write to a request file that QQ monitors
    const fs = require('fs');
    const path = require('path');
    
    const requestFile = path.join(__dirname, 'chat-request.json');
    const responseFile = path.join(__dirname, 'chat-response.json');
    
    // Clear old response
    if (fs.existsSync(responseFile)) fs.unlinkSync(responseFile);
    
    // Write request
    fs.writeFileSync(requestFile, JSON.stringify({
      message,
      timestamp: Date.now(),
      waitingForReply: true
    }));
    
    // Poll for response (max 10 seconds)
    for (let i = 0; i < 20; i++) {
      await new Promise(r => setTimeout(r, 500));
      if (fs.existsSync(responseFile)) {
        const resp = JSON.parse(fs.readFileSync(responseFile, 'utf8'));
        fs.unlinkSync(responseFile);
        fs.unlinkSync(requestFile);
        return resp.reply || 'Okay!';
      }
    }
    
    // Timeout - return default
    if (fs.existsSync(requestFile)) fs.unlinkSync(requestFile);
    return 'Hmm... thinking...';
    
  } catch (err) {
    console.error('sendToQQ error:', err);
    return 'Oops!';
  }
}

server.listen(PORT, () => {
  console.log(`🫧 QQ Chat Bridge running on http://localhost:${PORT}`);
  console.log('   POST /api/chat with { "message": "..." }');
});
