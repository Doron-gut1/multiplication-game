// src/types/gameState.ts
import { Task } from './tasks';
import { ShopItem, Achievement, Currency } from './rewards';

// מצב השחקן
export interface PlayerState {
  currency: Currency;
  inventory: ShopItem[];
  achievements: Achievement[];
  currentStreak: number;
  bestStreak: number;
  totalCorrectAnswers: number;
  level: {
    current: number;
    xp: number;
    nextLevelXp: number;
    totalXp: number;
    medals: {
      bronze: number;
      silver: number;
      gold: number;
      platinum: number;
    };
  };
  experience: number;
  goals: {
    daily: {
      tasksCompleted: number;
      targetTasks: number;
      lastUpdated: Date;
    };
    weekly: {
      tasksCompleted: number;
      targetTasks: number;
      lastUpdated: Date;
    };
  };
  equippedItems: {
    [key: string]: string[];
  };
}

// מצב המשחק
export interface GameState {
  activeTasks: Record<string, Task>;
  isPlaying: boolean;
  showShop: boolean;
  showAchievements: boolean;
}