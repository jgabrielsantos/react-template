// @ts-nocheck
import {
  renderHook, act,
} from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../../src/pages/Login/useLogic';
import { validationLogin } from '../../../src/pages/Login/validation';
import { useFetch, useCacheContext } from '../../../src/hooks';
import { LOGIN } from '../../../src/pages/Login/const';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

jest.mock('../../../src/pages/Login/validation');
jest.mock('../../../src/hooks/useFetch');

jest.mock('../../../src/hooks/useCacheContext', () => ({
  useCacheContext: jest.fn(),
}));

const mockData = {
  status: 200,
  data: {
    tokens: { accessToken: 'mockAccessToken' },
    user: {
      createdAt: '2020-01-01T00:00:00.000Z',
      email: 'johnDoe@email.com',
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      name: 'John Doe',
      userType: 'user',
    },
  },
};

describe('useLogic hook tests', () => {
  let container;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    useFetch.mockResolvedValue(mockData);

    const mockDispatcher = jest.fn();
    useCacheContext.mockReturnValue({ hookCacheContextDispatcher: mockDispatcher });
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;

    jest.clearAllMocks();
  });

  it('should update email and password correctly', () => {
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.emailHandler({ target: { value: 'test@example.com' } });
      result.current.passwordHandler({ target: { value: 'password123' } });
    });

    expect(result.current.email).toBe('test@example.com');
    expect(result.current.password).toBe('password123');
  });

  it('should handle validation error', async () => {
    validationLogin.mockRejectedValueOnce({
      inner: [
        {
          path: 'email',
          message: LOGIN.ERRORS.EMAIL,
        },
        {
          path: 'password',
          message: LOGIN.ERRORS.PASSWORD,
        },
      ],
    });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.handleLogin();
    });

    expect(result.current.errors).toEqual({
      email: LOGIN.ERRORS.EMAIL,
      password: LOGIN.ERRORS.PASSWORD,
    });
  });

  it('should remove email error when email changes', async () => {
    validationLogin.mockRejectedValueOnce({
      inner: [
        {
          path: 'email',
          message: LOGIN.ERRORS.EMAIL,
        },
        {
          path: 'password',
          message: LOGIN.ERRORS.PASSWORD,
        },
      ],
    });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.handleLogin();
    });

    act(() => {
      result.current.emailHandler({ target: { value: 'test@example.com' } });
    });

    expect(result.current.errors).toEqual({ password: LOGIN.ERRORS.PASSWORD });
  });

  it('should remove password error when password changes', async () => {
    validationLogin.mockRejectedValueOnce({
      inner: [
        {
          path: 'email',
          message: LOGIN.ERRORS.EMAIL,
        },
        {
          path: 'password',
          message: LOGIN.ERRORS.PASSWORD,
        },
      ],
    });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.handleLogin();
    });

    act(() => {
      result.current.passwordHandler({ target: { value: 'password123' } });
    });

    expect(result.current.errors).toEqual({ email: LOGIN.ERRORS.EMAIL });
  });

  it('should update errors state for non-200 status code', async () => {
    useFetch.mockResolvedValueOnce({ status: 400, data: null });

    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.emailHandler({ target: { value: 'test@example.com' } });
      result.current.passwordHandler({ target: { value: 'test123' } });
    });

    await act(async () => {
      await result.current.handleLogin();
    });

    expect(result.current.errors.default).toEqual(LOGIN.ERRORS.USER);
  });

  it('should not update errors state for non-200/non-400 status code', async () => {
    useFetch.mockResolvedValueOnce({ status: 401, data: null });

    const { result, waitForNextUpdate } = renderHook(() => useLogin());

    act(() => {
      result.current.emailHandler({ target: { value: 'test@example.com' } });
      result.current.passwordHandler({ target: { value: 'test123' } });
    });

    await act(async () => {
      await result.current.handleLogin();
    });

    expect(result.current.errors.default).toEqual(LOGIN.ERRORS.DEFAULT);
  });

  it('should update user data when status code is 200', async () => {
    useFetch.mockResolvedValue(mockData);

    const mockDispatcher = jest.fn();
    useCacheContext.mockReturnValue({ hookCacheContextDispatcher: mockDispatcher });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.handleLogin();
    });

    expect(useFetch).toHaveBeenCalledWith({
      method: 'POST',
      path: '/auth',
      body: {
        email: result.current.email,
        password: result.current.password,
      },
    });

    expect(mockDispatcher).toHaveBeenCalledWith({
      type: 'updateUser',
      data: mockData.data.user,
    });

    expect(mockDispatcher).toHaveBeenCalledWith({
      type: 'updateToken',
      data: mockData.data.tokens,
    });
  });

  it('should navigate to "/" with replace option', async () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    useFetch.mockResolvedValue(mockData);

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.handleLogin();
    });

    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
  });
});
