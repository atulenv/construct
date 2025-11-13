
import React, { createContext, ReactNode, useContext, useState } from 'react';

type StateShape = Record<string, unknown>;

type StateContextType = {
  state: StateShape;
  setState: React.Dispatch<React.SetStateAction<StateShape>>;
} | undefined;

const StateContext = createContext<StateContextType>(undefined);

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<StateShape>({});

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
