/**
 * Portfolio Architecture & Security Gateway Static Server
 * Zero dependencies, built-in Node.js HTTP server.
 * Binds to 0.0.0.0 so both localhost and mobile devices on Wi-Fi can connect.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 3000;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

function getLocalIp() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal && !net.address.startsWith('169.254')) {
        return net.address;
      }
    }
  }
  return 'localhost';
}

const approvedSessions = new Map();

const server = http.createServer((req, res) => {
  // CORS headers for local LAN testing
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const cleanUrl = req.url.split('?')[0].split('#')[0];

  // API Endpoint: Mobile approvals dispatch
  if (req.method === 'POST' && cleanUrl === '/api/auth/approve') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');
        if (data && data.sessionId) {
          approvedSessions.set(data.sessionId, {
            token: data.token || '',
            approvedAt: Date.now()
          });
        }
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, sessionId: data ? data.sessionId : null }));
      } catch (_) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: 'Invalid JSON body' }));
      }
    });
    return;
  }

  // API Endpoint: Desktop status polling
  if (req.method === 'GET' && cleanUrl === '/api/auth/status') {
    const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const sess = urlObj.searchParams.get('session');
    const record = sess ? approvedSessions.get(sess) : null;
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    if (record && (Date.now() - record.approvedAt < 600000)) {
      res.end(JSON.stringify({ approved: true, sessionId: sess, approvedAt: record.approvedAt }));
    } else {
      res.end(JSON.stringify({ approved: false }));
    }
    return;
  }

  let safePath = path.normalize(decodeURIComponent(cleanUrl)).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\' || !safePath) {
    safePath = '/index.html';
  }

  let filePath = path.join(ROOT, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Cache-Control': 'no-cache'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

if (require.main === module) {
  server.listen(PORT, '0.0.0.0', () => {
    const localIp = getLocalIp();
    console.log('==========================================================');
    console.log(' [HRA // ARCH.01] Biophilic Architectural Portfolio Live!');
    console.log(` > Local:   http://localhost:${PORT}/`);
    console.log(` > Network: http://${localIp}:${PORT}/ (Pindai QR lewat ponsel)`);
    console.log(' Tekan Ctrl+C untuk menghentikan server.');
    console.log('==========================================================');
  });
}

module.exports = { server, getLocalIp };
