// @ts-nocheck
import { LOGIN } from '../../../src/pages/Login/const';
import { validationLogin } from '../../../src/pages/Login/validation';

describe('validationLogin', () => {
  it('should validate login credentials with valid email and password', async () => {
    const validCredentials = {
      email: 'test@example.com',
      password: 'Password123!',
    };
    await expect(validationLogin(validCredentials)).resolves.toEqual(validCredentials);
  });

  it('should throw validation error for missing email', async () => {
    const invalidCredentials = {
      email: '',
      password: 'Password123!',
    };

    await expect(validationLogin(invalidCredentials)).rejects.toThrow(LOGIN.ERRORS.EMAIL);
  });

  it('should throw validation error for invalid email format', async () => {
    const invalidCredentials = {
      email: 'invalid-email',
      password: 'Password123!',
    };

    await expect(validationLogin(invalidCredentials)).rejects.toThrow(LOGIN.ERRORS.EMAIL);
  });

  it('should throw validation error for missing password', async () => {
    const invalidCredentials = {
      email: 'test@example.com',
      password: '',
    };

    await expect(validationLogin(invalidCredentials)).rejects.toThrow(LOGIN.ERRORS.PASSWORD);
  });
});
