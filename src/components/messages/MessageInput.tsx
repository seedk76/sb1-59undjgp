import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useMessagesStore } from '../../store/useMessagesStore';

interface MessageInputProps {
  placeholder: string;
  conversationId: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  placeholder,
  conversationId,
}) => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useMessagesStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    await sendMessage(conversationId, message.trim());
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholder}
        className="flex-1 rounded-full border border-gray-300 bg-gray-50 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
      />
      <button
        type="submit"
        disabled={!message.trim()}
        className="rounded-full bg-primary-500 p-2 text-white transition-colors hover:bg-primary-600 disabled:opacity-50"
      >
        <Send className="h-5 w-5" />
      </button>
    </form>
  );
};