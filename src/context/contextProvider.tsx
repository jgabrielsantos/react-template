import React, {
  useMemo,
  useReducer,
} from 'react';
import { useContextReducer } from '../reducer';
import { SystemContext } from './systemContext';
import { ContextReducerType } from '../reducer/types';

type CacheProviderPropTypes = {
  children: React.ReactNode
}

export const ContextProvider = ({ children }: Readonly<CacheProviderPropTypes>) => {
  const [contextState, contextDispatcher] = useReducer(useContextReducer, {} as ContextReducerType);

  const stateMemoed = useMemo(() => ({
    contextState,
    contextDispatcher,
  }), [contextState]);
  return (
    <SystemContext.Provider value={stateMemoed}>
      {children}
    </SystemContext.Provider>
  );
};
