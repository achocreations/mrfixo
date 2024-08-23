// /frontend/utils/auth.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

// Store Token
export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('authToken', token);
  } catch (error) {
    console.error('Error storing the auth token', error);
  }
};

// Get Token
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    return token;
  } catch (error) {
    console.error('Error retrieving the auth token', error);
    return null;
  }
};

// Remove Token
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('authToken');
  } catch (error) {
    console.error('Error removing the auth token', error);
  }
};

// Decode Token
export const decodeToken = async () => {
  try {
    const token = await getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  } catch (error) {
    console.error('Error decoding the auth token', error);
    return null;
  }
};

// Check if User is Logged In
export const isLoggedIn = async () => {
  const token = await getToken();
  if (token) {
    const decoded = jwtDecode(token);
    // Check if token is expired
    if (decoded.exp * 1000 < Date.now()) {
      await removeToken(); // Remove expired token
      return false;
    }
    return true;
  }
  return false;
};
