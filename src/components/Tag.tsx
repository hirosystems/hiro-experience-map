import styled from 'styled-components';
import { IconProps } from '@phosphor-icons/react';

const TagWrapper = styled.div<{ $variant?: 'default' | 'pill'; $isActive?: boolean }>`
  display: flex;
  align-items: center;
  background-color: ${props => props.$isActive ? 'rgb(202, 232, 255)' : 'rgb(239, 239, 239)'};
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.$isActive ? 'rgb(153, 216, 255)' : 'rgb(239, 239, 239)'};
  border-radius: ${props => props.$variant === 'pill' ? '50px' : '50px'};
  padding: 4px 8px;
  font-size: 12px;
  color: ${props => props.$isActive ? 'rgb(30, 88, 124)' : '#666'};
  cursor: pointer;

  &:hover {
    background-color: ${props => props.$isActive ? 'rgb(188, 226, 255)' : 'rgb(229, 229, 229)'};
    border-color: ${props => props.$isActive ? 'rgb(153, 216, 255)' : 'rgb(229, 229, 229)'};
  }
`;

const IconWrapper = styled.span<{ $isActive?: boolean }>`
  display: inline-flex;
  align-items: center;
  margin-right: 4px;
  color: ${props => props.$isActive ? 'rgb(71, 137, 177)' : '#888'};
`;

interface TagProps {
  text: string;
  icon: React.ForwardRefExoticComponent<IconProps>;
  variant?: 'default' | 'pill';
  isActive?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export function Tag({ text, icon: Icon, variant = 'default', isActive = false, onClick }: TagProps) {
  return (
    <TagWrapper $variant={variant} $isActive={isActive} onClick={onClick}>
      <IconWrapper $isActive={isActive}>
        <Icon size={16} />
      </IconWrapper>
      {text}
    </TagWrapper>
  );
} 