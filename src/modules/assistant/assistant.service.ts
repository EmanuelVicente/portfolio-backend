import { getProfileKnowledge } from '../profile/knowledge.service.js';
import { generateAnswer } from './ai/ai.service.js';
import { assistantInstructions } from './assistant.prompt.js';

export interface AssistantMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AskAssistantInput {
  question: string;
  history: AssistantMessage[];
}

export async function askAssistant({ question, history }: AskAssistantInput): Promise<string> {
  const knowledge = await getProfileKnowledge();

  return generateAnswer({
    instructions: assistantInstructions,
    knowledge,
    question,
    history,
  });
}
