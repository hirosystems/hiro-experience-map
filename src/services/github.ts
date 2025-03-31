import { StageData } from '../types';

interface GitHubIssue {
  number: number;
  title: string;
  url: string;
  state: string;
  labels: {
    nodes: Array<{
      name: string;
      color: string;
    }>;
  };
  projectItems: {
    nodes: Array<{
      fieldValues: {
        nodes: Array<{
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
        }>;
      };
    }>;
  };
  body?: string;
}

interface ProjectNode {
  number: number;
  title: string;
}

const PROJECT_QUERY = `
  query($owner: String!, $repo: String!, $projectNumber: Int!) {
    repository(owner: $owner, name: $repo) {
      id
      name
      projectsV2(first: 10) {
        nodes {
          number
          title
        }
      }
      projectV2(number: $projectNumber) {
        id
        title
        fields(first: 20) {
          nodes {
            ... on ProjectV2Field {
              name
              dataType
            }
            ... on ProjectV2SingleSelectField {
              name
              dataType
              options {
                id
                name
              }
            }
            ... on ProjectV2FieldCommon {
              name
              dataType
            }
          }
        }
        items(first: 100) {
          nodes {
            content {
              ... on Issue {
                number
                title
                url
                state
                labels(first: 10) {
                  nodes {
                    name
                    color
                  }
                }
                projectItems(first: 1) {
                  nodes {
                    fieldValues(first: 10) {
                      nodes {
                        ... on ProjectV2ItemFieldTextValue {
                          field {
                            ... on ProjectV2Field {
                              name
                              dataType
                            }
                          }
                          text
                        }
                        ... on ProjectV2ItemFieldSingleSelectValue {
                          field {
                            ... on ProjectV2SingleSelectField {
                              name
                              dataType
                              options {
                                id
                                name
                              }
                            }
                          }
                          optionId
                        }
                        ... on ProjectV2ItemFieldNumberValue {
                          field {
                            ... on ProjectV2Field {
                              name
                              dataType
                            }
                          }
                          number
                        }
                        ... on ProjectV2ItemFieldDateValue {
                          field {
                            ... on ProjectV2Field {
                              name
                              dataType
                            }
                          }
                          date
                        }
                        ... on ProjectV2ItemFieldIterationValue {
                          field {
                            ... on ProjectV2Field {
                              name
                              dataType
                            }
                          }
                          iterationId
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

interface StageField {
  name: string;
  dataType: string;
  options?: Array<{
    id: string;
    name: string;
  }>;
}

interface StageMetadata {
  color: string;
  actions: string[];
  touchpoints: string[];
}

// Default metadata for stages if not found in GitHub
const defaultStageMetadata: Record<string, StageMetadata> = {
  'Discovery': {
    color: '#E8F5E9',
    actions: ['Initial research', 'Explore documentation', 'Join community'],
    touchpoints: ['Stacks Documentation', 'Discord Community', 'Developer Tools']
  },
  'Research: Stacks & Hiro': {
    color: '#E3F2FD',
    actions: ['Review documentation', 'Explore example projects', 'Understand architecture'],
    touchpoints: ['Hiro Dev Tools', 'Stacks API', 'GitHub Repositories']
  },
  'Evaluate: The Stacks Ecosystem': {
    color: '#F3E5F5',
    actions: ['Evaluate API endpoints', 'Research integration options', 'Review partner solutions'],
    touchpoints: ['API Documentation', 'Integration Guides', 'Partner Directory']
  },
  'Evaluate: Tooling & Resources': {
    color: '#FFF3E0',
    actions: ['Review available tools', 'Assess SDK capabilities', 'Evaluate development resources'],
    touchpoints: ['Stacks Explorer', 'Development SDKs', 'API Documentation']
  },
  'Learn: Examples & Tutorials': {
    color: '#E8EAF6',
    actions: ['Follow tutorials', 'Practice coding', 'Build sample projects'],
    touchpoints: ['Tutorial Documentation', 'Sample Code', 'Learning Resources']
  },
  'Experiment: Test Project': {
    color: '#E0F2F1',
    actions: ['Set up development environment', 'Create test project', 'Implement basic features'],
    touchpoints: ['Development Environment', 'Testing Framework', 'Code Editor']
  },
  'Build: Project Planning': {
    color: '#FCE4EC',
    actions: ['Create project plan', 'Define requirements', 'Set up project structure'],
    touchpoints: ['Project Management Tools', 'Documentation', 'Planning Templates']
  },
  'Build: Setup & Configuration': {
    color: '#F1F8E9',
    actions: ['Configure development environment', 'Set up build process', 'Initialize project structure'],
    touchpoints: ['Development Tools', 'Build Scripts', 'Configuration Files']
  },
  'Build: Core Development': {
    color: '#E1F5FE',
    actions: ['Implement features', 'Write tests', 'Debug and optimize'],
    touchpoints: ['IDE', 'Testing Tools', 'Debugging Tools']
  },
  'Build: Validate & Iterate': {
    color: '#F3E5F5',
    actions: ['Run tests', 'Collect feedback', 'Make improvements'],
    touchpoints: ['Testing Framework', 'Feedback Tools', 'Version Control']
  },
  'Build: Launch & Monitor': {
    color: '#FFF3E0',
    actions: ['Deploy application', 'Monitor performance', 'Address issues'],
    touchpoints: ['Deployment Tools', 'Monitoring Systems', 'Analytics']
  },
  'Market & Generate Support': {
    color: '#E8EAF6',
    actions: ['Implement marketing plan', 'Engage with community', 'Provide support'],
    touchpoints: ['Marketing Platforms', 'Community Tools', 'Support Systems']
  },
  'Scale & Grow': {
    color: '#E0F2F1',
    actions: ['Monitor metrics', 'Optimize performance', 'Scale infrastructure'],
    touchpoints: ['Analytics Tools', 'Scaling Solutions', 'Monitoring Systems']
  }
};

export async function fetchIssues(owner: string, repo: string, projectNumber: number): Promise<{
  issues: GitHubIssue[];
  stageField: StageField | null;
}> {
  const token = process.env.REACT_APP_GITHUB_TOKEN;
  
  if (!token) {
    throw new Error('GitHub token not found. Please add REACT_APP_GITHUB_TOKEN to your .env file.');
  }

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: PROJECT_QUERY,
      variables: {
        owner,
        repo,
        projectNumber,
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to fetch issues: ${errorData.message || response.statusText}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(`GraphQL Error: ${data.errors[0].message}`);
  }

  const repository = data.data?.repository;
  if (!repository) {
    throw new Error(`Repository ${owner}/${repo} not found or no access to repository`);
  }

  const project = repository.projectV2;
  if (!project) {
    const availableProjects = repository.projectsV2?.nodes || [];
    const projectList = availableProjects
      .filter((p: ProjectNode | null): p is ProjectNode => p !== null)
      .map((p: ProjectNode) => `${p.number}: ${p.title}`)
      .join(', ');
    throw new Error(`Project ${projectNumber} not found or no access to project. Available projects: ${projectList}`);
  }

  const items = project.items?.nodes || [];
  const stageField = project.fields?.nodes?.find(
    (field: StageField) => field.name === 'Developer Journey Stage'
  ) || null;

  return {
    issues: items
      .map((node: any) => node.content)
      .filter((content: any): content is GitHubIssue => content !== null),
    stageField
  };
}

export function groupIssuesByStage(issues: GitHubIssue[], stageField: StageField | null): StageData[] {
  if (!stageField?.options) {
    console.warn('No stage field options found in GitHub project');
    return [];
  }

  // Create a map of stage titles to stage data
  const stageMap = new Map<string, StageData>();
  
  // Initialize stages from GitHub options
  stageField.options.forEach(option => {
    const stageName = option.name;
    const metadata = defaultStageMetadata[stageName] || {
      color: '#E8F5E9',
      actions: [],
      touchpoints: []
    };

    stageMap.set(stageName, {
      title: stageName,
      color: metadata.color,
      stage: [], // This could be populated from a separate field if needed
      actions: metadata.actions,
      touchpoints: [], // We'll populate this from issue labels
      painPoints: []
    });
  });

  // Group issues by their Developer Journey Stage field value
  issues.forEach(issue => {
    try {
      const projectItem = issue.projectItems.nodes[0];
      if (!projectItem) return;

      const fieldValues = projectItem.fieldValues.nodes;
      if (!fieldValues || fieldValues.length === 0) return;

      // Find the Developer Journey Stage field
      const stageFieldValue = fieldValues.find(
        (field: any) => field.field?.name === 'Developer Journey Stage'
      );
      
      if (!stageFieldValue) return;

      // Get the option ID and find the corresponding option name
      const optionId = stageFieldValue.optionId;
      if (!optionId) return;

      const option = stageField.options?.find(opt => opt.id === optionId);
      if (!option) return;

      const stageName = option.name;
      if (stageMap.has(stageName)) {
        const stage = stageMap.get(stageName)!;
        
        // Add issue to pain points
        stage.painPoints.push({
          title: issue.title,
          description: issue.body || '',
          issueNumber: issue.number,
          url: issue.url,
          status: issue.state,
          labels: issue.labels.nodes.map((label: { name: string; color: string }) => label.name)
        });

        // Add issue labels to touchpoints (if not already present)
        issue.labels.nodes.forEach(label => {
          if (!stage.touchpoints.includes(label.name)) {
            stage.touchpoints.push(label.name);
          }
        });
      }
    } catch (error) {
      console.error(`Error processing issue ${issue.number}:`, error);
    }
  });

  return Array.from(stageMap.values());
} 