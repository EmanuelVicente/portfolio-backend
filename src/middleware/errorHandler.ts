import type { NextFunction, Request, Response } from 'express';

import { AppError } from '../errors/AppError.js';
import { AIServiceError } from '../modules/assistant/ai/ai.errors.js';

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction): void {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      error: error.message,
    });

    return;
  }

  if (error instanceof AIServiceError) {
    res.status(503).json({
      error: error.message,
    });

    return;
  }

  console.error('Unhandled error:', error);

  res.status(500).json({
    error: 'Internal server error',
  });
}
