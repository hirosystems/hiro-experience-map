import { Card } from './Card';
import { Tag } from './Tag';
import styled from 'styled-components';
import { Star, Gear, Browser, Terminal, Database, Code, Globe, ChartLine, Icon } from '@phosphor-icons/react';
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

const Header = styled.div<{ backgroundColor: string }>`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  background-color: ${props => props.backgroundColor};
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

const List = styled.ul`
  margin: 0;
  padding-left: 1.5rem;
  
  li {
    margin-bottom: 0.5rem;
    
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
      <Header backgroundColor={color}>
        <Title>{title}</Title>
      </Header>
      <Section>
        <List>
          {stage.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </List>
      </Section>
      
      <Section>
        <List>
          {actions.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </List>
      </Section>
      
      <Section>
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
      
      <Section>
        {painPoints.map((painPoint, index) => (
          <Card 
            key={index}
            title={painPoint.title}
            description={painPoint.description}
            icon={Star}
          />
        ))}
      </Section>
    </StageWrapper>
  );
} 