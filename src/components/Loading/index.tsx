import React from 'react';

import { Container } from './styles';

import weatherImg from '../../utils/weatherImages';

const Loading: React.FC = () => {
  return (
    <Container>
      <img src={weatherImg.s} alt="Loading" />
    </Container>
  );
};

export default Loading;
