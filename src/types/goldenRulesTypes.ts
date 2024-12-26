// src/types/goldenRulesTypes.ts
import { VisualAidType } from './tutorial';
import { GridProps, NumberLineProps, PatternVisualizerProps } from './tutorial';

export interface GoldenRule {
  id: number;
  title: string;
  description: string;
  example: string;
  visualType: VisualAidType;
  visualProps: GridProps | NumberLineProps | PatternVisualizerProps;
  tips: string[];
}