import isDevEnvironment from '~/src/functions/isDevEnvironment';
import { FilterType, User, VideoNavResponseType, VideoResponseType } from '~/types';
import { http } from '../api-request.server';
import { getSession } from '~/services/session.server';

export const deleteVideoProgressById = async (youtubeId: string) => {
  const response = await http.delete(`/api/video/${youtubeId}/progress/`);

  return response.data;
};

export const deleteVideo = async (videoId: string) => {
  const response = await http.delete(`/api/video/${videoId}/`);

  return response.data;
};

export const updateVideoProgressById = async ({
  youtubeId,
  currentProgress,
}: {
  youtubeId: string;
  currentProgress: number;
}) => {
  const response = await http.post(`/api/video/${youtubeId}/progress/`, {
    position: currentProgress,
  });

  return response.data;
};

export const loadVideoById = async (youtubeId: string) => {
  const response = await http.get(`/api/video/${youtubeId}/`);

  return response.data;
};

export const loadVideoListByFilter = async (user: User, filter: FilterType, request: Request) => {
  const searchParams = new URLSearchParams();
  // const session = await getSession(request.headers.get('Cookie'));

  // console.log(session);

  const filterMappings: Partial<Record<keyof FilterType, string>> = {
    page: filter.page?.toString(),
    playlist: filter.playlist,
    channel: filter.playlist ? undefined : filter.channel, // Use channel only if playlist is not provided
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

  const response = await http.get<VideoResponseType>(`/api/video/`, {
    headers: request.headers,
    params: searchParams,
    withCredentials: true,
  });

  return response.data;
};

export const loadVideoNav = async (youtubeVideoId: string): Promise<VideoNavResponseType[]> => {
  const response = await http.get<VideoNavResponseType[]>(`/api/video/${youtubeVideoId}/nav/`);

  return response.data;
};
