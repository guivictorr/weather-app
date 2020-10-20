import React from 'react';

import GlobalStyle from './styles/Global';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Home />
    </>
  );
};

export default App;
