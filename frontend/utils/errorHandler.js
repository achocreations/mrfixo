import logger from './logger';

export const handleError = (error) => {
  // Log the error
  logger.error(`An error occurred: ${error.message || 'Unknown error'}`);

  // Display user-friendly error message
  alert('Something went wrong. Please try again later.');
};

export const catchError = (fn) => async (...args) => {
  try {
    return await fn(...args);
  } catch (error) {
    handleError(error);
  }
};
