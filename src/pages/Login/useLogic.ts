import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ENVIRONMENT } from '../../config/environment';
import { validationLogin } from './validation';
import { useFetch } from '../../hooks';
import { useCacheContext } from '../../hooks/useSystemContext';
import { formatYupError } from '../../utils';
import { LOGIN } from './const';

export const useLogin = () => {
  const navigate = useNavigate();
  const { hookCacheContextDispatcher } = useCacheContext();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      await validationLogin({ email, password });

      const { status, data } = await useFetch({
        method: 'POST',
        path: '/auth',
        body: {
          email,
          password,
        },
      });

      if (status !== 200) {
        if (status !== 400) setErrors({ ...errors, default: LOGIN.ERRORS.DEFAULT });
        if (status === 400) setErrors({ ...errors, default: LOGIN.ERRORS.USER });
      } else {
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

        navigate('/', {
          replace: true,
        });
      }
    } catch (error: any) {
      if (error.inner) {
        const formatedErrors = formatYupError(error.inner);
        setErrors(formatedErrors);
      }
    }
  };

  useEffect(() => {
    const updateError = { ...errors };
    delete updateError.email;
    setErrors(updateError);
  }, [email]);

  useEffect(() => {
    const updateError = { ...errors };
    delete updateError.password;
    setErrors(updateError);
  }, [password]);

  return {
    email,
    emailHandler,
    password,
    passwordHandler,
    handleLogin,

    errors,
  };
};
