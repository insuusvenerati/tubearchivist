import { DownloadQueueStatus, FilterType } from '~/types';
import { http } from '../api-request.server';

export const updateDownloadQueueStatusById = async (
  youtubeId: string,
  status: DownloadQueueStatus,
) => {
  const response = await http.post(`/api/download/${youtubeId}/`, { status });

  return response.data;
};

export const updateDownloadQueue = async (download: string, autostart: boolean) => {
  const params = autostart ? { autostart: true } : {};

  const response = await http.post(
    '/api/download/',
    {
      data: [{ youtube_id: download, status: 'pending' }],
    },
    { params },
  );

  return response.data;
};

export const deleteDownloadQueueByFilter = async (filter: FilterType) => {
  const searchParams = new URLSearchParams();

  const filterMappings: Partial<Record<keyof FilterType, string>> = {
    page: filter.page?.toString(),
    playlist: filter.playlist,
    channel: filter.playlist ? undefined : filter.channel,
    watch: filter.watch,
    sort: filter.sort,
    order: filter.order,
    type: filter.type,
  };

  // Append each valid filter to searchParams
  Object.entries(filterMappings).forEach(([key, value]) => {
    if (value) {
      searchParams.append(key, value);
    }
  });

  const response = await http.delete('/api/download', { params: searchParams });

  return response.data;
};

export const deleteDownloadById = async (youtubeId: string) => {
  const response = await http.delete(`/api/download/${youtubeId}`);

  return response.data;
};
