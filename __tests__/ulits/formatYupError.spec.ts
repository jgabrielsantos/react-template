// @ts-nocheck
import { LOGIN } from '../../src/pages/Login/const';
import { formatYupError } from '../../src/utils';

describe('formatYupError', () => {
  it('should format Yup error array into { email: errorMessage, password: errorMessage }', () => {
    const yupErrors = [
      {
        path: 'email',
        message: LOGIN.ERRORS.EMAIL,
      },
      {
        path: 'password',
        message: LOGIN.ERRORS.PASSWORD,
      },
    ];

    const expectedFormattedError = {
      email: LOGIN.ERRORS.EMAIL,
      password: LOGIN.ERRORS.PASSWORD,
    };

    expect(formatYupError(yupErrors)).toEqual(expectedFormattedError);
  });
});
