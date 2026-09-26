import { apiClient } from './client';

export const notificationsApi = {
  getNotifications: async () => {
    return await apiClient('/notifications');
  },

  markAsRead: async (id) => {
    return await apiClient(`/notifications/${id}/read`, {
      method: 'PATCH',
    });
  },

  markAllAsRead: async () => {
    return await apiClient('/notifications/read-all', {
      method: 'PATCH',
    });
  },
};

export default notificationsApi;
