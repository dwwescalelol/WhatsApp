import React, { useEffect } from 'react';
import { useStore } from './src/stores/AppStore';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import LoginNavigator from './src/navigation/LoginNavigator';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './src/navigation/MainStackNavigator';
import 'react-native-gesture-handler';
import { useInitialiseStore } from './src/hooks/useInitialiseStore';
import { getLanguage } from './src/locales';

export default function App() {
  const store = useStore();
  const handleInitialStore = useInitialiseStore();

  // whenever token updates function is recalled
  useEffect(() => {
    handleInitialStore();
  }, [store.token]);

  useEffect(() => {
    getLanguage();
  }, []);

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
