export const checkForCookie = <T = any>(name: string) => {
  const cookies = document.cookie.split('; ');
  const cookie = cookies.find((cookieValue) => cookieValue.startsWith(name));
  const cookieValue = cookie?.split('=')[1];

  let parsedCookieValue: any;

  try {
    parsedCookieValue = JSON.parse(cookieValue!);
  } catch {
    parsedCookieValue = cookieValue;
  }

  return {
    exist: !!cookieValue,
    value: parsedCookieValue as T,
  };
};
