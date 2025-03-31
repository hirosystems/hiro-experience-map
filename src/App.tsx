import styled from 'styled-components';
import { Stage } from './components/Stage';
import { stages } from './data/stages';
import './styles/globals.css';

const AppWrapper = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const StagesGrid = styled.div`
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(${stages.length}, minmax(300px, 1fr));
  grid-template-rows: 64px auto auto auto 1fr;
  overflow-x: auto;
  background: #f5f5f5;
`;

export function App() {
  return (
    <AppWrapper>
      <StagesGrid>
        {stages.map((stage, index) => (
          <Stage key={index} {...stage} />
        ))}
      </StagesGrid>
    </AppWrapper>
  );
}
