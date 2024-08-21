import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getUserProfile } from '../services/api';
import { catchError } from '../utils/errorHandler';

const HomeScreen = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    catchError(async () => {
      const data = await getUserProfile('userId123');
      setUserProfile(data);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      {userProfile && (
        <Text style={styles.profile}>Welcome, {userProfile.name}</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profile: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default HomeScreen;
