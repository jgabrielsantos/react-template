import { useNavigate } from 'react-router-dom';
import { ENVIRONMENT } from '../../config/environment';
import { useSystemContext } from '../../hooks/useSystemContext';
import { PATH } from '../../utils';

export const useSideMenu = () => {
  const navigate = useNavigate();
  const { contextState } = useSystemContext();

  const handleLogout = () => {
    document.cookie = `${ENVIRONMENT.APP.SESSION_COOKIE_NAME}=; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/`;
    navigate(PATH.get('LOGIN').URL);
  };

  return {
    handleLogout,
    contextState,
  };
};
