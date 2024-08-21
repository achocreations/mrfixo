import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { LogBox } from 'react-native';
import logger from './utils/logger';

// Ignore specific warnings (e.g., deprecated methods)
LogBox.ignoreLogs(['Warning: ...']);

const App = () => {
  logger.info('App initialized');
  
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
