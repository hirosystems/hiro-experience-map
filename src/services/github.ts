import { StageData } from '../types';
import { stageMetadata } from '../data/stageMetadata';

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
                description
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
    description?: string;
  }>;
}

export async function fetchIssues(owner: string, repo: string, projectNumber: number): Promise<{
  issues: GitHubIssue[];
  stageField: StageField | null;
}> {
  console.log('Fetching issues with params:', { owner, repo, projectNumber });
  
  const response = await fetch('/api/github-data');

  if (!response.ok) {
    throw new Error(`Failed to fetch issues: ${response.statusText}`);
  }

  const data = await response.json();
  console.log('Received GitHub data:', {
    hasData: !!data.data,
    hasOrganization: !!data.data?.organization,
    hasProject: !!data.data?.organization?.projectV2,
    hasFields: !!data.data?.organization?.projectV2?.fields,
    hasItems: !!data.data?.organization?.projectV2?.items,
    fieldCount: data.data?.organization?.projectV2?.fields?.nodes?.length,
    itemCount: data.data?.organization?.projectV2?.items?.nodes?.length
  });
  
  if (data.errors) {
    console.error('GraphQL errors:', data.errors);
    throw new Error(`GraphQL Error: ${data.errors[0].message}`);
  }

  const organization = data.data?.organization;
  if (!organization) {
    console.error('Organization not found:', owner);
    throw new Error(`Organization ${owner} not found or no access to organization`);
  }

  const project = organization.projectV2;
  if (!project) {
    console.error('Project not found:', projectNumber);
    throw new Error(`Project ${projectNumber} not found or no access to project`);
  }

  const items = project.items?.nodes || [];
  console.log('Found items:', items.length);

  const stageField = project.fields?.nodes?.find(
    (field: StageField) => field.name === 'Developer Journey Stage'
  ) || null;

  const filteredIssues = items
    .map((node: any) => node.content)
    .filter((content: any): content is GitHubIssue => content !== null);

  return {
    issues: filteredIssues,
    stageField
  };
}

export function groupIssuesByStage(issues: GitHubIssue[], stageField: StageField | null): StageData[] {
  if (!stageField) {
    console.warn('No stage field found in GitHub project');
    return [];
  }

  if (!stageField.options) {
    console.warn('No stage field options found in GitHub project');
    return [];
  }

  // Create a map of stage titles to stage data
  const stageMap = new Map<string, StageData>();
  
  // Initialize stages from GitHub options
  stageField.options.forEach(option => {
    const stageName = option.name;
    const metadata = stageMetadata[stageName] || {
      color: '#E1E4E8',
      actions: [],
    };
    
    stageMap.set(stageName, {
      title: stageName,
      description: option.description || '',
      color: metadata.color,
      actions: metadata.actions,
      touchpoints: metadata.touchpoints || [],
      painPoints: [],
      issues: [],
    });
  });

  // Group issues by stage
  issues.forEach(issue => {
    const projectItem = issue.projectItems?.nodes?.[0];
    if (!projectItem) return;

    const fieldValues = projectItem.fieldValues?.nodes || [];
    const stageValue = fieldValues.find(
      (value: any) => value.field?.name === 'Developer Journey Stage'
    );

    if (!stageValue) return;

    if (stageValue.optionId && stageField.options) {
      const stageOption = stageField.options.find(opt => opt.id === stageValue.optionId);
      if (stageOption) {
        const stage = stageMap.get(stageOption.name);
        if (stage?.issues) {
          stage.issues.push(issue);
        }
      }
    }
  });

  // Convert map to array and sort by stage order
  return Array.from(stageMap.values());
} 