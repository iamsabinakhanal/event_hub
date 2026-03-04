import axios from "axios";

// Ensure we use the correct base URL from environment
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true // Allow cookies to be sent with requests
});

// Add request interceptor to handle FormData
axiosInstance.interceptors.request.use(
  config => {
    // If sending FormData, remove the Content-Type header to let browser set it with boundary
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    return config;
  },
  error => Promise.reject(error)
);

// Add error interceptor for debugging
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // Only log errors in development, and skip 401 (auth errors handled elsewhere)
    if (process.env.NODE_ENV === 'development' && error.response?.status !== 401) {
      console.error('API Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;