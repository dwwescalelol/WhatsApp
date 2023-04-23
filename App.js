import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiWrapper from './src/api/ApiWrapper';
import { useStore } from './src/stores/AppStore';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import LoginNavigator from './src/navigation/LoginNavigator';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './src/navigation/MainStackNavigator';

export default function App() {
  const store = useStore();

  const initialseInstance = async () => {
    if (!store.token) {
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');

      if (token) {
        store.setToken(token);
        store.setUserId(parseInt(userId));
      }
    }

    if (store.token) {
      const responce = await ApiWrapper.getUserInfo(store.token, store.userId);
      if (responce.status == 200) {
        const userInfo = await responce.json();
        await store.setFirstName(userInfo.first_name);
        await store.setLastName(userInfo.last_name);
        await store.setEmail(userInfo.email);
      }
    }
  };

  // whenever token updates function is recalled
  useEffect(() => {
    initialseInstance();
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
