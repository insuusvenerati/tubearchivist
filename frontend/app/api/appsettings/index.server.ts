import { AppSettingsConfigType, ValidatedCookieType } from '~/types';
import { http } from '../api-request.server';

export const updateAppsettingsConfig = async (config: AppSettingsConfigType) => {
  const response = await http.post('/api/appsettings/config/', config);

  return response.data;
};

export const restoreSnapshot = async (snapshotId: string) => {
  const response = await http.post(`/api/appsettings/snapshot/${snapshotId}/`);

  return response.data;
};

export const restoreBackup = async (fileName: string) => {
  const response = await http.post(`/api/appsettings/backup/${fileName}`);

  return response.data;
};

export const queueSnapshot = async () => {
  const response = await http.post('/api/appsettings/snapshot/');

  return response.data;
};

export const queueBackup = async () => {
  const response = await http.post('/api/appsettings/backup/');

  return response.data;
};

export const deleteApiToken = async () => {
  const response = await http.delete('/api/appsettings/token/');

  return response.data;
};

export const updateCookie = async (): Promise<ValidatedCookieType> => {
  const response = await http.post('/api/appsettings/cookie/');

  return response.data;
};
