export class AIServiceError extends Error {
  constructor(message = 'AI service temporarily unavailable') {
    super(message);
    this.name = 'AIServiceError';
  }
}
