import { useMemo } from 'react';

type TextDirection = 'rtl' | 'ltr';

interface TextDirectionOptions {
  forceDirection?: TextDirection;
  isNumber?: boolean;
  isMathExpression?: boolean;
}

export const useTextDirection = (text: string, options: TextDirectionOptions = {}) => {
  const { forceDirection, isNumber, isMathExpression } = options;

  return useMemo(() => {
    // אם נדרש כיוון מסוים
    if (forceDirection) {
      return {
        direction: forceDirection,
        className: `text-${forceDirection}`,
        style: { direction: forceDirection }
      };
    }

    // עבור מספרים
    if (isNumber) {
      return {
        direction: 'ltr' as const,
        className: 'text-ltr',
        style: { direction: 'ltr', unicodeBidi: 'bidi-override' }
      };
    }

    // עבור ביטויים מתמטיים
    if (isMathExpression) {
      return {
        direction: 'ltr' as const,
        className: 'math-expression',
        style: { direction: 'ltr', unicodeBidi: 'isolate' }
      };
    }

    // בדיקת הגדרות ברירת מחדל לפי התוכן
    const hasRTL = /[֐-׿]/.test(text); // בדיקת תווים עבריים
    const direction = hasRTL ? 'rtl' : 'ltr';

    return {
      direction,
      className: `text-${direction}`,
      style: { direction }
    };
  }, [text, forceDirection, isNumber, isMathExpression]);
};
