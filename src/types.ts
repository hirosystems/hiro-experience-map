export interface StageData {
  title: string;
  color: string;
  stage: string[];
  actions: string[];
  touchpoints: string[];
  painPoints: Array<{
    title: string;
    description: string;
  }>;
} 