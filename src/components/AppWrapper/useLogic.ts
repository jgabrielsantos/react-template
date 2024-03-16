import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { faker } from '@faker-js/faker';
import {
  PATH, checkForCookie, userSession,
} from '../../utils';
import { ENVIRONMENT } from '../../config/environment';
import { useSystemContext, useFetch } from '../../hooks';

export const useAppWrapper = () => {
  const navigate = useNavigate();

  const { contextState } = useSystemContext();

  const getUser = async (session: string) => {
    // const { status, data } = await useFetch({
    //   method: 'GET',
    //   path: `/auth/refresh/${session}`,
    // });

    const { status, data } = await Promise.resolve({
      status: 200,
      data: {
        user: {
          id: faker.string.uuid(),
          email: faker.internet.email(),
          name: faker.person.fullName(),
          createdAt: faker.date.anytime().toString(),
        },
        tokens: {
          accessToken: 'accessToken',
          refreshToken: 'refreshToken',
        },
      },
    });

    if (status === 200) {
      userSession({ data });
    } else {
      navigate(PATH.get('ROOT').URL, {
        replace: true,
      });
    }
  };

  const validateUserSession = () => {
    const session = checkForCookie(ENVIRONMENT.APP.SESSION_COOKIE_NAME);
    if (!session.exist) navigate(PATH.get('LOGIN').URL);

    if (!contextState.user.id) getUser(session.value);
  };

  useEffect(() => {
    validateUserSession();
  }, []);

  return {
    validateUserSession,
  };
};
