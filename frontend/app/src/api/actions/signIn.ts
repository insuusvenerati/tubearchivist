import setCookie from 'set-cookie-parser';
import defaultHeaders from '../../configuration/defaultHeaders';
import getApiUrl from '../../configuration/getApiUrl';
import getFetchCredentials from '../../configuration/getFetchCredentials';
import { json } from '@remix-run/node';

export type LoginResponseType = {
  token?: string;
  user_id: number;
  is_superuser: boolean;
  is_staff: boolean;
  user_groups: [];
};

const signIn = async ({ username, password }: { username: string; password: string }) => {
  const apiUrl = getApiUrl();

  const response = await fetch(`${apiUrl}/api/user/login/`, {
    method: 'POST',
    headers: {
      ...defaultHeaders,
    },
    credentials: getFetchCredentials(),
    body: JSON.stringify({
      username,
      password,
      // remember_me: saveLogin ? 'on' : 'off',
    }),
  });

  const setCookieHeader = response.headers.get('Set-Cookie');

  if (!setCookieHeader) {
    throw json({ error: 'Failed to login.' }, { status: 403 });
  }

  const parsedResponseCookies = setCookie.parse(setCookie.splitCookiesString(setCookieHeader));

  console.log('parsedResponseCookies', parsedResponseCookies);

  const sessionIdCookie = parsedResponseCookies.find(cookie => cookie.name === 'sessionid');
  const csrftokenCookie = parsedResponseCookies.find(cookie => cookie.name === 'csrftoken');

  if (response.status === 403) {
    console.log('Might be already logged in.', await response.json());
  }

  if (!sessionIdCookie || !csrftokenCookie) {
    throw json({ error: 'Failed to login.' }, { status: 403 });
  }

  return { sessionid: sessionIdCookie.value, csrftoken: csrftokenCookie.value };
};

export default signIn;
