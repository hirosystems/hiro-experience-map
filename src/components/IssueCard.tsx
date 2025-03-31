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
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: #24292e;
`;

const LabelContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

interface IssueCardProps {
  title: string;
  url: string;
  labels?: string[];
}

const IssueCard: React.FC<IssueCardProps> = ({ title, url, labels }) => {
  return (
    <Card href={url} target="_blank" rel="noopener noreferrer">
      <Title>{title}</Title>
      {labels && labels.length > 0 && (
        <LabelContainer>
          {labels.map((label, index) => (
            <Tag 
              key={index}
              text={label}
              icon={getIconForTouchpoint(label)}
            />
          ))}
        </LabelContainer>
      )}
    </Card>
  );
};

export default IssueCard; 