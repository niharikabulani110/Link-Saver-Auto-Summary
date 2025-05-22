import axios from 'axios';

const baseURL = import.meta.env.DEV
  ? '/api' // for local dev proxy
  : import.meta.env.VITE_API_URL; // for production

const instance = axios.create({ baseURL });

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
