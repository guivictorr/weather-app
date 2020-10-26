import React from 'react';

import GlobalStyle from './styles/Global';
import Home from './pages/Home';
import AppProvider from './context';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <AppProvider>
        <Home />
      </AppProvider>
    </>
  );
};

export default App;
