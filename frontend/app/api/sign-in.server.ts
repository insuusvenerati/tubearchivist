import setCookie from 'set-cookie-parser';
import { User } from '~/types';
import { http } from './api-request.server';

export type LoginResponseType = {
  token?: string;
  user_id: number;
  is_superuser: boolean;
  is_staff: boolean;
  user_groups: [];
};

const signIn = async ({
  username,
  password,
  remember,
}: {
  username: string;
  password: string;
  remember: string;
}): Promise<User> => {
  const response = await http.post<LoginResponseType>('/api/user/login/', {
    username,
    password,
    remember_me: remember,
  });

  // if (response.status !== 200) {
  //   throw response.data;
  // }

  // Server sends Set-Cookie headers
  const setCookieHeader = response.headers.get('Set-Cookie');

  if (!setCookieHeader) {
    throw new Error('No cookies received');
  }

  const parsedResponseCookies = setCookie.parse(setCookie.splitCookiesString(setCookieHeader));

  const sessionIdCookie = parsedResponseCookies.find(cookie => cookie.name === 'sessionid');
  const csrftokenCookie = parsedResponseCookies.find(cookie => cookie.name === 'csrftoken');

  if (!sessionIdCookie || !csrftokenCookie) {
    throw response.data;
  }

  return { sessionid: sessionIdCookie.value, csrftoken: csrftokenCookie.value };
};

export default signIn;
