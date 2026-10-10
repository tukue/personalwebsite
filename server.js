
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let requestedPath;
  try {
    requestedPath = decodeURIComponent(req.url.split('?')[0]);
  } catch {
    res.writeHead(400);
    res.end('Bad request');
    return;
  }
  if (!requestedPath.startsWith('/') || requestedPath.includes('\\') ||
      requestedPath.includes('\0') || requestedPath.split('/').some(part => part === '..' || part.startsWith('.'))) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  const root = fs.realpathSync(__dirname);
  const filePath = path.resolve(root, '.' + (requestedPath === '/' ? '/index.html' : requestedPath));
  let realPath;
  try {
    realPath = fs.realpathSync(filePath);
  } catch {
    res.writeHead(404);
    res.end('File not found');
    return;
  }
  const relativePath = path.relative(root, realPath);
  if (relativePath === '..' || relativePath.startsWith('..' + path.sep) || path.isAbsolute(relativePath)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(realPath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404);
        res.end('File not found');
      } else {
        res.writeHead(500);
        res.end('Server error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

const PORT = 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
});
