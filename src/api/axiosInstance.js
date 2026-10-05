import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://onrender.com',
  withCredentials: true
});

// ⚡ AUTOMATED SECURE TOKEN INJECTION INTERCEPTOR
axiosInstance.interceptors.request.use(
  (config) => {
    const activeToken = localStorage.getItem('token');
    if (activeToken) {
      config.headers.Authorization = `Bearer ${activeToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
