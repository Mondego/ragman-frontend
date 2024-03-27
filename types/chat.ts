import { RagmanAssistant } from './assistant';

export interface Message {
  role: Role;
  content: string;
}

export type Role = 'assistant' | 'user';

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
