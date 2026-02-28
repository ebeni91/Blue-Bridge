import axios from 'axios';

// Create a customized Axios instance pointing to your Django backend
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach the JWT token before the request leaves the frontend
apiClient.interceptors.request.use((config) => {
  // In Next.js, we will store the token securely. 
  // For client-side requests, you might grab it from a secure HttpOnly cookie or memory.
  // For this MVP, assuming you have a function to get the token:
  const token = getAccessToken(); 
  
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response Interceptor: If the backend says "401 Unauthorized", the token probably expired.
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If we get a 401 and haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Attempt to get a new token from Django
        const refreshToken = getRefreshToken();
        const res = await axios.post('http://localhost:8000/api/auth/token/refresh/', {
          refresh: refreshToken,
        });
        
        // Save the new token and retry the original request
        saveAccessToken(res.data.access);
        originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // If refresh fails, force the user to log in again
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Dummy helper functions (You would implement these using Next.js cookies or a library like next-auth)
function getAccessToken() { return typeof window !== 'undefined' ? localStorage.getItem('access') : null; }
function getRefreshToken() { return typeof window !== 'undefined' ? localStorage.getItem('refresh') : null; }
function saveAccessToken(token: string) { if (typeof window !== 'undefined') localStorage.setItem('access', token); }