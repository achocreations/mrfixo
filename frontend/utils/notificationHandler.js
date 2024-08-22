// /frontend/utils/notificationHandler.js
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

export const requestNotificationPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};

export const displayNotification = (title, message) => {
  Alert.alert(title, message);
};
