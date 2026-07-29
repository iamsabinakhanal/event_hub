import axios, { AxiosError } from "axios";

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
  (error: AxiosError) => {
    if (process.env.NODE_ENV === "development") {
      const status = error.response?.status;
      const details = {
        status,
        url: error.config?.url,
        data: error.response?.data,
        message: error.message,
      };

      if (!status || status >= 500) {
        console.error("API request failed:", details);
      } else if (status >= 400) {
        console.warn("API request rejected:", details);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;