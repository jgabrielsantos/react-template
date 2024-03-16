import { object, string } from 'yup';
import { SignupBasicPropTypes } from './types';
import { SIGN_UP } from './const';

const userAccountSchema = object({
  firstName: string().required(SIGN_UP.ERRORS.FIRST_NAME),
  lastName: string().required(SIGN_UP.ERRORS.LAST_NAME),
  email: string().email(SIGN_UP.ERRORS.EMAIL).required(SIGN_UP.ERRORS.EMAIL),
  password: string().required(SIGN_UP.ERRORS.PASSWORD),
});

export const userAccountValidation = async ({
  email, password, lastName, firstName,
}: SignupBasicPropTypes) => (userAccountSchema.validate({
  email, password, firstName, lastName,
}, { abortEarly: false })
);
