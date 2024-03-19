import { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import { validationLogin } from './validation';
import { useFetch, useSystemContext } from '../../hooks';
import { PATH, formatYupError } from '../../utils';
import { LOGIN } from './const';
import { LoginReducerTypes, useLoginReducer } from './reducer';
import { ENVIRONMENT } from '../../config/environment';

export const useLogin = () => {
  const navigate = useNavigate();
  const { contextDispatcher } = useSystemContext();
  const [loginState, loginDispatcher] = useReducer(useLoginReducer, {} as LoginReducerTypes);

  const useLoginHandler = async () => {
    try {
      await validationLogin({ email: loginState.email, password: loginState.password });

      // const { status, data } = await useFetch({
      //   method: 'POST',
      //   path: '/auth',
      //   body: {
      //     email,
      //     password,
      //   },
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
        try {
          const date = new Date(new Date(Date.now() + 15 * 60 * 1000));

          document.cookie = `${ENVIRONMENT.APP.SESSION_COOKIE_NAME}=${data.tokens.accessToken}; expires=${date.toUTCString()} path=/; SameSite=none;secure`;

          contextDispatcher({
            type: 'UPDATE_USER',
            data: { user: { ...data.user } },
          });

          contextDispatcher({
            type: 'UPDATE_TOKEN',
            data: { tokens: { ...data.tokens } },
          });

          navigate(PATH.get('HOME').URL);
        } catch (error) {
          console.error('Failed to update user session.', error);
        }
      } else {
        if (status !== 400) loginDispatcher({ type: 'UPDATE_ERRORS', data: { ...loginState.errors, default: LOGIN.ERRORS.DEFAULT } });
        if (status === 400) loginDispatcher({ type: 'UPDATE_ERRORS', data: { ...loginState.errors, default: LOGIN.ERRORS.USER } });
      }
    } catch (error: any) {
      if (error.inner) {
        const formatedErrors = formatYupError(error.inner);
        loginDispatcher({ type: 'UPDATE_ERRORS', data: { ...formatedErrors } });
      }
    }
  };

  useEffect(() => {
    const updateError = { ...loginState.errors };
    delete updateError.email;
    loginDispatcher({ type: 'UPDATE_ERRORS', data: updateError });
  }, [loginState.email]);

  useEffect(() => {
    const updateError = { ...loginState.errors };
    delete updateError.password;
    loginDispatcher({ type: 'UPDATE_ERRORS', data: updateError });
  }, [loginState.password]);

  return {
    loginState,
    loginDispatcher,
    useLoginHandler,
  };
};
