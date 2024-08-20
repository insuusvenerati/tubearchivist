import { TaskNamesType } from '~/types';
import { http } from '../api-request.server';

export const stopTaskByName = async (taskId: string) => {
  const response = await http.post(`/api/task/by-id/${taskId}/`, {
    command: 'stop',
  });

  return response.data;
};

export const updateTaskByName = async (taskName: TaskNamesType) => {
  const response = await http.post(`/api/task/by-name/${taskName}`);

  return response.data;
};
