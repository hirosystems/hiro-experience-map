import { Tag } from './Tag';
import IssueCard from './IssueCard';
import styled from 'styled-components';
import { Gear, Browser, Terminal, Database, Code, Globe, ChartLine, Icon, List as ListIcon, Target, Users } from '@phosphor-icons/react';
import { StageData } from '../types';

const StageWrapper = styled.div`
  display: grid;
  grid-template-rows: subgrid;
  grid-row: 1 / -1;
  background: white;
  min-width: 300px;
  border-right: 1px solid #eee;

  /* For browsers that don't support subgrid yet */
  @supports not (grid-template-rows: subgrid) {
    grid-template-rows: 64px auto auto auto 1fr;
  }
`;

const Header = styled.div<{ $backgroundColor: string }>`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  background-color: ${props => props.$backgroundColor};
  height: 64px;
  display: flex;
  align-items: center;
  border-right: 1px solid #eee;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  line-height: 1.3;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Section = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  background: white;
  overflow-y: auto;

  &:last-child {
    border-bottom: none;
  }

  /* Add some spacing between cards in the pain points section */
  > * + * {
    margin-top: 0.5rem;
  }
`;

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
`;

const List = styled.ul`
  margin: 0;
  padding-left: 1.5rem;
  
  li {
    margin-bottom: 0.5rem;
    color: #333;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -4px;
  padding: 4px;
`;

// Map of icons to use for different types of touchpoints
const touchpointIcons: Record<string, Icon> = {
  'Documentation': Globe,
  'API': Code,
  'Tools': Gear,
  'Explorer': Browser,
  'Framework': Terminal,
  'Database': Database,
  'Analytics': ChartLine,
  'Community': Users,
  'default': Gear
};

const getIconForTouchpoint = (text: string) => {
  // Check if the text includes any of our known keywords
  const key = Object.keys(touchpointIcons).find(k => text.toLowerCase().includes(k.toLowerCase()));
  return key ? touchpointIcons[key] : touchpointIcons.default;
};

interface StageProps extends StageData {}

export function Stage({ title, color, stage, actions, touchpoints, painPoints }: StageProps) {
  return (
    <StageWrapper>
      <Header $backgroundColor={color}>
        <Title>{title}</Title>
      </Header>
      
      {stage && stage.length > 0 && (
        <Section>
          <SectionTitle>
            Stage Overview
          </SectionTitle>
          <List>
            {stage.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </List>
        </Section>
      )}
      
      {actions && actions.length > 0 && (
        <Section>
          <SectionTitle>
            Actions
          </SectionTitle>
          <List>
            {actions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </List>
        </Section>
      )}
      
      {touchpoints && touchpoints.length > 0 && (
        <Section>
          <SectionTitle>
            Touchpoints
          </SectionTitle>
          <TagContainer>
            {touchpoints.map((item, index) => (
              <Tag 
                key={index}
                text={item}
                icon={getIconForTouchpoint(item)}
              />
            ))}
          </TagContainer>
        </Section>
      )}
      
      {painPoints && painPoints.length > 0 && (
        <Section>
          <SectionTitle>
            Pain Points
          </SectionTitle>
          {painPoints.map((painPoint, index) => (
            <IssueCard
              key={index}
              title={painPoint.title}
              url={painPoint.url}
              labels={painPoint.labels}
            />
          ))}
        </Section>
      )}
    </StageWrapper>
  );
} 