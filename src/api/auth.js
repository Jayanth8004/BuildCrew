import { apiClient, setToken, clearAuthSession } from './client';

export const authApi = {
  login: async (email, password) => {
    const data = await apiClient('/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    if (data.token) {
      setToken(data.token);
      try {
        localStorage.setItem('buildcrew_user', JSON.stringify(data.user));
      } catch (err) {
        console.warn('Failed to store user in localStorage', err);
      }
    }
    return data;
  },

  register: async (userData) => {
    const data = await apiClient('/auth/register', {
      method: 'POST',
      body: userData,
    });
    if (data.token) {
      setToken(data.token);
      try {
        localStorage.setItem('buildcrew_user', JSON.stringify(data.user));
      } catch (err) {
        console.warn('Failed to store user in localStorage', err);
      }
    }
    return data;
  },

  googleLogin: async (googleData) => {
    const data = await apiClient('/auth/google', {
      method: 'POST',
      body: googleData,
    });
    if (data.token) {
      setToken(data.token);
      try {
        localStorage.setItem('buildcrew_user', JSON.stringify(data.user));
      } catch (err) {
        console.warn('Failed to store user in localStorage', err);
      }
    }
    return data;
  },

  forgotPassword: async (email) => {
    return await apiClient('/auth/forgot-password', {
      method: 'POST',
      body: { email },
    });
  },

  resetPassword: async (email, newPassword) => {
    return await apiClient('/auth/reset-password', {
      method: 'POST',
      body: { email, newPassword },
    });
  },

  getMe: async () => {
    return await apiClient('/auth/me');
  },

  getToken: () => {
    try {
      return localStorage.getItem('buildcrew_token');
    } catch {
      return null;
    }
  },

  logout: () => {
    clearAuthSession();
  },

  getStoredUser: () => {
    try {
      const stored = localStorage.getItem('buildcrew_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },
};

export default authApi;
