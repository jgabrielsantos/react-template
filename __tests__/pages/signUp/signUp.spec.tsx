// @ts-nocheck
import {
  renderHook, act,
} from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { useSignup } from '../../../src/pages/SignUp/useLogic';
import { INIT_SIGN_UP_ACCOUNT, SIGN_UP } from '../../../src/pages/SignUp/const';
import { userAccountValidation } from '../../../src/pages/SignUp/validation';
import { useFetch } from '../../../src/hooks';

const validAccount = {
  email: 'test@example.com',
  password: 'Password123!',
  firstName: 'John',
  lastName: 'Doe',
};

const mockValidationRejection = {
  inner: [
    {
      path: 'firstName',
      message: SIGN_UP.ERRORS.FIRST_NAME,
    },
    {
      path: 'lastName',
      message: SIGN_UP.ERRORS.LAST_NAME,
    },
    {
      path: 'email',
      message: SIGN_UP.ERRORS.EMAIL,
    },
    {
      path: 'password',
      message: SIGN_UP.ERRORS.PASSWORD,
    },
  ],
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../../../src/pages/SignUp/validation');
jest.mock('../../../src/hooks/useFetch');

describe('Sign up Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should init createAccountState with an empty user', () => {
    const { result } = renderHook(() => useSignup());
    expect(result.current.createAccountState).toEqual(INIT_SIGN_UP_ACCOUNT);
  });

  it('should update createAccountState correctly', () => {
    const { result } = renderHook(() => useSignup());

    act(() => {
      result.current.updateFormHandler(validAccount);
    });

    expect(result.current.createAccountState).toEqual(validAccount);
  });

  it('should handle validation error', async () => {
    userAccountValidation.mockRejectedValueOnce(mockValidationRejection);

    const { result } = renderHook(() => useSignup());

    await act(async () => {
      await result.current.createAccountHandler();
    });

    expect(result.current.errors).toEqual({
      firstName: SIGN_UP.ERRORS.FIRST_NAME,
      lastName: SIGN_UP.ERRORS.LAST_NAME,
      email: SIGN_UP.ERRORS.EMAIL,
      password: SIGN_UP.ERRORS.PASSWORD,
    });
  });

  it('should remove email error when email changes', async () => {
    userAccountValidation.mockRejectedValueOnce(mockValidationRejection);

    const { result } = renderHook(() => useSignup());

    await act(async () => {
      await result.current.createAccountHandler();
    });

    await act(async () => {
      userAccountValidation.mockRejectedValueOnce({
        inner: [
          {
            path: 'firstName',
            message: SIGN_UP.ERRORS.FIRST_NAME,
          },
          {
            path: 'lastName',
            message: SIGN_UP.ERRORS.LAST_NAME,
          },
          {
            path: 'password',
            message: SIGN_UP.ERRORS.PASSWORD,
          },
        ],
      });
      result.current.updateFormHandler({ email: 'test@example.com' });
    });

    expect(result.current.errors).toEqual({
      firstName: SIGN_UP.ERRORS.FIRST_NAME,
      lastName: SIGN_UP.ERRORS.LAST_NAME,
      password: SIGN_UP.ERRORS.PASSWORD,
    });
  });

  it('should remove password error when password changes', async () => {
    userAccountValidation.mockRejectedValueOnce(mockValidationRejection);

    const { result } = renderHook(() => useSignup());

    await act(async () => {
      await result.current.createAccountHandler();
    });

    await act(async () => {
      userAccountValidation.mockRejectedValueOnce({
        inner: [
          {
            path: 'firstName',
            message: SIGN_UP.ERRORS.FIRST_NAME,
          },
          {
            path: 'lastName',
            message: SIGN_UP.ERRORS.LAST_NAME,
          },
          {
            path: 'email',
            message: SIGN_UP.ERRORS.EMAIL,
          },
        ],
      });
      result.current.updateFormHandler({ password: 'password' });
    });

    expect(result.current.errors).toEqual({
      firstName: SIGN_UP.ERRORS.FIRST_NAME,
      lastName: SIGN_UP.ERRORS.LAST_NAME,
      email: SIGN_UP.ERRORS.EMAIL,
    });
  });

  it('should remove first name error when first name changes', async () => {
    userAccountValidation.mockRejectedValueOnce(mockValidationRejection);

    const { result } = renderHook(() => useSignup());

    await act(async () => {
      await result.current.createAccountHandler();
    });

    await act(async () => {
      userAccountValidation.mockRejectedValueOnce({
        inner: [
          {
            path: 'email',
            message: SIGN_UP.ERRORS.EMAIL,
          },
          {
            path: 'lastName',
            message: SIGN_UP.ERRORS.LAST_NAME,
          },
          {
            path: 'password',
            message: SIGN_UP.ERRORS.PASSWORD,
          },
        ],
      });
      result.current.updateFormHandler({ firstName: 'john' });
    });

    expect(result.current.errors).toEqual({
      email: SIGN_UP.ERRORS.EMAIL,
      lastName: SIGN_UP.ERRORS.LAST_NAME,
      password: SIGN_UP.ERRORS.PASSWORD,
    });
  });

  it('should remove last name error when last name changes', async () => {
    userAccountValidation.mockRejectedValueOnce(mockValidationRejection);

    const { result } = renderHook(() => useSignup());

    await act(async () => {
      await result.current.createAccountHandler();
    });

    await act(async () => {
      userAccountValidation.mockRejectedValueOnce({
        inner: [
          {
            path: 'firstName',
            message: SIGN_UP.ERRORS.FIRST_NAME,
          },
          {
            path: 'email',
            message: SIGN_UP.ERRORS.EMAIL,
          },
          {
            path: 'password',
            message: SIGN_UP.ERRORS.PASSWORD,
          },
        ],
      });
      result.current.updateFormHandler({ lastName: 'doe' });
    });

    expect(result.current.errors).toEqual({
      firstName: SIGN_UP.ERRORS.FIRST_NAME,
      email: SIGN_UP.ERRORS.EMAIL,
      password: SIGN_UP.ERRORS.PASSWORD,
    });
  });

  it('should set errors state for 400 status code', async () => {
    useFetch.mockResolvedValueOnce({
      status: 400,
      data: {
        name: 'ValidationError',
        code: 'E04000',
        errorFields: [
          {
            path: 'email',
            message: 'Email must be valid',
          },
        ],
      },
    });

    const { result } = renderHook(() => useSignup());

    act(() => {
      result.current.updateFormHandler(validAccount);
    });

    await act(async () => {
      await result.current.createAccountHandler();
    });

    expect(result.current.errors).toEqual({ email: 'Email must be valid' });
  });

  it('should set errors state for 500 status code', async () => {
    useFetch.mockResolvedValueOnce({
      status: 500,
      data: {
        name: 'DatabaseError',
        code: 'E02000',
        engine: 'prisma',
        engineCode: 'P2002',
      },
    });

    const { result } = renderHook(() => useSignup());

    act(() => {
      result.current.updateFormHandler(validAccount);
    });

    await act(async () => {
      await result.current.createAccountHandler();
    });

    expect(result.current.errors).toEqual({ default: SIGN_UP.ERRORS.ACCOUNT });
  });

  it('should set errors state for non 204/500/400 status code', async () => {
    useFetch.mockResolvedValueOnce({
      status: 402,
      data: null,
    });

    const { result } = renderHook(() => useSignup());

    act(() => {
      result.current.updateFormHandler(validAccount);
    });

    await act(async () => {
      await result.current.createAccountHandler();
    });

    expect(result.current.errors).toEqual({ default: SIGN_UP.ERRORS.DEFAULT });
  });

  it('should navigate to "/" when status code is 204', async () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    useFetch.mockResolvedValue({ status: 204 });

    const { result } = renderHook(() => useSignup());

    act(() => {
      result.current.updateFormHandler(validAccount);
    });

    await act(async () => {
      await result.current.createAccountHandler();
    });

    expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
  });
});
