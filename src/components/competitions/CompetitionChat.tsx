import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Trophy, Info } from 'lucide-react';
import { Button } from '../ui/button';
import { useUser } from '../../context/UserContext';
import { ChatService, ChatMessage } from '../../services/ChatService';

interface CompetitionChatProps {
  competitionId: string;
}

const CompetitionChat: React.FC<CompetitionChatProps> = ({ competitionId }) => {
  const { user } = useUser();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 5000); // רענון כל 5 שניות

    return () => clearInterval(interval);
  }, [competitionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    try {
      const chatMessages = await ChatService.getMessages(competitionId);
      setMessages(chatMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newMessage.trim()) return;

    try {
      const message = await ChatService.sendMessage(
        competitionId,
        user,
        newMessage.trim()
      );
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderMessage = (message: ChatMessage) => {
    const isCurrentUser = user && message.userId === user.id;
    const isSystem = message.type === 'system';
    const isAchievement = message.type === 'achievement';

    return (
      <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex gap-2 mb-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
      >
        <div
          className={`max-w-[80%] p-3 rounded-lg ${
            isSystem
              ? 'bg-gray-100 text-gray-600 text-center w-full'
              : isCurrentUser
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-900'
          }`}
        >
          {!isSystem && (
            <div className="text-sm font-bold mb-1 flex items-center gap-2">
              {message.username}
              {isAchievement && <Trophy size={16} />}
            </div>
          )}
          <div className="flex items-center gap-2">
            {isSystem && <Info size={16} className="text-gray-500" />}
            <div>{message.content}</div>
          </div>
          <div
            className={`text-xs mt-1 ${
              isCurrentUser ? 'text-blue-100' : 'text-gray-500'
            }`}
          >
            {formatTime(message.timestamp)}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="h-[400px] bg-white rounded-lg border shadow-sm flex flex-col">
      {/* אזור הודעות */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-8 h-8 border-2 border-blue-500 rounded-full border-t-transparent"
            />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-4">
            אין הודעות עדיין
          </div>
        ) : (
          messages.map(renderMessage)
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* טופס שליחת הודעה */}
      <form
        onSubmit={handleSendMessage}
        className="border-t p-4 flex items-center gap-2"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="כתוב הודעה..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!user}
        />
        <Button
          type="submit"
          disabled={!user || !newMessage.trim()}
          className="px-4"
        >
          <Send size={16} />
        </Button>
      </form>
    </div>
  );
};

export default CompetitionChat;