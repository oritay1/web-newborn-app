import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import apiRoutes from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDist = path.resolve(__dirname, '../../client/dist');

const app = express();

// Hosting platforms like Render sit behind a proxy - needed to see the real client IP
if (env.isProduction) app.set('trust proxy', 1);

if (env.clientOrigin) app.use(cors({ origin: env.clientOrigin }));
app.use(express.json({ limit: '2mb' }));

app.use('/api', apiRoutes);

// In production the server also serves the built React app
if (env.isProduction) {
  const indexHtml = fs.readFileSync(path.join(clientDist, 'index.html'), 'utf8');

  // index: false so every page goes through the handler below
  app.use(express.static(clientDist, { index: false }));

  // Link previews need absolute URLs, so fill in the site address from the request
  app.get('/{*splat}', (req, res) => {
    const siteUrl = `${req.protocol}://${req.get('host')}`;
    res.type('html').send(indexHtml.replaceAll('__SITE_URL__', siteUrl));
  });
}

app.use(errorHandler);

export default app;
