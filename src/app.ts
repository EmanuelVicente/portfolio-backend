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

app.get('/debug/config', (_req, res) => {
  res.json({
    profileId: process.env.PROFILE_ID,
    geminiKeyExists: Boolean(process.env.GEMINI_API_KEY),
    databaseConfigured: Boolean(process.env.DATABASE_URL),
  });
});

app.get('/debug/gemini', async (_req, res) => {
  try {
    const response = await client.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: 'Say hello',
    });

    res.json({
      ok: true,
      response: response.text,
    });
  } catch (error) {
    console.error('Gemini debug error:', error);

    res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

app.get('/debug/knowledge', async (_req, res) => {
  try {
    const knowledge = await getProfileKnowledge();

    res.json({
      ok: true,
      knowledgeLength: knowledge.length,
    });
  } catch (error) {
    console.error('Knowledge debug error:', error);

    res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

app.get('/debug/assistant', async (_req, res) => {
  try {
    const knowledge = await getProfileKnowledge();

    const answer = await generateAnswer({
      instructions: 'Answer the question briefly and clearly.',
      knowledge,
      question: 'What is Emanuel’s name?',
      history: [],
    });

    res.json({
      ok: true,
      answer,
    });
  } catch (error) {
    console.error('Assistant debug error:', error);

    res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default app;
