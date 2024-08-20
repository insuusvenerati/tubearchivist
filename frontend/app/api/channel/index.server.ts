import { http } from '../api-request.server';

export const updateChannelSubscription = async (channelId: string, status: boolean) => {
  const response = await http.post('/api/channel/', {
    data: [{ channel_id: channelId, channel_subscribed: status }],
  });

  return response.data;
};

export const deleteChannel = async (channelId: string) => {
  const response = await http.delete(`/api/channel/${channelId}`);

  return response.data;
};
