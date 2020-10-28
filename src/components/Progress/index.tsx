import React from 'react';

import { Container } from './styles';

const Progress: React.FC = () => {
  return (
    <Container>
      <header>
        <p>0</p>
        <p>50</p>
        <p>100</p>
      </header>
      <main>
        <div />
      </main>
      <footer>
        <p>%</p>
      </footer>
    </Container>
  );
};

export default Progress;
