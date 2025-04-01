import styled from 'styled-components';
import { IconProps } from '@phosphor-icons/react';

const TagWrapper = styled.div<{ $variant?: 'default' | 'pill' }>`
  display: flex;
  align-items: center;
  background-color:rgb(239, 239, 239);
  border-radius: ${props => props.$variant === 'pill' ? '50px' : '4px'};
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 400;
  color: #666;
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 4px;
  color: #888;
`;

interface TagProps {
  text: string;
  icon: React.ForwardRefExoticComponent<IconProps>;
  variant?: 'default' | 'pill';
}

export function Tag({ text, icon: Icon, variant = 'default' }: TagProps) {
  return (
    <TagWrapper $variant={variant}>
      <IconWrapper>
        <Icon size={16} />
      </IconWrapper>
      {text}
    </TagWrapper>
  );
} 