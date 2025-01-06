// src/services/FeedbackService.ts

export type FeedbackType = 'success' | 'error' | 'info' | 'hint';

export interface Feedback {
  type: FeedbackType;
  message: string;
  details?: string;
  duration?: number;
}

export const CommonMistakes = {
  missingZero: {
    pattern: (answer: number, correct: number) => 
      Math.abs(answer * 10 - correct) < 1 || Math.abs(answer / 10 - correct) < 1,
    message: 'שים לב לאפסים!',
    hint: 'כדאי לבדוק שוב את סדר הגודל של התשובה'
  },
  reversedNumbers: {
    pattern: (answer: number, correct: number) => 
      answer.toString().split('').reverse().join('') === correct.toString(),
    message: 'המספרים הפוכים!',
    hint: 'נסה לבדוק את סדר הספרות שלך'
  },
  // הוספת טעויות נפוצות נוספות
};

export const LearningHints = {
  multipleOfTwo: {
    condition: (a: number) => a === 2,
    hint: 'זכור: כפל ב-2 זה כמו לחבר את המספר לעצמו'
  },
  multipleOfTen: {
    condition: (a: number) => a === 10,
    hint: 'זכור: כפל ב-10 זה כמו להוסיף אפס בסוף'
  },
  multipleOfFive: {
    condition: (a: number) => a === 5,
    hint: 'זכור: כפל ב-5 זה חצי מכפל ב-10'
  }
};

export class FeedbackService {
  static getFeedbackForAnswer(answer: number, correct: number): Feedback {
    // בדיקת תשובה נכונה
    if (answer === correct) {
      return {
        type: 'success',
        message: 'כל הכבוד! תשובה נכונה!',
        duration: 2000
      };
    }

    // בדיקת טעויות נפוצות
    for (const [key, mistake] of Object.entries(CommonMistakes)) {
      if (mistake.pattern(answer, correct)) {
        return {
          type: 'error',
          message: mistake.message,
          details: mistake.hint,
          duration: 3000
        };
      }
    }

    // משוב כללי לתשובה שגויה
    return {
      type: 'error',
      message: 'לא ממש נכון, נסה שוב!',
      details: 'אולי כדאי להיעזר בטיפים שלמדנו?',
      duration: 3000
    };
  }

  static getHintForProblem(a: number, b: number): Feedback | null {
    // בדיקת טיפים רלוונטיים
    for (const hint of Object.values(LearningHints)) {
      if (hint.condition(a) || hint.condition(b)) {
        return {
          type: 'hint',
          message: hint.hint,
          duration: 4000
        };
      }
    }

    return null;
  }
}