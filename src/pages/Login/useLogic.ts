import { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import { validationLogin } from './validation';
import { useFetch } from '../../hooks';
import { PATH, formatYupError, userSession } from '../../utils';
import { LOGIN } from './const';
import { LoginReducerTypes, useLoginReducer } from './reducer';

export const useLogin = () => {
  const navigate = useNavigate();
  const [loginState, loginDispatcher] = useReducer(useLoginReducer, {} as LoginReducerTypes);

  const userLoginHandler = async () => {
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

      if (status !== 200) {
        if (status !== 400) loginDispatcher({ type: 'UPDATE_ERRORS', data: { ...loginState.errors, default: LOGIN.ERRORS.DEFAULT } });
        if (status === 400) loginDispatcher({ type: 'UPDATE_ERRORS', data: { ...loginState.errors, default: LOGIN.ERRORS.USER } });
      } else {
        userSession({ data });

        navigate(PATH.get('ROOT').URL, {
          replace: true,
        });
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
    userLoginHandler,
  };
};
