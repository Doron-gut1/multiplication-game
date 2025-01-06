import { useEffect, useCallback, useRef } from 'react';

interface PerformanceMetrics {
  fps: number;
  memoryUsage?: number;
  renderTime: number;
}

interface GamePerformanceOptions {
  targetFPS?: number;
  maxMemoryUsage?: number;
  onPerformanceIssue?: (metrics: PerformanceMetrics) => void;
}

export const useGamePerformance = (options: GamePerformanceOptions = {}) => {
  const {
    targetFPS = 60,
    maxMemoryUsage = 50, // MB
    onPerformanceIssue
  } = options;

  const frameRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const metricsRef = useRef<PerformanceMetrics>({ fps: 0, renderTime: 0 });

  // מדידת FPS
  const measureFPS = useCallback(() => {
    const now = performance.now();
    const delta = now - lastFrameTimeRef.current;
    
    if (delta >= 1000) { // חישוב כל שנייה
      const fps = Math.round((frameRef.current * 1000) / delta);
      metricsRef.current.fps = fps;
      
      // בדיקת ביצועים
      if (fps < targetFPS * 0.8) { // אם ה-FPS נמוך מ-80% מהיעד
        onPerformanceIssue?.(metricsRef.current);
      }

      frameRef.current = 0;
      lastFrameTimeRef.current = now;
    } else {
      frameRef.current++;
    }

    requestAnimationFrame(measureFPS);
  }, [targetFPS, onPerformanceIssue]);

  // מדידת זמן רינדור
  const measureRenderTime = useCallback(() => {
    const start = performance.now();
    return () => {
      const renderTime = performance.now() - start;
      metricsRef.current.renderTime = renderTime;

      // בדיקת זמן רינדור ארוך
      if (renderTime > 16.67) { // יותר מ-60fps
        onPerformanceIssue?.(metricsRef.current);
      }
    };
  }, [onPerformanceIssue]);

  // מדידת שימוש בזיכרון
  const measureMemoryUsage = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const usageInMB = Math.round(memory.usedJSHeapSize / 1048576);
      metricsRef.current.memoryUsage = usageInMB;

      if (usageInMB > maxMemoryUsage) {
        onPerformanceIssue?.(metricsRef.current);
      }
    }
  }, [maxMemoryUsage, onPerformanceIssue]);

  // התחלת מדידות
  useEffect(() => {
    requestAnimationFrame(measureFPS);
    const memoryInterval = setInterval(measureMemoryUsage, 1000);

    return () => {
      clearInterval(memoryInterval);
    };
  }, [measureFPS, measureMemoryUsage]);

  return {
    getMetrics: () => ({ ...metricsRef.current }),
    measureRenderTime
  };
};
