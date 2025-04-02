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

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 2rem;
  text-align: center;
  color: #dc3545;
`;

export function App() {
  const [stages, setStages] = useState<StageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [activeTags, setActiveTags] = useState<string[]>([]);

  useEffect(() => {
    async function loadIssues() {
      try {
        const { issues, stageField } = await fetchIssues('hirosystems', 'hiro-experience-map', 1);
        const updatedStages = groupIssuesByStage(issues, stageField);
        setStages(updatedStages);
      } catch (err) {
        console.error('Error loading issues:', err);
        setError(err instanceof Error ? err.message : 'Failed to load issues');
      } finally {
        setLoading(false);
      }
    }

    loadIssues();
  }, []);

  // Handle ESC key to clear active tags
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveTags([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleTagClick = (tag: string) => {
    setActiveTags(prev => {
      if (prev.includes(tag)) {
        // Remove tag if already active
        return prev.filter(t => t !== tag);
      } else {
        // Add tag if not active
        return [...prev, tag];
      }
    });
  };

  if (loading) {
    return (
      <AppWrapper>
        <LoadingMessage>Loading experience map...</LoadingMessage>
      </AppWrapper>
    );
  }

  if (error) {
    return (
      <AppWrapper>
        <ErrorMessage>
          <h2>Error Loading Experience Map</h2>
          <p>{error}</p>
          <p>Please try refreshing the page.</p>
        </ErrorMessage>
      </AppWrapper>
    );
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
            activeTags={activeTags}
            onTagClick={handleTagClick}
          />
        ))}
      </StagesGrid>
    </AppWrapper>
  );
}
