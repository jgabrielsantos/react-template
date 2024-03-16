import { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks';
import { userAccountValidation } from './validation';
import { useSignupReducer } from './reducer';
import { INIT_SIGN_UP_ACCOUNT, SIGN_UP } from './const';
import { formatYupError } from '../../utils';

export const useSignup = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [validOnBlur, setValidOnBlur] = useState(false);

  const [createAccountState, createAccountDispatcher] = useReducer(useSignupReducer, INIT_SIGN_UP_ACCOUNT);

  const updateFormHandler = (data: Record<string, any>) => createAccountDispatcher({ data });

  const createAccountHandler = async () => {
    try {
      await userAccountValidation(createAccountState);

      const { status, data } = await useFetch({
        method: 'POST',
        path: '/signup',
        body: {
          ...createAccountState,
        },
      });

      if (status === 204) {
        navigate('/login', {
          replace: true,
        });
      } else {
        if (status === 500) {
          setErrors({ ...errors, default: SIGN_UP.ERRORS.ACCOUNT });
          return;
        }

        if (status === 400) {
          if (data.errorFields) {
            const errorFormat = formatYupError(data.errorFields);
            setErrors({ ...errors, ...errorFormat });
            return;
          }
        }

        setErrors({ ...errors, default: SIGN_UP.ERRORS.DEFAULT });
      }
    } catch (error: any) {
      if (error.inner) {
        const formatedErrors = formatYupError(error.inner);
        setErrors(formatedErrors);
        setValidOnBlur(true);
      }
    }
  };

  const validateForm = async () => {
    try {
      await userAccountValidation(createAccountState);
      setErrors({});
    } catch (error: any) {
      if (error.inner) {
        const formatedErrors = formatYupError(error.inner);
        setErrors(formatedErrors);
      }
    }
  };

  useEffect(() => {
    if (!validOnBlur) return;

    validateForm();
  }, [createAccountState]);

  return {
    createAccountState,
    updateFormHandler,
    createAccountHandler,
    errors,
  };
};
