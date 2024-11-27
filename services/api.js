import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Ganti dengan URL backend Anda
  headers: {
    'Content-Type': 'application/json',
  },
});

// Menambahkan Authorization Header jika token ada
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ${token}';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
