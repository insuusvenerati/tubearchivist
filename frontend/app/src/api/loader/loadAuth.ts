import defaultHeaders from '../../configuration/defaultHeaders';
import getApiUrl from '../../configuration/getApiUrl';
import getFetchCredentials from '../../configuration/getFetchCredentials';

const loadAuth = async (request: Request) => {
  const apiUrl = getApiUrl();

  const response = await fetch(`${apiUrl}/api/ping/`, {
    headers: {
      ...defaultHeaders,
      // 'X-CSRFToken': cookie.csrftoken || '',
    },
    credentials: getFetchCredentials(),
  });

  return response;
};

export default loadAuth;
