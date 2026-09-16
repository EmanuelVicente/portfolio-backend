import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { errorHandler } from './middleware/errorHandler.js';

import assistantRoutes from './modules/assistant/assistant.routes.js';
import profileRoutes from './modules/profile/profile.routes.js';

const app = express();

const frontendUrl = process.env.FRONTEND_URL;

if (!frontendUrl) {
  throw new Error('FRONTEND_URL environment variable is not configured');
}

app.use(helmet());

app.use(
  cors({
    origin: frontendUrl,
  })
);

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/assistant', assistantRoutes);
app.use('/profile', profileRoutes);
app.get('/debug/config', (_req, res) => {
  res.json({
    profileId: process.env.PROFILE_ID,
    databaseHost: process.env.DATABASE_URL?.match(/@([^/]+)/)?.[1] ?? null,
    geminiKeyExists: Boolean(process.env.GEMINI_API_KEY),
  });
});

app.use(errorHandler);

export default app;
