// src/data/shopItems.ts
import { ShopItem } from '../types/rewards';

export const shopItems: ShopItem[] = [
  // פריטים לפרה
  {
    id: 'cowboy-hat',
    name: 'כובע קאובוי',
    description: 'כובע קאובוי מסוגנן לפרה שלך',
    type: 'accessory',
    price: {
      coins: 100
    },
    target: 'cow',
    icon: '🤠',
    rarity: 'common',
    isUnlocked: true,
    stackable: true
  },
  {
    id: 'cow-bells',
    name: 'פעמוני פרה',
    description: 'פעמונים מצלצלים לפרה',
    type: 'accessory',
    price: {
      coins: 150
    },
    target: 'cow',
    icon: '🔔',
    rarity: 'rare',
    isUnlocked: true,
    stackable: true
  },

  // פריטים לכבשה
  {
    id: 'wool-sweater',
    name: 'סוודר צמר',
    description: 'סוודר חמים לכבשה',
    type: 'accessory',
    price: {
      coins: 120
    },
    target: 'sheep',
    icon: '🧥',
    rarity: 'common',
    isUnlocked: true,
    stackable: true
  },

  // פריטים לתרנגול
  {
    id: 'crown',
    name: 'כתר מלכותי',
    description: 'כתר מלכותי לתרנגול',
    type: 'accessory',
    price: {
      coins: 200,
      stars: 1
    },
    target: 'chicken',
    icon: '👑',
    rarity: 'epic',
    isUnlocked: true,
    stackable: true
  },

  // פריטים לכל החיות
  {
    id: 'rainbow-aura',
    name: 'הילת קשת',
    description: 'הילת קשת קסומה',
    type: 'special',
    price: {
      stars: 3
    },
    target: 'all',
    icon: '🌈',
    rarity: 'legendary',
    isUnlocked: false,
    stackable: false,
    position: {
      offsetY: -10,
      scale: 1.2
    }
  },

  // פריטים לרקע החווה
  {
    id: 'rainbow',
    name: 'קשת בענן',
    description: 'קשת צבעונית בשמי החווה',
    type: 'background',
    price: {
      stars: 2
    },
    target: 'farm',
    icon: '🌈',
    rarity: 'epic',
    isUnlocked: true,
    stackable: false
  }
];

// קטגוריות חנות
export const shopCategories = [
  { id: 'all', name: 'הכל' },
  { id: 'accessory', name: 'אביזרים' },
  { id: 'background', name: 'רקעים' },
  { id: 'special', name: 'מיוחדים' }
];