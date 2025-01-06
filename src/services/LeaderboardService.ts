import { User } from './UserService';
import dayjs from 'dayjs';

export interface LeaderboardEntry {
  userId: string;
  username: string;
  score: number;
  timestamp: Date;
}

export interface LeaderboardCategory {
  id: string;
  name: string;
  description: string;
  period: 'daily' | 'weekly' | 'allTime';
  scoreType: 'correctAnswers' | 'streak' | 'totalXP';
}

export class LeaderboardService {
  private static readonly STORAGE_KEY = 'multiplication-game-leaderboard';

  private static readonly CATEGORIES: LeaderboardCategory[] = [
    {
      id: 'daily-correct',
      name: 'תשובות נכונות היום',
      description: 'מספר התשובות הנכונות היומי',
      period: 'daily',
      scoreType: 'correctAnswers'
    },
    {
      id: 'weekly-correct',
      name: 'תשובות נכונות השבוע',
      description: 'מספר התשובות הנכונות השבועי',
      period: 'weekly',
      scoreType: 'correctAnswers'
    },
    {
      id: 'best-streak',
      name: 'רצף התשובות הטוב ביותר',
      description: 'רצף התשובות הנכונות הגבוה ביותר',
      period: 'allTime',
      scoreType: 'streak'
    },
    {
      id: 'total-xp',
      name: 'נקודות ניסיון',
      description: 'סך נקודות הניסיון שנצברו',
      period: 'allTime',
      scoreType: 'totalXP'
    }
  ];

  static getCategories(): LeaderboardCategory[] {
    return this.CATEGORIES;
  }

  static async getLeaderboard(categoryId: string): Promise<LeaderboardEntry[]> {
    const category = this.CATEGORIES.find(c => c.id === categoryId);
    if (!category) return [];

    const stored = localStorage.getItem(`${this.STORAGE_KEY}-${categoryId}`);
    if (!stored) return [];

    const entries = JSON.parse(stored) as LeaderboardEntry[];
    const now = dayjs();

    // סינון לפי תקופה
    return entries.filter(entry => {
      const entryDate = dayjs(entry.timestamp);
      switch (category.period) {
        case 'daily':
          return entryDate.isSame(now, 'day');
        case 'weekly':
          return entryDate.isSame(now, 'week');
        default:
          return true;
      }
    }).sort((a, b) => b.score - a.score).slice(0, 10);
  }

  static async updateScore(
    categoryId: string,
    user: User,
    score: number
  ): Promise<void> {
    const category = this.CATEGORIES.find(c => c.id === categoryId);
    if (!category) return;

    const entries = await this.getLeaderboard(categoryId);
    const existingEntry = entries.find(e => e.userId === user.id);

    if (existingEntry) {
      // עדכון הניקוד רק אם הוא גבוה יותר
      if (score > existingEntry.score) {
        existingEntry.score = score;
        existingEntry.timestamp = new Date();
      }
    } else {
      // הוספת רשומה חדשה
      entries.push({
        userId: user.id,
        username: user.username,
        score,
        timestamp: new Date()
      });
    }

    // שמירת השינויים
    localStorage.setItem(
      `${this.STORAGE_KEY}-${categoryId}`,
      JSON.stringify(entries)
    );
  }

  static async getUserRank(
    categoryId: string,
    userId: string
  ): Promise<number | null> {
    const entries = await this.getLeaderboard(categoryId);
    const index = entries.findIndex(e => e.userId === userId);
    return index === -1 ? null : index + 1;
  }

  static async cleanupOldEntries(): Promise<void> {
    for (const category of this.CATEGORIES) {
      if (category.period === 'allTime') continue;

      const entries = await this.getLeaderboard(category.id);
      const now = dayjs();

      const filteredEntries = entries.filter(entry => {
        const entryDate = dayjs(entry.timestamp);
        switch (category.period) {
          case 'daily':
            return entryDate.isSame(now, 'day');
          case 'weekly':
            return entryDate.isSame(now, 'week');
          default:
            return true;
        }
      });

      localStorage.setItem(
        `${this.STORAGE_KEY}-${category.id}`,
        JSON.stringify(filteredEntries)
      );
    }
  }
}