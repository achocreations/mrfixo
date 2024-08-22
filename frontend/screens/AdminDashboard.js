// /frontend/screens/AdminDashboard.js
import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import api from '../services/api';

const AdminDashboard = () => {
  const [services, setServices] = React.useState([]);

  React.useEffect(() => {
    api.get('/admin/services').then(response => setServices(response.data));
  }, []);

  const deleteService = (id) => {
    api.delete(`/admin/services/${id}`).then(() => {
      setServices(services.filter(service => service.id !== id));
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.service}>
            <Text>{item.name}</Text>
            <Button title="Delete" onPress={() => deleteService(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  service: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AdminDashboard;
