import { apiClient } from './client';

export const teamsApi = {
  getTeams: async () => {
    return await apiClient('/teams');
  },

  getTeamById: async (id) => {
    return await apiClient(`/teams/${id}`);
  },

  createTeam: async (teamData) => {
    return await apiClient('/teams', {
      method: 'POST',
      body: teamData,
    });
  },

  updateTeam: async (id, teamData) => {
    return await apiClient(`/teams/${id}`, {
      method: 'PUT',
      body: teamData,
    });
  },
};

export default teamsApi;
