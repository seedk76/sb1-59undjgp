import React from 'react';
import { useMessagesStore } from '../../store/useMessagesStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { translations } from '../../lib/translations';
import { formatDistanceToNow } from 'date-fns';
import { enUS, ro } from 'date-fns/locale';

export const ConversationsList: React.FC = () => {
  const { conversations, activeConversation, setActiveConversation } = useMessagesStore();
  const { language } = useLanguageStore();

  const getLocale = () => (language === 'en' ? enUS : ro);

  return (
    <div className="h-full">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {translations.messages.title[language]}
        </h2>
      </div>
      <div className="divide-y overflow-y-auto">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => setActiveConversation(conversation)}
            className={`w-full p-4 text-left transition-colors hover:bg-gray-50 ${
              activeConversation?.id === conversation.id ? 'bg-primary-50' : ''
            }`}
          >
            <div className="mb-1 flex items-center justify-between">
              <h3 className="font-medium text-gray-900">
                {conversation.participants.providerBusinessName}
              </h3>
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(conversation.lastMessage.timestamp), {
                  addSuffix: true,
                  locale: getLocale(),
                })}
              </span>
            </div>
            <p className="line-clamp-1 text-sm text-gray-600">
              {conversation.lastMessage.content}
            </p>
            {conversation.unreadCount > 0 && (
              <div className="mt-1 flex justify-end">
                <span className="rounded-full bg-primary-500 px-2 py-0.5 text-xs font-medium text-white">
                  {conversation.unreadCount}
                </span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};