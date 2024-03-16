// @ts-nocheck
import { SIGN_UP } from '../../../src/pages/SignUp/const';
import { userAccountValidation } from '../../../src/pages/SignUp/validation';

const validAccount = {
  email: 'test@example.com',
  password: 'Password123!',
  firstName: 'John',
  lastName: 'Doe',
};

describe('Create Account Validations', () => {
  it('should validate login credentials with valid email and password', async () => {
    await expect(userAccountValidation(validAccount)).resolves.toEqual(validAccount);
  });

  it('should throw validation error for missing email', async () => {
    const invalidCredentials = {
      ...validAccount,
      email: '',
    };

    await expect(userAccountValidation(invalidCredentials)).rejects.toThrow(SIGN_UP.ERRORS.EMAIL);
  });

  it('should throw validation error for invalid email format', async () => {
    const invalidCredentials = {
      ...validAccount,
      email: 'invalid-email',
    };

    await expect(userAccountValidation(invalidCredentials)).rejects.toThrow(SIGN_UP.ERRORS.EMAIL);
  });

  it('should throw validation error for missing password', async () => {
    const invalidCredentials = {
      ...validAccount,
      password: '',
    };

    await expect(userAccountValidation(invalidCredentials)).rejects.toThrow(SIGN_UP.ERRORS.PASSWORD);
  });

  it('should throw validation error for missing first name', async () => {
    const invalidCredentials = {
      ...validAccount,
      firstName: '',
    };

    await expect(userAccountValidation(invalidCredentials)).rejects.toThrow(SIGN_UP.ERRORS.FIRST_NAME);
  });

  it('should throw validation error for missing last name', async () => {
    const invalidCredentials = {
      ...validAccount,
      lastName: '',
    };

    await expect(userAccountValidation(invalidCredentials)).rejects.toThrow(SIGN_UP.ERRORS.LAST_NAME);
  });
});
