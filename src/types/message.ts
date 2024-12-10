import type { TranslationKey } from './index';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: {
    clientId: string;
    clientName: string;
    providerId: string;
    providerName: string;
    providerBusinessName: string;
  };
  lastMessage: Message;
  unreadCount: number;
}

export interface MessageFormData {
  content: string;
}

export interface MessagesState {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  messages: Message[];
  loading: boolean;
  error: string | null;
}