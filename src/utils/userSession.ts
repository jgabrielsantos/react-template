import { ENVIRONMENT } from '../config/environment';
import { useSystemContext } from '../hooks';
import { ContextReducerType } from '../reducer/types';

type UserSessionTypes = {
  data: ContextReducerType
}

export const userSession = ({ data }: UserSessionTypes) => {
  const { contextDispatcher } = useSystemContext();
  const date = new Date(new Date(Date.now() + 15 * 60 * 1000));
  document.cookie = `${ENVIRONMENT.APP.SESSION_COOKIE_NAME}=${data.tokens.accessToken}; expires=${date.toUTCString()} path=/; SameSite=none;secure`;

  contextDispatcher({
    type: 'UPDATE_USER',
    data: { ...data.user },
  });

  contextDispatcher({
    type: 'UPDATE_TOKEN',
    data: { ...data.tokens },
  });
};
