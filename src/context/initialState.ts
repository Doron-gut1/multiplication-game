import { PlayerState, GameState } from '../types/gameState';

export const initialPlayerState: PlayerState = {
  currency: {
    coins: 0,
    stars: 0
  },
  inventory: [],
  achievements: [],
  currentStreak: 0,
  bestStreak: 0,
  totalCorrectAnswers: 0,
  level: {
    current: 1,
    xp: 0,
    nextLevelXp: 100,
    totalXp: 0,
    medals: {
      bronze: 0,
      silver: 0,
      gold: 0,
      platinum: 0
    }
  },
  experience: 0,
  goals: {
    daily: {
      tasksCompleted: 0,
      targetTasks: 10,
      lastUpdated: new Date()
    },
    weekly: {
      tasksCompleted: 0,
      targetTasks: 50,
      lastUpdated: new Date()
    }
  },
  equippedItems: {}
};

export const initialGameState: GameState = {
  activeTasks: {},
  isPlaying: false,
  showShop: false,
  showAchievements: false
};
