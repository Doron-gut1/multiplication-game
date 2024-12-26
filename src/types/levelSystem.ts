// src/types/levelSystem.ts

// תצורת XP למשימות שונות
export interface XPConfig {
    // XP בסיסי לפי רמת קושי
    taskCompletion: {
      easy: number;
      medium: number;
      hard: number;
    };
    
    // בונוסים לרצף הצלחות
    streakBonuses: {
      threshold: number;     // כמה תשובות נכונות ברצף
      multiplier: number;    // מכפיל ה-XP
    }[];
    
    // XP להישגים
    achievements: {
      common: number;
      rare: number;
      epic: number;
      legendary: number;
    };
  }
  
  // הטבות לפי רמה
  export interface LevelBenefits {
    // פריטים מיוחדים שנפתחים
    unlockedItems: string[];
    
    // מכפילי תגמולים
    multipliers: {
      xp?: number;
      coins?: number;
      stars?: number;
    };
    
    // הטבות מיוחדות
    specialPerks?: {
      type: 'double_coins' | 'extra_time' | 'hint_chance' | 'bonus_streak';
      value: number;
    }[];
  }
  
  // מידע על רמה ספציפית
  export interface LevelInfo {
    level: number;
    xpRequired: number;
    benefits: LevelBenefits;
  }
  
  // התקדמות השחקן
  export interface LevelProgress {
    currentLevel: number;
    currentXP: number;
    totalXP: number;
    xpToNextLevel: number;
    activeMultipliers: {
      xp: number;
      coins: number;
      stars: number;
    };
    unlockedPerks: string[];
  }
  
  // אירועי מערכת הרמות
  export type LevelSystemEvent = 
    | { type: 'TASK_COMPLETED'; difficulty: 'easy' | 'medium' | 'hard' }
    | { type: 'STREAK_REACHED'; count: number }
    | { type: 'ACHIEVEMENT_UNLOCKED'; rarity: 'common' | 'rare' | 'epic' | 'legendary' }
    | { type: 'LEVEL_UP'; newLevel: number };