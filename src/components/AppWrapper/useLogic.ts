import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { checkForCookie } from '../../utils';
import { ENVIRONMENT } from '../../config/environment';
import { useCacheContext, useFetch } from '../../hooks';

export const useAppWrapper = () => {
  const navigate = useNavigate();

  const { hookCacheContextState, hookCacheContextDispatcher } = useCacheContext();

  const freshUser = async (session: string) => {
    // const { status, data } = await useFetch({
    //   method: 'GET',
    //   path: `/auth/refresh/${session}`,
    // });

    const { status, data } = await Promise.resolve({
      status: 200,
      data: {
        user: {},
        tokens: {},
      },
    });

    if (status === 200) {
      const date = new Date(new Date(Date.now() + 15 * 60 * 1000));
      document.cookie = `${ENVIRONMENT.APP.SESSION_COOKIE_NAME}=${data.tokens.accessToken}; expires=${date.toUTCString()} path=/; SameSite=none;secure`;

      hookCacheContextDispatcher({
        type: 'updateUser',
        data: { ...data.user },
      });

      hookCacheContextDispatcher({
        type: 'updateToken',
        data: { ...data.tokens },
      });
      return;
    }

    navigate('/', {
      replace: true,
    });
  };

  const validateUserSession = () => {
    const session = checkForCookie(ENVIRONMENT.APP.SESSION_COOKIE_NAME);
    if (!session.exist) navigate('/login');

    if (!hookCacheContextState.user.id) freshUser(session.value);
  };

  useEffect(() => {
    validateUserSession();
  }, []);

  return {
    validateUserSession,
  };
};
