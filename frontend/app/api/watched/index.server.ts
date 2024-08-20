import { Watched } from '~/types';
import { http } from '../api-request.server';
import { deleteVideoProgressById } from '../video/index.server';

export const updateWatchedState = async (watched: Watched) => {
  if (watched.is_watched) {
    await deleteVideoProgressById(watched.id);
  }
  const { data: watchedState } = await http.get('/api/watched/');
  console.log('updateWatchedState', watchedState);

  return watchedState;
};
