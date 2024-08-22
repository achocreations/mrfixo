// /frontend/components/SearchFilter.js
import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { catchError } from '../utils/errorHandler';
import api from '../services/api';

const SearchFilter = ({ onResults }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [loading, setLoading] = useState(false);

  const handleSearch = catchError(async () => {
    setLoading(true);
    const response = await api.get('/services/search', {
      params: { searchTerm, location, priceRange }
    });
    onResults(response.data);
    setLoading(false);
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search services..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      {/* Add more filters as needed */}
      <Button title={loading ? "Searching..." : "Search"} onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default SearchFilter;
