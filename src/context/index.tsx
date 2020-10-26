import React from 'react';

import { ContextProvider } from './weatherData';

const AppProvider: React.FC = ({ children }) => {
  return <ContextProvider>{children}</ContextProvider>;
};

export default AppProvider;
