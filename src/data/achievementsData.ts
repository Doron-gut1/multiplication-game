// src/data/achievementsData.ts
import type { Achievement } from '../types/achievements';

export const achievements: Achievement[] = [
  {
    id: 'streak-3',
    name: 'התחלה טובה',
    description: 'השג 3 תשובות נכונות ברצף',
    type: 'streak',
    category: 'streaks',
    icon: '🔥',
    requirement: {
      type: 'streak',
      value: 3
    },
    reward: {
      xp: 50,
      coins: 50,
      medal: {
        type: 'bronze',
        name: 'מתחיל מבטיח'
      }
    },
    progress: 0,
    isCompleted: false,
    isVisible: true
  },
  {
    id: 'streak-5',
    name: 'רצף מרשים',
    description: 'השג 5 תשובות נכונות ברצף',
    type: 'streak',
    category: 'streaks',
    icon: '🌟',
    requirement: {
      type: 'streak',
      value: 5
    },
    reward: {
      xp: 100,
      coins: 100,
      stars: 1,
      medal: {
        type: 'silver',
        name: 'שומר על רצף'
      }
    },
    progress: 0,
    isCompleted: false,
    isVisible: true
  },
  {
    id: 'streak-10',
    name: 'אלוף הרצף',
    description: 'השג 10 תשובות נכונות ברצף',
    type: 'streak',
    category: 'streaks',
    icon: '👑',
    requirement: {
      type: 'streak',
      value: 10
    },
    reward: {
      xp: 200,
      coins: 200,
      stars: 2,
      medal: {
        type: 'gold',
        name: 'מלך הרצף'
      }
    },
    progress: 0,
    isCompleted: false,
    isVisible: true
  },
  {
    id: 'daily-5',
    name: 'שגרת אימונים',
    description: 'פתור 5 תרגילים ביום',
    type: 'daily',
    category: 'daily',
    icon: '📅',
    requirement: {
      type: 'daily_tasks',
      value: 5
    },
    reward: {
      xp: 75,
      coins: 75
    },
    progress: 0,
    isCompleted: false,
    isVisible: true
  },
  {
    id: 'progress-10',
    name: 'צעדים ראשונים',
    description: 'פתור 10 תרגילים בסך הכל',
    type: 'progress',
    category: 'progress',
    icon: '👣',
    requirement: {
      type: 'correct_answers',
      value: 10
    },
    reward: {
      xp: 100,
      coins: 100
    },
    progress: 0,
    isCompleted: false,
    isVisible: true
  }
];