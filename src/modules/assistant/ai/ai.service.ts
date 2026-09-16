import { GoogleGenAI } from '@google/genai';

import { AIServiceError } from './ai.errors.js';

const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export interface AssistantMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface GenerateAnswerInput {
  instructions: string;
  knowledge: string;
  question: string;
  history: AssistantMessage[];
}

const MAX_RETRIES = 3;

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function generateAnswer({
  instructions,
  knowledge,
  question,
  history,
}: GenerateAnswerInput): Promise<string> {
  const contents = [
    ...history.map((message) => ({
      role: message.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: message.content }],
    })),
    {
      role: 'user',
      parts: [{ text: question }],
    },
  ];

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await client.models.generateContent({
        model: 'gemini-3.6-flash',
        contents,
        config: {
          systemInstruction: `
${instructions}

Knowledge about Emanuel:

${knowledge}
`,
        },
      });

      return response.text ?? '';
    } catch (error) {
      if (attempt === MAX_RETRIES) {
        console.error('Gemini request failed:', error);
        throw new AIServiceError();
      }

      const delay = 1000 * 2 ** attempt;

      console.log(`Gemini request failed. Retrying in ${delay}ms...`);

      await wait(delay);
    }
  }

  throw new AIServiceError();
}
