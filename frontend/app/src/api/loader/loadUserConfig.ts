import { http } from '~/api/api-request.server';
import { UserMeType } from '../../../api/update-user-config.server';
import isDevEnvironment from '../../functions/isDevEnvironment';

const loadUserMeConfig = async (user: {
  sessionid: string;
  csrftoken: string;
}): Promise<UserMeType> => {
  const response = await http.get<UserMeType>('/api/user/me/', {
    headers: {
      Cookie: Object.entries(user)
        .map(([key, value]) => `${key}=${value}`)
        .join('; '),
    },
  });

  if (isDevEnvironment()) {
    console.log('loadUserMeConfig', response.data);
  }

  return response.data;
};

export default loadUserMeConfig;
