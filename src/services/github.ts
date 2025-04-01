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

// Static data that will be included in the build
const staticData = {
  data: {
    repository: {
      id: "1",
      name: "hiro-experience-map",
      projectsV2: {
        nodes: [{
          number: 58,
          title: "Experience Map",
          items: {
            nodes: []
          }
        }]
      }
    }
  }
};

export const getProjectData = async (): Promise<StageData[]> => {
  // Use static data instead of making API calls
  const project = staticData.data.repository.projectsV2.nodes[0];
  const issues = project.items.nodes
    .map((item: any) => item.content)
    .filter((content: any) => content !== null) as GitHubIssue[];

  return Object.entries(stageMetadata).map(([stageName, metadata]) => ({
    title: stageName,
    description: '', // Add descriptions if needed
    color: metadata.color,
    stage: [stageName],
    actions: metadata.actions,
    touchpoints: metadata.touchpoints || [],
    painPoints: issues
      .filter((issue) => issue.labels.nodes.some((label) => label.name === stageName))
      .map((issue) => ({
        title: issue.title,
        description: issue.body || '',
        issueNumber: issue.number,
        url: issue.url,
        status: issue.state,
        labels: issue.labels.nodes.map(label => label.name)
      }))
  }));
};

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
    const metadata = stageMetadata[stageName] || {
      color: '#E1E4E8',
      actions: [],
      touchpoints: []
    };

    stageMap.set(stageName, {
      title: stageName,
      description: option.description || '',
      color: metadata.color,
      stage: [], // This could be populated from a separate field if needed
      actions: metadata.actions,
      touchpoints: [...(metadata.touchpoints || [])], // Initialize with metadata touchpoints, fallback to empty array
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

      // Find the Category field value
      const categoryFieldValue = fieldValues.find(
        (field: any) => field.field?.name === 'Category'
      );
      
      // Debug logging for Category field
      console.log(`Issue ${issue.number} Category field:`, categoryFieldValue);
      
      // Only process issues with Category = "Pain Point"
      if (!categoryFieldValue || categoryFieldValue.optionId !== 'd68c4b4b') {
        console.log(`Skipping issue ${issue.number} - Category is not "Pain Point"`);
        return;
      }

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