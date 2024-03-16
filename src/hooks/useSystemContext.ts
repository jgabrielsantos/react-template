import { useContext } from 'react';
import { SystemContext } from '../context';

export const useSystemContext = () => {
  const { contextState, contextDispatcher } = useContext(SystemContext);

  return {
    contextState,
    contextDispatcher,
  };
};
