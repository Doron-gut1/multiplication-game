// src/data/goldenRulesData.ts
import type { GoldenRule } from '../types/goldenRulesTypes';

export const goldenRules: GoldenRule[] = [
  {
    id: 1,
    title: "כפל ב-1",
    description: "כל מספר כפול 1 שווה לעצמו",
    example: "7 × 1 = 7",
    visualType: "numberLine",
    visualProps: {
      number: 7,
      repeat: 1
    },
    tips: [
      "פשוט לזכור: המספר נשאר אותו דבר",
      "זה כמו לקחת את המספר פעם אחת"
    ]
  },
  {
    id: 2,
    title: "כפל ב-10",
    description: "כשכופלים ב-10, פשוט מוסיפים 0 בסוף המספר",
    example: "5 × 10 = 50",
    visualType: "pattern",
    visualProps: {
      pattern: "10,20,30,40,50",
      highlightInterval: 10
    },
    tips: [
      "הוסף 0 בסוף המספר",
      "כל התוצאות מסתיימות ב-0"
    ]
  },
  {
    id: 3,
    title: "כפל ב-2",
    description: "כפל ב-2 זה כמו לחבר את המספר לעצמו",
    example: "4 × 2 = 8",
    visualType: "grid",
    visualProps: {
      rows: 2,
      columns: 4
    },
    tips: [
      "חשוב על זה כמו חיבור: 4+4=8",
      "זה כמו להכפיל את המספר פי 2"
    ]
  }
];