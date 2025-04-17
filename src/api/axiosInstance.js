import axios from 'axios';
// import { store } from '../redux/store';
// import { refreshToken } from '../redux/auth/operations';

const api = axios.create({
  baseURL: 'https://readjourney.b.goit.study/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// api.interceptors.request.use(
//   config => {
//     const token = store.getState().auth.token;
//     config.headers.Authorization = token ? `Bearer ${token}` : '';
//     return config;
//   },
//   error => Promise.reject(error)
// );

// api.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;

//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry &&
//       originalRequest.url !== '/users/current/refresh'
//     ) {
//       originalRequest._retry = true;

//       try {
//         const refreshResponse = await store.dispatch(refreshToken());

//         if (refreshResponse.meta.requestStatus === 'fulfilled') {
//           const { token } = refreshResponse.payload;
//           api.defaults.headers.common.Authorization = `Bearer ${token}`;
//           originalRequest.headers.Authorization = `Bearer ${token}`;
//           return api(originalRequest);
//         } else {
//           return Promise.reject(refreshResponse.error);
//         }
//       } catch (refreshError) {
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export const setAuthHeader = token => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  api.defaults.headers.common.Authorization = '';
};

export default api;
