export type TipCategory = 'basic' | 'intermediate' | 'advanced';

export interface Tip {
  id: string;
  title: string;
  description: string;
  category: TipCategory;
  example: string;
  visualAid?: string;
  multiplier: number;
}

export const tips: Tip[] = [
  {
    id: 'tip-1',
    title: 'כפל ב-1',
    description: 'כל מספר כפול 1 שווה לעצמו. זה כמו לקחת את המספר פעם אחת.',
    category: 'basic',
    example: '7 × 1 = 7',
    visualAid: 'המספר נשאר אותו דבר',
    multiplier: 1
  },
  {
    id: 'tip-2',
    title: 'כפל ב-2',
    description: 'כפל ב-2 הוא כמו לחבר את המספר לעצמו. זה כמו לקחת את אותה כמות פעמיים.',
    category: 'basic',
    example: '4 × 2 = 8 (4+4)',
    visualAid: 'חיבור המספר לעצמו',
    multiplier: 2
  },
  {
    id: 'tip-5',
    title: 'כפל ב-5',
    description: 'כפל ב-5 הוא חצי מהכפל ב-10. התשובה תמיד מסתיימת ב-0 או ב-5.',
    category: 'basic',
    example: '4 × 5 = 20 (חצי מ-40)',
    visualAid: 'חצי מהכפל ב-10',
    multiplier: 5
  },
  {
    id: 'tip-10',
    title: 'כפל ב-10',
    description: 'כשכופלים ב-10, פשוט מוסיפים 0 בסוף המספר.',
    category: 'basic',
    example: '5 × 10 = 50',
    visualAid: 'הוספת אפס בסוף המספר',
    multiplier: 10
  },
  {
    id: 'tip-3',
    title: 'כפל ב-3',
    description: 'כפל ב-3 הוא כמו לחבר את המספר שלוש פעמים.',
    category: 'intermediate',
    example: '4 × 3 = 12 (4+4+4)',
    visualAid: 'חיבור המספר שלוש פעמים',
    multiplier: 3
  },
  {
    id: 'tip-4',
    title: 'כפל ב-4',
    description: 'כפל ב-4 הוא כמו להכפיל ב-2 פעמיים.',
    category: 'intermediate',
    example: '3 × 4 = 12 ((3×2)×2)',
    visualAid: 'הכפלה כפולה ב-2',
    multiplier: 4
  },
  {
    id: 'tip-9',
    title: 'כפל ב-9',
    description: 'בכפל ב-9, ספרת האחדות יורדת (9,8,7...) וספרת העשרות עולה (0,1,2...).',
    category: 'advanced',
    example: '7 × 9 = 63',
    visualAid: 'טריק האצבעות לכפל ב-9',
    multiplier: 9
  },
  {
    id: 'tip-square',
    title: 'כפל מספר בעצמו',
    description: 'כשכופלים מספר בעצמו (למשל 6×6), זה נקרא ריבוע.',
    category: 'advanced',
    example: '6 × 6 = 36',
    visualAid: 'חשוב על זה כמו ריבוע עם אותו מספר שורות ועמודות',
    multiplier: 0
  }
];