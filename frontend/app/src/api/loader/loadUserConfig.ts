import defaultHeaders from '../../configuration/defaultHeaders';
import getApiUrl from '../../configuration/getApiUrl';
import getFetchCredentials from '../../configuration/getFetchCredentials';
import isDevEnvironment from '../../functions/isDevEnvironment';
import { UserMeType } from '../actions/updateUserConfig';

const loadUserMeConfig = async (user: {
  sessionid: string;
  csrftoken: string;
}): Promise<UserMeType> => {
  const apiUrl = getApiUrl();

  const response = await fetch(`${apiUrl}/api/user/me/`, {
    headers: {
      ...defaultHeaders,
      Cookie: Object.entries(user)
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
