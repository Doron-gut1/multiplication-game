// src/types/levelSystem.ts

export interface LevelPerk {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: 'bonus' | 'unlock' | 'reward';
  value: number;
}

export interface Level {
  number: number;
  requiredXP: number;
  perks: LevelPerk[];
  title: string;
}

export interface LevelProgress {
  currentLevel: number;
  currentXP: number;
  totalXP: number;
  nextLevelXP: number;
  progress: number; // 0-100
}
