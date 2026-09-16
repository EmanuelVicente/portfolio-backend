import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { GoogleGenAI } from '@google/genai';
import { getProfileKnowledge } from './modules/profile/knowledge.service.js';
import { generateAnswer } from './modules/assistant/ai/ai.service.js';

import assistantRoutes from './modules/assistant/assistant.routes.js';
import profileRoutes from './modules/profile/profile.routes.js';

const app = express();

const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});
app.use('/assistant', assistantRoutes);
app.use('/profile', profileRoutes);

export default app;
