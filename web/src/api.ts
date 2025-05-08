import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  res => res,
  async err => {
    if (err.response?.status === 401) {
      await api.post('/refresh');
      return api(err.config);
    }
    return Promise.reject(err);
  }
);

export default api;