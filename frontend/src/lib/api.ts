import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  withCredentials: true, // Important for sending cookies
});

// Intercept responses to handle 401s globally if needed
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If we get an unauthorized exception and we are not on the login page, we could redirect here.
    // AuthContext handles initial load, but this catches token expiry mid-session.
    if (error.response?.status === 401 && typeof window !== 'undefined' && window.location.pathname !== '/') {
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
