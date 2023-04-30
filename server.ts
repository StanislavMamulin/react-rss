import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: 'custom',
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 3000;

const html = fs.readFileSync(path.resolve(__dirname, './dist/client/index.html')).toString();

const [beforeContent, afterContent] = html.split('not rendered');

const app = express();

app.use(express.static('public'));
app.use('/assets', express.static(path.resolve(__dirname, './dist/client/assets')));

app.use('*', async (req, res) => {
  res.write(beforeContent);
  const { render } = await vite.ssrLoadModule('./src/server/ServerApp.tsx');

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
