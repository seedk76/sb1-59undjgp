import React, { useEffect, useRef } from 'react';
import { useMessagesStore } from '../../store/useMessagesStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { translations } from '../../lib/translations';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { useAuthStore } from '../../store/useAuthStore';

export const ChatWindow: React.FC = () => {
  const { activeConversation, messages, fetchMessages } = useMessagesStore();
  const { user } = useAuthStore();
  const { language } = useLanguageStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeConversation) {
      const unsubscribe = fetchMessages(activeConversation.id);
      return () => {
        if (unsubscribe) unsubscribe();
      };
    }
  }, [activeConversation, fetchMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!activeConversation || !user) return null;

  return (
    <div className="flex h-full flex-col">
      <div className="border-b bg-white p-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {activeConversation.participants.providerBusinessName}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isOwn={message.senderId === user.uid}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t bg-white p-4">
        <MessageInput
          placeholder={translations.messages.typePlaceholder[language]}
          conversationId={activeConversation.id}
        />
      </div>
    </div>
  );
};