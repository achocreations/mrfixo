import axios from 'axios';
import { handleError } from '../utils/errorHandler';
import logger from '../utils/logger';

const API_BASE_URL = 'https://yourapi.com/api'; // Replace with your API base URL

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  // Add authentication token or other headers here if needed
  logger.info(`API Request: ${config.method.toUpperCase()} ${config.url}`);
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    handleError(error);
    return Promise.reject(error);
  }
);

export const getUserProfile = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Other API functions like getServices, createBooking, etc.

export default api;
