import { StyleSheet, Text, View } from 'react-native';
import React, { createContext, useContext } from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './src/navigations/tabs';
import { useFonts } from 'expo-font';

const App = () => {
  const [fontsLoaded] = useFonts({
    700: require('./assets/fonts/Poppins-Bold.ttf'),
    600: require('./assets/fonts/Poppins-SemiBold.ttf'),
    400: require('./assets/fonts/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </Provider>

  
  );
};

export default App;

const styles = StyleSheet.create({});