// src/types/rewards.ts

// מטבעות
export interface Currency {
  coins: number;
  stars: number;
}

// פריטי חנות
export interface ShopItem {
  id: string;
  name: string;
  description: string;
  type: 'accessory' | 'background' | 'special';
  price: {
    coins?: number;
    stars?: number;
  };
  target: 'all' | 'cow' | 'sheep' | 'chicken' | 'farm';  
  imageUrl?: string;
  icon?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  isUnlocked: boolean;
}

// רמות ומדליות
export interface PlayerLevel {
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
}

// התקדמות השחקן
export interface PlayerProgress {
  currentStreak: number;
  bestStreak: number;
  totalCorrectAnswers: number;
  totalTasksCompleted: number;
  completedAchievements: string[];
  level: PlayerLevel;
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
}

// טיפוסי הישגים
export type AchievementType = 'streak' | 'score' | 'collection' | 'special' | 'progress' | 'daily' | 'weekly';

// מצב הישג
export interface AchievementReward {
  xp: number;
  coins?: number;
  stars?: number;
  item?: string;
  medal?: {
    type: 'bronze' | 'silver' | 'gold' | 'platinum';
    name: string;
  };
}

// הישג מלא
export interface Achievement {
  id: string;
  name: string;
  description: string;
  type: AchievementType;
  category: string;
  icon: string;
  requirement: {
    type: 'streak' | 'correct_answers' | 'daily_tasks' | 'weekly_tasks' | 'time_played';
    value: number;
  };
  reward: AchievementReward;
  progress: number;
  isCompleted: boolean;
  completedAt?: Date;
  isVisible: boolean;
}