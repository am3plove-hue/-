
export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
}

export interface SolutionFeature {
  title: string;
  description: string;
  icon: string;
}

export interface ChatSession {
  id: string;
  messages: Message[];
}
