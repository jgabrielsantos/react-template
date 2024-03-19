import { useSystemContext } from '../../hooks/useSystemContext';

export const useDashboard = () => {
  const { contextState } = useSystemContext();

  return {
    contextState,
  };
};
