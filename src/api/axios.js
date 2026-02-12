import axios from 'axios';

const api = axios.create({
  baseURL: "https://backend-warung-app.vercel.app/api",
  withCredentials: true
});

// Variabel untuk mengontrol antrean
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Cek jika error 401 dan pastikan bukan request ke refresh-token itu sendiri
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      // Jika sedang ada proses refresh, masukkan request ini ke antrean
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        // Gunakan axios instance standar (bukan 'api') untuk refresh 
        // agar tidak terkena interceptor request yang sama jika tidak perlu
        api.post("/refresh-token")
          .then(res => {
            const newAccessToken = res.data.accessToken;
            localStorage.setItem('accessToken', newAccessToken);
            
            // Update header default dan request saat ini
            api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            
            processQueue(null, newAccessToken);
            resolve(api(originalRequest));
          })
          .catch((refreshError) => {
            processQueue(refreshError, null);
            localStorage.removeItem('accessToken');
            // Hanya redirect jika memang diperlukan
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
            reject(refreshError);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }
    return Promise.reject(error);
  }
);

export default api;
