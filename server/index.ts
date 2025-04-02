import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Verify environment variables are set
const requiredEnvVars = [
  'HIRO_GITHUB_TOKEN',
  'HIRO_GITHUB_OWNER',
  'HIRO_GITHUB_REPO',
  'HIRO_GITHUB_PROJECT_NUMBER'
] as const;

requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

interface GitHubResponse {
  data?: {
    organization?: {
      projectV2?: {
        fields?: {
          nodes?: Array<{
            name: string;
            dataType: string;
            options?: Array<{
              id: string;
              name: string;
              description?: string;
            }>;
          }>;
        };
        items?: {
          nodes?: Array<{
            content?: {
              id: string;
              title: string;
              body: string;
              state: string;
              createdAt: string;
              updatedAt: string;
              labels?: {
                nodes: Array<{
                  name: string;
                  color: string;
                }>;
              };
              projectItems?: {
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
            };
          }>;
        };
      };
    };
  };
  errors?: Array<{
    message: string;
  }>;
}

// GitHub API endpoint
app.get('/api/github-data', async (_req: Request, res: Response) => {
  try {
    console.log('Fetching GitHub data...');
    console.log('Using token:', process.env.HIRO_GITHUB_TOKEN ? 'Token exists' : 'No token found');
    console.log('Owner:', process.env.HIRO_GITHUB_OWNER);
    console.log('Project number:', process.env.HIRO_GITHUB_PROJECT_NUMBER);

    const query = `
      query {
        organization(login: "${process.env.HIRO_GITHUB_OWNER}") {
          projectV2(number: ${process.env.HIRO_GITHUB_PROJECT_NUMBER}) {
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
              }
            }
            items(first: 100) {
              nodes {
                content {
                  ... on Issue {
                    id
                    title
                    body
                    state
                    createdAt
                    updatedAt
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

    console.log('GraphQL Query:', query);

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HIRO_GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub API error response:', errorText);
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    const data = await response.json() as GitHubResponse;
    
    if (data.errors) {
      console.error('GitHub GraphQL errors:', data.errors);
      throw new Error(`GitHub API Error: ${data.errors[0].message}`);
    }

    // Log the response structure
    console.log('Response structure:', {
      hasOrganization: !!data.data?.organization,
      hasProject: !!data.data?.organization?.projectV2,
      hasFields: !!data.data?.organization?.projectV2?.fields,
      hasItems: !!data.data?.organization?.projectV2?.items,
      fieldCount: data.data?.organization?.projectV2?.fields?.nodes?.length,
      itemCount: data.data?.organization?.projectV2?.items?.nodes?.length
    });

    // Log the fields to help debug
    if (data.data?.organization?.projectV2?.fields?.nodes) {
      console.log('Available fields:', data.data.organization.projectV2.fields.nodes.map(f => ({
        name: f.name,
        dataType: f.dataType,
        hasOptions: !!f.options,
        optionsCount: f.options?.length
      })));
    }

    // Log a sample item to help debug
    if (data.data?.organization?.projectV2?.items?.nodes?.[0]?.content) {
      const sampleItem = data.data.organization.projectV2.items.nodes[0].content;
      console.log('Sample item:', {
        title: sampleItem.title,
        state: sampleItem.state,
        hasLabels: !!sampleItem.labels,
        labelCount: sampleItem.labels?.nodes?.length,
        hasProjectItems: !!sampleItem.projectItems,
        projectItemCount: sampleItem.projectItems?.nodes?.length
      });
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    res.status(500).json({ 
      error: 'Failed to fetch GitHub data',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('Environment variables loaded:', {
    hasToken: !!process.env.HIRO_GITHUB_TOKEN,
    owner: process.env.HIRO_GITHUB_OWNER,
    projectNumber: process.env.HIRO_GITHUB_PROJECT_NUMBER
  });
}); 