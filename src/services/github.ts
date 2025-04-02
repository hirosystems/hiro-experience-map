import { StageData } from '../types';
import { stageMetadata } from '../data/stageMetadata';
import { GitHubIssue, StageField, GitHubFieldValue } from '../types/github';

export async function fetchIssues(owner: string, repo: string, projectNumber: number): Promise<{
  issues: GitHubIssue[];
  stageField: StageField | null;
}> {
  const response = await fetch('/api/github-data');

  if (!response.ok) {
    throw new Error(`Failed to fetch issues: ${response.statusText}`);
  }

  const data = await response.json();
  
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

  const stageField = project.fields?.nodes?.find(
    (field: StageField) => field.name === 'Developer Journey Stage'
  ) || null;

  const filteredIssues = items
    .map((node: { content?: GitHubIssue }) => node.content)
    .filter((content: GitHubIssue | undefined): content is GitHubIssue => content !== null);

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
      (value: GitHubFieldValue) => value.field?.name === 'Developer Journey Stage'
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