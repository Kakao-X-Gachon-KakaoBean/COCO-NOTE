import axios from 'axios';

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const GOOGLE_URL = import.meta.env.VITE_GOOGLELOGIN_URL;
export const KAKAO_URL = import.meta.env.VITE_KAKAOLOGIN_URL;
export const BROKER_URL = import.meta.env.VITE_BROKER_URL;
const accessToken = localStorage.getItem('accessToken');

export const instance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: { Authorization: `Bearer ${accessToken}` },
});

instance.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);
