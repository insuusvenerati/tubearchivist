import { ReindexType } from '~/types';
import { http } from '../api-request.server';

export const queueReindex = async (id: string, type: ReindexType, reindexVideos = false) => {
  let params = '';
  if (reindexVideos) {
    params = '?extract_videos=true';
  }

  const body = JSON.stringify({
    [type]: id,
  });

  const response = await http.post('/api/refresh', body, { params });

  return response.data;
};
