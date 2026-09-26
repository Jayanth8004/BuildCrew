import { apiClient } from './client';

export const invitationsApi = {
  getMyInvitations: async () => {
    return await apiClient('/invitations/my');
  },

  sendInvitation: async (invitationData) => {
    return await apiClient('/invitations', {
      method: 'POST',
      body: invitationData,
    });
  },

  respondInvitation: async (id, status) => {
    return await apiClient(`/invitations/${id}`, {
      method: 'PATCH',
      body: { status },
    });
  },
};

export default invitationsApi;
