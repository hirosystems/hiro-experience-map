export interface StageData {
  title: string;
  description: string;
  color: string;
  stage: string[];
  actions: string[];
  touchpoints: string[];
  painPoints: Array<{
    title: string;
    description: string;
    issueNumber: number;
    url: string;
    status?: string;
    labels?: string[];
  }>;
}

export interface PainPoint {
  title: string;
  description: string;
  issueNumber: number;
  url: string;
  status?: string;
  labels?: string[];
}

export interface StageMetadata {
  color: string;
  actions: string[];
} 