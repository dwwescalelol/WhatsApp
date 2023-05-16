import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStore } from './src/stores/AppStore';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import LoginNavigator from './src/navigation/LoginNavigator';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './src/navigation/MainStackNavigator';
import ApiHandler from './src/api/ApiHandler';
import { useInitialiseStore } from './src/hooks/useInitialiseStore';

export default function App() {
  const store = useStore();
  const handleInitialStore = useInitialiseStore();

  // whenever token updates function is recalled
  useEffect(() => {
    handleInitialStore();
  }, [store.token]);

  return (
    <View style={styles.container}>
      <NavigationContainer>
        {store.token ? <MainStackNavigator /> : <LoginNavigator />}
      </NavigationContainer>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    justifyContent: 'center',
  },
});
