import { UserConfigType, UserMeType } from '~/types';
import { http } from '../api-request.server';

export const updateUserConfig = async (config: UserConfigType): Promise<UserMeType> => {
  const response = await http.post('/api/user/me/', { config });

  return response.data;
};
