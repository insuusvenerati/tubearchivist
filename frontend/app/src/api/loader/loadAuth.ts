import { AuthenticationType } from '~/routes/_home';
import defaultHeaders from '../../configuration/defaultHeaders';
import getApiUrl from '../../configuration/getApiUrl';
import getFetchCredentials from '../../configuration/getFetchCredentials';

const loadAuth = async user => {
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

  console.log(data);

  return data;
};

export default loadAuth;
