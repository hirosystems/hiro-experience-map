import { Tag } from "./Tag";
import IssueCard from "./IssueCard";
import styled from "styled-components";
import { Info, Plus, Minus } from "@phosphor-icons/react";
import { StageData } from "../types";
import { useRef, useEffect, useState } from "react";
import { getIconForTouchpoint } from "../utils/touchpointIcons";

const StageWrapper = styled.div`
  border-right: 1px solid rgb(234, 234, 234);
  display: flex;
  flex-direction: column;
  background: white;
  height: 100vh;
  width: 375px;
  flex-shrink: 0;
  overflow-y: auto;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const Header = styled.div<{ $backgroundColor: string; $headerHeight?: number }>`
  padding: 1rem;
  background-color: ${(props) => props.$backgroundColor};
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  flex: 1;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.3;
  white-space: normal;
`;

const Section = styled.div`
  padding: 1rem;
  background: white;
  border-bottom: 1px solid rgb(234, 234, 234);
  display: flex;
  flex-direction: column;

  &:first-child {
    min-height: 230px;
  }

  &:nth-child(2) {
    min-height: 225px;
  }

  &:last-child {
    background: #f8f9fa;
    flex: 1;
  }

  /* Add some spacing between cards in the pain points section */
  > * + * {
    margin-bottom: 0.5rem;
  }
`;

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  color: rgb(144, 144, 144);
  font-size: 12px;
  font-weight: 500;
`;

const List = styled.ul`
  margin: 0;
  padding-left: 1rem;
  flex: 1;
  min-height: 0;

  li {
    line-height: 1.3;
    margin-bottom: 6px;
    color: #333;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

const Description = styled.div<{ $isExpanded: boolean }>`
  margin-top: ${(props) => (props.$isExpanded ? "1rem" : "0")};
  max-height: ${(props) => (props.$isExpanded ? "200px" : "0")};
  opacity: ${(props) => (props.$isExpanded ? "1" : "0")};
  overflow: hidden;
  transition: all 0.3s ease;
  color: rgba(0, 0, 0, 0.7);
  font-size: 14px;
  line-height: 1.5;
`;

const ToggleIcon = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.5);
  transition: color 0.2s;

  &:hover {
    color: rgba(0, 0, 0, 0.8);
  }
`;

interface StageProps extends Omit<StageData, "stage"> {
  $headerHeight?: number;
  onHeaderHeightChange?: (height: number) => void;
}

export function Stage({
  title,
  description,
  color,
  actions,
  touchpoints,
  painPoints,
  $headerHeight,
  onHeaderHeightChange,
}: StageProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (headerRef.current && onHeaderHeightChange) {
      onHeaderHeightChange(headerRef.current.offsetHeight);
    }
  }, [onHeaderHeightChange, title, description, isExpanded]);

  return (
    <StageWrapper>
      <Header
        ref={headerRef}
        $backgroundColor={color}
        $headerHeight={$headerHeight}
      >
        <TitleContainer>
          <Title>{title}</Title>
          {description && (
            <ToggleIcon onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? (
                <Minus size={16} weight="bold" />
              ) : (
                <Plus size={16} weight="bold" />
              )}
            </ToggleIcon>
          )}
        </TitleContainer>
        {description && (
          <Description $isExpanded={isExpanded}>{description}</Description>
        )}
      </Header>

      <Content>
        <Section>
          <SectionTitle>Activities</SectionTitle>
          <List>
            {actions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </List>
        </Section>

        <Section>
          <SectionTitle>Touchpoints</SectionTitle>
          <TagContainer>
            {touchpoints.map((item, index) => (
              <Tag
                key={index}
                text={item}
                variant="pill"
                icon={getIconForTouchpoint(item)}
              />
            ))}
          </TagContainer>
        </Section>

        <Section>
          <SectionTitle>Pain Points</SectionTitle>
          {painPoints.map((painPoint, index) => (
            <IssueCard
              key={index}
              title={painPoint.title}
              url={painPoint.url}
              labels={painPoint.labels}
              tagVariant="pill"
            />
          ))}
        </Section>
      </Content>
    </StageWrapper>
  );
}
