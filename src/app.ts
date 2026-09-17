import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import assistantRoutes from './modules/assistant/assistant.routes.js';
import profileRoutes from './modules/profile/profile.routes.js';

const app = express();

const allowedOrigins = (process.env.FRONTEND_URL ?? '')
  .split(',')
  .map((origin) => origin.trim().replace(/\/$/, ''))
  .filter(Boolean);

app.use(helmet());

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ''))) {
        callback(null, true);
        return;
      }

      callback(null, false);
    },
  })
);

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});
app.use('/assistant', assistantRoutes);
app.use('/profile', profileRoutes);

export default app;
