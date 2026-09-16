import type { NextFunction, Request, Response } from 'express';

const MAX_HISTORY_MESSAGES = 20;
const MAX_QUESTION_LENGTH = 500;
const MAX_MESSAGE_LENGTH = 500;

export function validateAssistantRequest(req: Request, res: Response, next: NextFunction): void {
  const { question, history } = req.body;

  if (typeof question !== 'string' || question.trim().length === 0) {
    res.status(400).json({
      error: 'Question is required',
    });
    return;
  }

  if (question.length > MAX_QUESTION_LENGTH) {
    res.status(400).json({
      error: `Question cannot contain more than ${MAX_QUESTION_LENGTH} characters`,
    });
    return;
  }

  if (!Array.isArray(history)) {
    res.status(400).json({
      error: 'History must be an array',
    });
    return;
  }

  if (history.length > MAX_HISTORY_MESSAGES) {
    res.status(400).json({
      error: `History cannot contain more than ${MAX_HISTORY_MESSAGES} messages`,
    });
    return;
  }

  for (const message of history) {
    if (
      typeof message !== 'object' ||
      message === null ||
      !['user', 'assistant'].includes(message.role) ||
      typeof message.content !== 'string' ||
      message.content.trim().length === 0
    ) {
      res.status(400).json({
        error: 'Invalid message in history',
      });
      return;
    }

    if (message.content.length > MAX_MESSAGE_LENGTH) {
      res.status(400).json({
        error: `History messages cannot contain more than ${MAX_MESSAGE_LENGTH} characters`,
      });
      return;
    }
  }

  next();
}
