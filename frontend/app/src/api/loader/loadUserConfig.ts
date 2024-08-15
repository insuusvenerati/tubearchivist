import { UserMeType } from '../actions/updateUserConfig';
import isDevEnvironment from '../../functions/isDevEnvironment';
import getApiUrl from '../../configuration/getApiUrl';
import defaultHeaders from '../../configuration/defaultHeaders';
import getFetchCredentials from '../../configuration/getFetchCredentials';
import { getSession } from '~/session.server';
import { redirect } from '@remix-run/node';

const loadUserMeConfig = async (request: Request): Promise<UserMeType> => {
  const apiUrl = getApiUrl();
  const sessionIdSession = await getSession(request.headers.get('Cookie'));

  if (!sessionIdSession.has('sessionid')) {
    throw redirect('/login');
  }

  const response = await fetch(`${apiUrl}/api/user/me/`, {
    headers: {
      ...defaultHeaders,
      Cookie: Object.entries(sessionIdSession.data)
        .map(([key, value]) => `${key}=${value}`)
        .join('; '),
    },
    credentials: getFetchCredentials(),
  });

  const userConfig: UserMeType = await response.json();

  if (isDevEnvironment()) {
    console.log('loadUserMeConfig', userConfig);
  }

  return userConfig;
};

export default loadUserMeConfig;
