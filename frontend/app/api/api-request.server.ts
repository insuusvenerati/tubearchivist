import axios from 'axios';
import xior, { merge } from 'xior';
import { getSession } from '~/services/session.server';
import getApiUrl from '~/src/configuration/getApiUrl.server';

// Create an Axios like http client instance
export const http = axios.create({
  baseURL: getApiUrl(),
  withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
});

http.interceptors.request.use(async request => {
  process.env.NODE_ENV === 'development' && console.log('Starting Request', request);
  const session = await getSession(request.headers.get('Cookie'));
  console.log(session);
  return merge(request, {
    headers: {
      'X-CSRFToken': session.data.user.csrftoken,
    },
  });
});

http.interceptors.response.use(response => {
  process.env.NODE_ENV === 'development' && console.log('Response:', response);
  return response;
});
