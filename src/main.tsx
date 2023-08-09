import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@layouts/App/App.tsx';
import './index.css';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { CookiesProvider } from 'react-cookie';
import axios from 'axios';
import { getCookie } from '@utils/cookie.ts';
import { toast } from 'react-toastify';

const queryClient = new QueryClient();

axios.interceptors.response.use(
  response => response,
  async error => {
    const requestApi = error.config;

    if (error.response.status === 401 && !requestApi._retry) {
      requestApi._retry = true;
      const refreshToken = getCookie('refreshToken');
      if (refreshToken) {
        try {
          const response = await axios.post('http://localhost:8080/access-tokens', { refreshToken });

          const accessToken = response.data.accessToken;
          localStorage.setItem('accessToken', accessToken);

          requestApi.headers['Authorization'] = `Bearer ${accessToken}`;
          return axios(requestApi);
        } catch (refreshError) {
          toast.error('에러에러에러');
        }
      }
    }

    return Promise.reject(error);
  }
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CookiesProvider>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </RecoilRoot>
    </CookiesProvider>
  </React.StrictMode>
);
