import { RagmanAssistant } from '@/types/assistant';
import { Conversation, Message } from '@/types/chat';
import { ErrorMessage } from '@/types/error';
import { FolderInterface } from '@/types/folder';
import { Prompt } from '@/types/prompt';

export interface HomeInitialState {
  apiKey: string;
  loading: boolean;
  lightMode: 'light' | 'dark';
  messageIsStreaming: boolean;
  assistants: RagmanAssistant[];
  assistantsError: ErrorMessage | null;
  folders: FolderInterface[];
  conversations: Conversation[];
  selectedConversation: Conversation | undefined;
  currentMessage: Message | undefined;
  prompts: Prompt[];
  showChatbar: boolean;
  showPromptbar: boolean;
  currentFolder: FolderInterface | undefined;
  messageError: boolean;
  searchTerm: string;
}

export const initialState: HomeInitialState = {
  apiKey: '',
  loading: false,
  lightMode: 'dark',
  messageIsStreaming: false,
  assistants: [],
  assistantsError: null,
  folders: [],
  conversations: [],
  selectedConversation: undefined,
  currentMessage: undefined,
  prompts: [],
  showPromptbar: true,
  showChatbar: true,
  currentFolder: undefined,
  messageError: false,
  searchTerm: ''
};
