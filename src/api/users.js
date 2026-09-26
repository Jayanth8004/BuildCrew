import { apiClient } from './client';

export const usersApi = {
  getUsers: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.skill) query.append('skill', params.skill);
    if (params.role) query.append('role', params.role);
    const queryString = query.toString();
    return await apiClient(`/users${queryString ? `?${queryString}` : ''}`);
  },

  getUserById: async (id) => {
    return await apiClient(`/users/${id}`);
  },

  updateUser: async (id, data) => {
    return await apiClient(`/users/${id}`, {
      method: 'PUT',
      body: data,
    });
  },

  createBuilder: async (data) => {
    return await apiClient('/builders', {
      method: 'POST',
      body: data,
    });
  },
};

export default usersApi;
