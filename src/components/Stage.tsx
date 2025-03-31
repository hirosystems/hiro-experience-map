import { Tag } from "./Tag";
import IssueCard from "./IssueCard";
import styled from "styled-components";
import {
  Gear,
  Browser,
  Terminal,
  Database,
  Code,
  Globe,
  ChartLine,
  Icon,
  Users,
  Info,
} from "@phosphor-icons/react";
import { StageData } from "../types";
import { useRef, useEffect } from "react";
import { getIconForTouchpoint } from "../utils/touchpointIcons";

const StageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-right: 1px solid #eee;
  height: 100%;
  min-width: 375px;
  overflow: hidden;
`;

const Header = styled.div<{ $backgroundColor: string; $headerHeight?: number }>`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  background-color: ${(props) => props.$backgroundColor};
  border-right: 1px solid #eee;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  line-height: 1.3;
  white-space: normal;
`;

const Description = styled.p`
  margin: 0.25rem 0 0;
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.7);
  white-space: normal;
  line-height: 1.5;
`;

const Section = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  background: white;
  flex-shrink: 0;

  &:last-child {
    border-bottom: none;
    background: #f8f9fa;
    flex: 1;
    display: flex;
    flex-direction: column;
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

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InfoIcon = styled(Info)`
  cursor: help;
  color: rgba(0, 0, 0, 0.5);
  transition: color 0.2s;

  &:hover {
    color: rgba(0, 0, 0, 0.8);
  }
`;

const Tooltip = styled.div`
  position: absolute;
  background: white;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.7);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-width: 300px;
  white-space: normal;
  line-height: 1.5;
  display: none;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
`;

const InfoContainer = styled.div`
  position: relative;

  &:hover ${Tooltip} {
    display: block;
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

  useEffect(() => {
    if (headerRef.current && onHeaderHeightChange) {
      onHeaderHeightChange(headerRef.current.offsetHeight);
    }
  }, [onHeaderHeightChange, title, description]);

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
            <InfoContainer>
              <InfoIcon size={16} weight="bold" />
              <Tooltip>{description}</Tooltip>
            </InfoContainer>
          )}
        </TitleContainer>
      </Header>

      <Content>
        <Section>
          <SectionTitle>Actions</SectionTitle>
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
              <Tag key={index} text={item} icon={getIconForTouchpoint(item)} />
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
            />
          ))}
        </Section>
      </Content>
    </StageWrapper>
  );
}
