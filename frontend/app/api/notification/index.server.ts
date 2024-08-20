import { NotificationPages } from '~/types';
import { http } from '../api-request.server';

export const loadNotifications = async (pageName: NotificationPages, includeReindex = false) => {
  let params = '';
  if (!includeReindex && pageName !== 'all') {
    params = `?filter=${pageName}`;
  }

  const response = await http.get(`/api/notification/${pageName}`, {
    params,
  });

  return response.data;
};
