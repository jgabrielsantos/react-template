import { useCacheContext } from '../../hooks/useSystemContext';

export const useDashboard = () => {
  const { hookCacheContextState } = useCacheContext();

  return {
    hookCacheContextState,
  };
};
