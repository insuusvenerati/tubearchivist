import { AuthenticationType } from '~/routes/_home';
import defaultHeaders from '../../configuration/defaultHeaders';
import getApiUrl from '../../configuration/getApiUrl.server';
import getFetchCredentials from '../../configuration/getFetchCredentials';

export type User = {
  sessionid: string;
  csrftoken: string;
};

const loadAuth = async (user: User) => {
  const apiUrl = getApiUrl();

  const response = await fetch(`${apiUrl}/api/ping/`, {
    headers: {
      ...defaultHeaders,
      Cookie: Object.entries(user)
        .map(([key, value]) => `${key}=${value}`)
        .join('; '),
    },
    credentials: getFetchCredentials(),
  });

  const data: AuthenticationType = await response.json();

  return data;
};

export default loadAuth;
