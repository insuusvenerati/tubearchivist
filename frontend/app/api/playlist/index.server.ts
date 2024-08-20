import { http } from '../api-request.server';

type CustomPlaylistActionType = 'create' | 'up' | 'down' | 'top' | 'bottom' | 'remove';

export const createCustomPlaylist = async (playlistId: string) => {
  const response = await http.post('/api/playlist/', {
    data: { create: playlistId },
  });

  return response.data;
};

export const deletePlaylist = async (playlistId: string, allVideos = false) => {
  let params = '';
  if (allVideos) {
    params = '?delete-videos=true';
  }

  const response = await http.delete(`/api/playlist/${playlistId}/`, {
    params,
  });

  return response.data;
};

export const updateCustomPlaylist = async (
  action: CustomPlaylistActionType,
  playlistId: string,
  videoId: string,
) => {
  const response = await http.post(`/api/playlist/${playlistId}`, {
    data: [{ action, video_id: videoId }],
  });

  return response.data;
};

export const updatePlaylistSubscription = async (playlistId: string, status: boolean) => {
  const response = await http.post('/api/playlist/', {
    data: [{ playlist_id: playlistId, playlist_subscribed: status }],
  });

  return response.data;
};

export const loadStatsPlaylist = async () => {
  const response = await http.get('/api/status/playlist/');

  return response.data;
};
