import { IconProps } from '@phosphor-icons/react';
import styled from 'styled-components';

const CardWrapper = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Title = styled.h3`
  margin: 0 0 0.5rem 0;
`;

const Description = styled.p`
  margin: 0;
  color: #666;
`;

interface CardProps {
  title: string;
  description: string;
  icon: React.ForwardRefExoticComponent<IconProps>;
}

export function Card({ title, description, icon: Icon }: CardProps) {
  return (
    <CardWrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </CardWrapper>
  );
} 