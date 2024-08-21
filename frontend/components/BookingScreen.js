import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { catchError } from '../utils/errorHandler';
import api from '../services/api';

const BookingScreen = ({ serviceId }) => {
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleBooking = catchError(async () => {
    const response = await api.post('/bookings', { serviceId });
    if (response && response.data) {
      setBookingConfirmed(true);
    }
  });

  return (
    <View style={styles.container}>
      {bookingConfirmed ? (
        <Text style={styles.confirmation}>Booking Confirmed!</Text>
      ) : (
        <Button title="Book Now" onPress={handleBooking} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmation: {
    fontSize: 20,
    color: 'green',
  },
});

export default BookingScreen;
