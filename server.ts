import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const root = process.cwd();
const vite = await createViteServer({
  root,
  server: { middlewareMode: true },
  appType: 'custom',
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 3000;

const app = express();

app.use(vite.middlewares);

app.use(express.static('public'));
app.use('/assets', express.static(path.resolve(__dirname, './dist/client/assets')));

app.use('*', async (req, res) => {
  const url = req.originalUrl;

  const index = fs.readFileSync(path.resolve(`${root}/index.html`), 'utf8');
  const template = await vite.transformIndexHtml(url, index);
  const [beforeContent, afterContent] = template.split('not rendered');

  const { render } = await vite.ssrLoadModule('./src/server/ServerApp.tsx');

  res.write(beforeContent);
  const stream = render(req.originalUrl, {
    onShellReady() {
      stream.pipe(res);
    },
    onShellError(err: unknown) {
      console.error('Shell error occured:', err);
    },
    onAllReady() {
      res.write(afterContent);
      res.end();
    },
    onError(err: unknown) {
      console.error(err);
    },
  });
});

console.log(`listening on http://localhost:${PORT}`);
app.listen(PORT);
