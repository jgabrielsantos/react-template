import { object, string } from 'yup';
import { LoginValidationPropTypes } from './types';
import { LOGIN } from './const';

const loginSchema = object({
  email: string().email(LOGIN.ERRORS.EMAIL).required(LOGIN.ERRORS.EMAIL),
  password: string().required(LOGIN.ERRORS.PASSWORD),
});

export const validationLogin = async (
  { email, password }: LoginValidationPropTypes,
) => loginSchema.validate({ email, password }, { abortEarly: false });
