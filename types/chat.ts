import { RagmanAssistant } from './assistant';

export interface Message {
  role: Role;
  content: string;
  rating: Rating
}

export type Role = 'assistant' | 'user';

export type Rating = 'positive' | 'negative' | 'none';

export interface ChatBody {
  message: Message;
  position: number;
  key: string;
  cid: string,
  aid: string,
}

export interface Conversation {
  id: string;
  name: string;
  messages: Message[];
  assistant: RagmanAssistant | undefined;
  folderId: string | null;
}
