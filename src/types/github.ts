export interface GitHubLabel {
  name: string;
  color: string;
}

export interface GitHubFieldValue {
  field: {
    name: string;
    dataType: string;
    options?: Array<{
      id: string;
      name: string;
    }>;
  };
  value?: string;
  text?: string;
  optionId?: string;
  number?: number;
  date?: string;
  iterationId?: string;
}

export interface GitHubProjectItem {
  fieldValues: {
    nodes: GitHubFieldValue[];
  };
}

export interface GitHubIssue {
  number: number;
  title: string;
  url: string;
  state: string;
  body?: string;
  labels?: {
    nodes?: GitHubLabel[];
  };
  projectItems?: {
    nodes?: GitHubProjectItem[];
  };
}

export interface StageField {
  name: string;
  dataType: string;
  options?: Array<{
    id: string;
    name: string;
    description?: string;
  }>;
}

export interface GitHubResponse {
  data?: {
    organization?: {
      projectV2?: {
        fields?: {
          nodes?: StageField[];
        };
        items?: {
          nodes?: Array<{
            content?: GitHubIssue;
          }>;
        };
      };
    };
  };
  errors?: Array<{
    message: string;
  }>;
} 