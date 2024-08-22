// /frontend/utils/locationService.js
import Geolocation from '@react-native-community/geolocation';

export const getCurrentLocation = (onSuccess, onError) => {
  Geolocation.getCurrentPosition(
    position => {
      onSuccess(position.coords);
    },
    error => {
      onError(error.message);
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
};
