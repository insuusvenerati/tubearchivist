import { useQuery } from '@tanstack/react-query';
import { Videos } from '../types/videos';

const BASE_URL = '/api/video/';

export const getVideos = async () => {
  const response = await fetch(BASE_URL);
  const data: Videos = await response.json();
  return data;
};

export const useVideosQuery = () => {
  return useQuery({ queryKey: ['videos'], queryFn: getVideos, useErrorBoundary: true });
};
