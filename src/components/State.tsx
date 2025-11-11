
import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext(undefined);

export const StateProvider = ({ children }) => {
  const [state, setState] = useState({});

  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
};

export const useCustomState = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useCustomState must be used within a StateProvider');
  }
  return context;
};
