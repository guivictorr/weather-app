import React from 'react';

import { ProgressContainer } from './styles';

interface ProgressProps {
  percentage: number;
}

const Progress: React.FC<ProgressProps> = ({ percentage }) => {
  return (
    <ProgressContainer percentage={percentage}>
      <header>
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </header>
      <main className="progress-container">
        <div> </div>
      </main>
      <footer>
        <span>%</span>
      </footer>
    </ProgressContainer>
  );
};

export default Progress;
