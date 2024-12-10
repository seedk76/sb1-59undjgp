import { create } from 'zustand';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { MessagesState, Message, Conversation } from '../types/message';
import { useAuthStore } from './useAuthStore';

interface MessagesStore extends MessagesState {
  fetchConversations: () => void;
  fetchMessages: (conversationId: string) => void;
  sendMessage: (conversationId: string, content: string) => Promise<void>;
  markAsRead: (messageId: string) => Promise<void>;
  setActiveConversation: (conversation: Conversation | null) => void;
}

export const useMessagesStore = create<MessagesStore>((set, get) => ({
  conversations: [],
  activeConversation: null,
  messages: [],
  loading: false,
  error: null,

  fetchConversations: () => {
    const { user } = useAuthStore.getState();
    if (!user) return;

    set({ loading: true });

    const q = query(
      collection(db, 'conversations'),
      where('participants.clientId', '==', user.uid),
      orderBy('lastMessage.timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const conversations: Conversation[] = [];
        snapshot.forEach((doc) => {
          conversations.push({ id: doc.id, ...doc.data() } as Conversation);
        });
        set({ conversations, loading: false });
      },
      (error) => {
        set({ error: error.message, loading: false });
      }
    );

    return unsubscribe;
  },

  fetchMessages: (conversationId: string) => {
    set({ loading: true });

    const q = query(
      collection(db, 'messages'),
      where('conversationId', '==', conversationId),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const messages: Message[] = [];
        snapshot.forEach((doc) => {
          messages.push({ id: doc.id, ...doc.data() } as Message);
        });
        set({ messages, loading: false });
      },
      (error) => {
        set({ error: error.message, loading: false });
      }
    );

    return unsubscribe;
  },

  sendMessage: async (conversationId: string, content: string) => {
    const { user } = useAuthStore.getState();
    if (!user) return;

    try {
      const messageData = {
        conversationId,
        senderId: user.uid,
        senderName: user.displayName || user.email,
        content,
        timestamp: serverTimestamp(),
        read: false,
      };

      await addDoc(collection(db, 'messages'), messageData);

      // Update conversation's last message
      const conversationRef = doc(db, 'conversations', conversationId);
      await updateDoc(conversationRef, {
        lastMessage: messageData,
        'unreadCount': get().activeConversation?.unreadCount || 0 + 1,
      });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  markAsRead: async (messageId: string) => {
    try {
      const messageRef = doc(db, 'messages', messageId);
      await updateDoc(messageRef, { read: true });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  setActiveConversation: (conversation) => {
    set({ activeConversation: conversation });
  },
}));