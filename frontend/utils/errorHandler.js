import logger from './logger';
import { Alert } from 'react-native';

export const handleError = (error) => {
  return (error) => {
    console.error(error);
    if (error.response && error.response.data && error.response.data.message) {
      Alert.alert('Error', error.response.data.message);
    } else {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };
};

export const catchError = (fn) => async (...args) => {
  try {
    return await fn(...args);
  } catch (error) {
    handleError(error);
  }
};
