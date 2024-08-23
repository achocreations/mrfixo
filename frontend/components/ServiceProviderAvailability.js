// /frontend/components/ServiceProviderAvailability.js
import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import api from '../services/api';
import { useErrorHandler } from '../utils/errorHandler';

const ServiceProviderAvailability = ({ providerId }) => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const handleError = useErrorHandler();

  const setAvailability = async () => {
    try {
      const response = await api.post('/availability', {
        providerId,
        date,
        slots: [{ startTime, endTime }]
      });

      Alert.alert('Success', response.data.message);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <View>
      <Text>Set Availability</Text>
      <TextInput
        placeholder="Date"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        placeholder="Start Time"
        value={startTime}
        onChangeText={setStartTime}
      />
      <TextInput
        placeholder="End Time"
        value={endTime}
        onChangeText={setEndTime}
      />
      <Button title="Save" onPress={setAvailability} />
    </View>
  );
};

export default ServiceProviderAvailability;
