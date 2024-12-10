import React from 'react';
import { Check, CheckCheck } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { enUS, ro } from 'date-fns/locale';
import { useLanguageStore } from '../../store/useLanguageStore';
import type { Message } from '../../types/message';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwn }) => {
  const { language } = useLanguageStore();
  const locale = language === 'en' ? enUS : ro;

  return (
    <div
      className={`flex ${
        isOwn ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isOwn
            ? 'bg-primary-500 text-white'
            : 'bg-gray-100 text-gray-900'
        }`}
      >
        <p className="mb-1">{message.content}</p>
        <div className={`flex items-center gap-1 text-xs ${
          isOwn ? 'text-primary-100' : 'text-gray-500'
        }`}>
          <span>
            {formatDistanceToNow(new Date(message.timestamp), {
              addSuffix: true,
              locale,
            })}
          </span>
          {isOwn && (
            message.read ? (
              <CheckCheck className="h-3 w-3" />
            ) : (
              <Check className="h-3 w-3" />
            )
          )}
        </div>
      </div>
    </div>
  );
};