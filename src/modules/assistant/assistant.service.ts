import { getProfileKnowledge } from '../profile/knowledge.service.js';
import { generateAnswer } from './ai/ai.service.js';
import { assistantInstructions } from './assistant.prompt.js';
import { saveAssistantExchange } from './assistant.repository.js';

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

  const answer = await generateAnswer({
    instructions: assistantInstructions,
    knowledge,
    question,
    history,
  });

  try {
    await saveAssistantExchange(question, answer);
  } catch (error) {
    console.error('Failed to persist assistant exchange:', error);
  }

  return answer;
}
