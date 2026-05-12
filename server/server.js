// ============================================================
// MULTOPOLI — Leaderboard Server
// Minimal Node.js server, stores records in a JSON file
// ============================================================

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 9092;
const DATA_FILE = path.join(__dirname, 'leaderboard.json');
const MAX_ENTRIES = 100;

function loadData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch (e) {
    return [];
  }
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

const server = http.createServer((req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === '/api/leaderboard' && req.method === 'GET') {
    const data = loadData();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
    return;
  }

  if (req.url === '/api/leaderboard' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const entry = JSON.parse(body);
        // Validate
        if (!entry.name || typeof entry.score !== 'number') {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'name and score required' }));
          return;
        }
        // Sanitize
        const record = {
          name: String(entry.name).slice(0, 15).replace(/[<>"'&]/g, ''),
          score: Math.floor(entry.score),
          multe: Math.floor(entry.multe || 0),
          cassa: Math.floor(entry.cassa || 0),
          durata: Math.floor(entry.durata || 0),
          date: new Date().toISOString(),
        };

        const data = loadData();
        data.push(record);
        data.sort((a, b) => b.score - a.score);
        const trimmed = data.slice(0, MAX_ENTRIES);
        saveData(trimmed);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, rank: trimmed.findIndex(r => r.date === record.date) + 1 }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'invalid JSON' }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('Multopoli Leaderboard server running on port ' + PORT);
});
