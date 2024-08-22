// /frontend/components/LanguageSelector.js
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { setLanguage } from '../services/languageService';

const LanguageSelector = () => {
  return (
    <View style={styles.container}>
      <Button title="English" onPress={() => setLanguage('en')} />
      <Button title="Español" onPress={() => setLanguage('es')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
});

export default LanguageSelector;
