import React from 'react';
import styled from 'styled-components';
import { Tag } from './Tag';
import { getIconForTouchpoint } from '../utils/touchpointIcons';

const Card = styled.a`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  background-color: white;
  text-decoration: none;
  color: inherit;

  &:hover {
    border-color:rgb(199, 199, 199);

    h3 {
      text-decoration: underline;
    }
  }
`;

const Title = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 14px;
  font-weight: 600;
  color: #24292e;
  line-height: 130%;
`;

const LabelContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
`;

interface IssueCardProps {
  title: string;
  url: string;
  labels?: string[];
  tagVariant?: 'default' | 'pill';
  activeTags: string[];
  onTagClick: (tag: string) => void;
}

const IssueCard: React.FC<IssueCardProps> = ({ 
  title, 
  url, 
  labels = [], 
  tagVariant,
  activeTags,
  onTagClick
}) => {
  const handleTagClick = (label: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onTagClick(label);
  };

  return (
    <Card href={url} target="_blank" rel="noopener noreferrer">
      <Title>{title}</Title>
      {labels.length > 0 && (
        <LabelContainer>
          {labels.map((label, index) => (
            <Tag 
              key={index}
              text={label}
              icon={getIconForTouchpoint(label)}
              variant={tagVariant}
              isActive={activeTags.includes(label)}
              onClick={handleTagClick(label)}
            />
          ))}
        </LabelContainer>
      )}
    </Card>
  );
};

export default IssueCard; 