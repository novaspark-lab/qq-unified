#!/usr/bin/env node

/**
 * QQ Unified Dashboard Server
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 9000;
const STATE_PATH = path.join(__dirname, 'state.json');

// Initialize state.json if doesn't exist
if (!fs.existsSync(STATE_PATH)) {
  fs.writeFileSync(STATE_PATH, JSON.stringify({
    mood: 'calm',
    energy: 70,
    hunger: 60,
    attention: 50
  }, null, 2));
}

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav'
};

const server = http.createServer((req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  // API: Get state
  if (req.url === '/api/state') {
    try {
      const state = fs.readFileSync(STATE_PATH, 'utf8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(state);
    } catch (e) {
      res.writeHead(500); res.end('{}');
    }
    return;
  }

  // API: Feed
  if (req.url === '/api/feed' && req.method === 'POST') {
    try {
      const state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
      state.hunger = Math.min(100, (state.hunger || 50) + 30);
      state.mood = 'happy';
      fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
    } catch (e) {
      res.writeHead(500); res.end('{"error":"feed failed"}');
    }
    return;
  }

  // API: Play
  if (req.url === '/api/play' && req.method === 'POST') {
    try {
      const state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
      state.attention = Math.min(100, (state.attention || 50) + 25);
      state.mood = 'playful';
      fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
    } catch (e) {
      res.writeHead(500); res.end('{"error":"play failed"}');
    }
    return;
  }

  // API: Pet
  if (req.url === '/api/pet' && req.method === 'POST') {
    try {
      const state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
      state.attention = Math.min(100, (state.attention || 50) + 15);
      state.mood = 'grateful';
      fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
    } catch (e) {
      res.writeHead(500); res.end('{"error":"pet failed"}');
    }
    return;
  }

  let filePath = req.url === '/' ? 'index.html' : req.url.slice(1);
  filePath = path.join(__dirname, filePath);
  
  // Security: prevent directory traversal
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('Not found');
      } else {
        res.writeHead(500);
        res.end('Server error');
      }
      return;
    }
    
    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'text/plain';
    
    res.writeHead(200, { 
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`🫧 QQ Unified Dashboard running at http://localhost:${PORT}/`);
  console.log('   Camera/Mic/Sound controls + QQ Pet in one place');
  console.log('   Make sure QQ backend is running on port 8080');
});
