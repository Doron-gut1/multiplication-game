// src/data/tutorialSteps.ts
import { TutorialStep } from '../types/tutorial';

export const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: "ברוכים הבאים ללוח הכפל",
    content: "בואו נלמד איך לזכור את לוח הכפל בקלות ובכיף! נתחיל עם הכללים הבסיסיים ביותר.",
    visualAid: {
      type: 'numberLine',
      props: {
        number: 1,
        repeat: 1,
        animate: true
      }
    }
  },
  {
    id: 2,
    title: "כפל ב-2: פשוט להכפיל",
    content: "כפל ב-2 זה כמו לחבר את המספר לעצמו. למשל: 4×2 זה כמו 4+4",
    visualAid: {
      type: 'grid',
      props: {
        rows: 2,
        columns: 4,
        highlightCells: true,
        animate: true
      }
    }
  },
  {
    id: 3,
    title: "כפל ב-5: חצי מכפל ב-10",
    content: "כפל ב-5 תמיד נותן תוצאה שמסתיימת ב-0 או ב-5. זה בדיוק חצי מהכפל ב-10!",
    visualAid: {
      type: 'pattern',
      props: {
        pattern: "5,10,15,20,25",
        highlightInterval: 5,
        animate: true
      }
    }
  },
  {
    id: 4,
    title: "בואו נתרגל!",
    content: "עכשיו כשלמדנו את הכללים הבסיסיים, בואו נתרגל אותם במשחק!",
    visualAid: {
      type: 'grid',
      props: {
        rows: 5,
        columns: 5,
        highlightCells: true,
        animate: true
      }
    }
  }
];