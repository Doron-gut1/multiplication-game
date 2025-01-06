import { User } from './UserService';

export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  content: string;
  timestamp: Date;
  type: 'chat' | 'achievement' | 'system';
}

export class ChatService {
  private static readonly MESSAGES_KEY = 'multiplication-game-chat';
  private static readonly MAX_MESSAGES = 100;

  static async getMessages(competitionId: string): Promise<ChatMessage[]> {
    const stored = localStorage.getItem(`${this.MESSAGES_KEY}-${competitionId}`);
    if (!stored) return [];

    return JSON.parse(stored).map((msg: any) => ({
      ...msg,
      timestamp: new Date(msg.timestamp)
    }));
  }

  static async sendMessage(
    competitionId: string,
    user: User,
    content: string,
    type: ChatMessage['type'] = 'chat'
  ): Promise<ChatMessage> {
    const messages = await this.getMessages(competitionId);
    
    const newMessage: ChatMessage = {
      id: crypto.randomUUID(),
      userId: user.id,
      username: user.username,
      content,
      timestamp: new Date(),
      type
    };

    messages.push(newMessage);

    // שמירת מקסימום הודעות
    if (messages.length > this.MAX_MESSAGES) {
      messages.splice(0, messages.length - this.MAX_MESSAGES);
    }

    localStorage.setItem(
      `${this.MESSAGES_KEY}-${competitionId}`,
      JSON.stringify(messages)
    );

    return newMessage;
  }

  static async sendSystemMessage(
    competitionId: string,
    content: string
  ): Promise<ChatMessage> {
    return this.sendMessage(
      competitionId,
      { id: 'system', username: 'System' } as User,
      content,
      'system'
    );
  }
}