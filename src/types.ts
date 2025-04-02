export interface StageData {
  title: string;
  description?: string;
  color: string;
  stage?: string[];
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
  issues?: Array<{
    number: number;
    title: string;
    url: string;
    state: string;
    body?: string;
    labels?: {
      nodes?: Array<{
        name: string;
        color: string;
      }>;
    };
    projectItems?: {
      nodes?: Array<{
        fieldValues?: {
          nodes?: Array<{
            field?: {
              name: string;
              dataType: string;
              options?: Array<{
                id: string;
                name: string;
              }>;
            };
            optionId?: string;
            text?: string;
            number?: number;
            date?: string;
            iterationId?: string;
          }>;
        };
      }>;
    };
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
  touchpoints?: string[];
} 