import React, { useEffect } from 'react';
import { useMessagesStore } from '../../store/useMessagesStore';
import { ConversationsList } from './ConversationsList';
import { ChatWindow } from './ChatWindow';

export const MessagesPage: React.FC = () => {
  const { fetchConversations, activeConversation } = useMessagesStore();

  useEffect(() => {
    const unsubscribe = fetchConversations();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [fetchConversations]);

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-50">
      <div className="w-96 border-r bg-white">
        <ConversationsList />
      </div>
      <div className="flex-1">
        {activeConversation ? (
          <ChatWindow />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};