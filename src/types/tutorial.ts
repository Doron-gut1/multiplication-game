// src/types/tutorial.ts
export type TutorialStatus = 'not_started' | 'in_progress' | 'completed';

export interface TutorialProps {
  onComplete?: () => void;
}

export interface TutorialStep {
  id: number;
  title: string;
  content: string;
  visualAid: VisualAidConfig;
}

export type VisualAidType = 'grid' | 'numberLine' | 'pattern';

export interface VisualAidConfig {
  type: VisualAidType;
  props: GridProps | NumberLineProps | PatternVisualizerProps;
}

export interface TutorialState {
  currentStep: number;
  totalSteps: number;
  status: TutorialStatus;
  completedSteps: number[];
}

// Visual Aid Props Types
export interface GridProps {
  rows: number;
  columns: number;
  highlightCells?: boolean;
  animate?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export interface NumberLineProps {
  number: number;
  repeat?: number;
  animate?: boolean;
}

export interface PatternVisualizerProps {
  pattern: string;
  highlightInterval?: number;
  animate?: boolean;
}