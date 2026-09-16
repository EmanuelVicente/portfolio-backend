import type { Request, Response } from 'express';

import { askAssistant } from './assistant.service.js';

export async function postAssistant(req: Request, res: Response): Promise<void> {
  const { question, history } = req.body;

  const answer = await askAssistant({
    question,
    history,
  });

  res.status(200).json({
    answer,
  });
}
