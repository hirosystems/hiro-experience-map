import styled from 'styled-components';
import { IconProps } from '@phosphor-icons/react';

const TagWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 6px;
  padding: 4px 8px;
  margin: 0 4px 4px 0;
  font-size: 0.875rem;
  color: #666;
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 6px;
  color: #888;
`;

interface TagProps {
  text: string;
  icon: React.ForwardRefExoticComponent<IconProps>;
}

export function Tag({ text, icon: Icon }: TagProps) {
  return (
    <TagWrapper>
      <IconWrapper>
        <Icon size={16} />
      </IconWrapper>
      {text}
    </TagWrapper>
  );
} 