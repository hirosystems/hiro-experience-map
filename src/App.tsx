import styled from 'styled-components';
import { Stage } from './components/Stage';
import { fetchIssues, groupIssuesByStage } from './services/github';
import { useEffect, useState } from 'react';
import { StageData } from './types';
import './styles/globals.css';

const AppWrapper = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color:rgb(235, 235, 235);
`;

interface StagesGridProps {
  $stageCount: number;
}

const StagesGrid = styled.div<StagesGridProps>`
  flex: 1;
  display: flex;
  overflow-x: auto;
  height: 100%;
`;

export function App() {
  const [stages, setStages] = useState<StageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    async function loadIssues() {
      try {
        const owner = process.env.REACT_APP_GITHUB_OWNER || 'hirosystems';
        const repo = process.env.REACT_APP_GITHUB_REPO || 'hiro-experience-map';
        const projectNumber = parseInt(process.env.REACT_APP_GITHUB_PROJECT_NUMBER || '1', 10);
        
        const { issues, stageField } = await fetchIssues(owner, repo, projectNumber);
        const updatedStages = groupIssuesByStage(issues, stageField);
        setStages(updatedStages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load issues');
      } finally {
        setLoading(false);
      }
    }

    loadIssues();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (stages.length === 0) {
    return <div>No stages found. Please check your GitHub project configuration.</div>;
  }

  return (
    <AppWrapper>
      <StagesGrid $stageCount={stages.length}>
        {stages.map((stage, index) => (
          <Stage 
            key={index} 
            {...stage} 
            $headerHeight={headerHeight}
            onHeaderHeightChange={(height: number) => {
              setHeaderHeight(prev => Math.max(prev, height));
            }}
          />
        ))}
      </StagesGrid>
    </AppWrapper>
  );
}
