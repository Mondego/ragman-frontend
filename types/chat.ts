import { OpenAIModel } from './openai';
import { RagmanAssistant } from './assistant';

export interface Message {
  role: Role;
  content: string;
  timestamp: string;
}

export type Role = 'assistant' | 'user';

export interface ChatBody {
  model: OpenAIModel;
  messages: Message[];
  key: string;
  prompt: string;
  temperature: number;
  cid: string,
  aid: string | undefined,
}

export interface Conversation {
  id: string;
  name: string;
  messages: Message[];
  model: OpenAIModel;
  assistant: RagmanAssistant | undefined;
  prompt: string;
  temperature: number;
  folderId: string | null;
}
