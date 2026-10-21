// Servidor estático do portfólio, sem dependências externas.
// Uso: npm start  (porta definida por PORT, padrão 3000)
import http from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PORT = Number(process.env.PORT) || 3000;
const PUBLIC = path.join(path.dirname(fileURLToPath(import.meta.url)), 'public');

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
};

const SEGURANCA = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

// Resolve o caminho pedido dentro de public/, sem permitir sair da pasta.
async function localizar(caminho) {
  const alvo = path.resolve(PUBLIC, `.${caminho}`);
  if (alvo !== PUBLIC && !alvo.startsWith(PUBLIC + path.sep)) return null;
  const info = await stat(alvo).catch(() => null);
  if (!info) return null;
  if (info.isDirectory()) return localizar(path.posix.join(caminho, 'index.html'));
  return { alvo, info };
}

function responder(res, status, corpo, tipo = 'text/plain; charset=utf-8') {
  res.writeHead(status, { ...SEGURANCA, 'Content-Type': tipo });
  res.end(corpo);
}

const servidor = http.createServer(async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' });
    return res.end();
  }

  let caminho;
  try {
    caminho = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    return responder(res, 400, 'Requisição inválida.');
  }

  if (caminho === '/healthz') return responder(res, 200, '{"ok":true}', 'application/json; charset=utf-8');

  const arquivo = await localizar(caminho);
  if (!arquivo) return responder(res, 404, 'Página não encontrada.');

  const { alvo, info } = arquivo;
  const extensao = path.extname(alvo).toLowerCase();
  const etag = `"${info.size.toString(16)}-${Math.floor(info.mtimeMs).toString(16)}"`;

  if (req.headers['if-none-match'] === etag) {
    res.writeHead(304, { ETag: etag });
    return res.end();
  }

  res.writeHead(200, {
    ...SEGURANCA,
    'Content-Type': TIPOS[extensao] || 'application/octet-stream',
    'Content-Length': info.size,
    // HTML sempre revalida; imagens, CSS e JS ficam em cache por 1 dia
    'Cache-Control': extensao === '.html' ? 'no-cache' : 'public, max-age=86400',
    ETag: etag,
  });
  if (req.method === 'HEAD') return res.end();
  createReadStream(alvo).pipe(res);
});

servidor.listen(PORT, () => console.log(`Portfólio rodando em http://localhost:${PORT}`));
