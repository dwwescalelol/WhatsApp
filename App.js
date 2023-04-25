import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStore } from './src/stores/AppStore';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import LoginNavigator from './src/navigation/LoginNavigator';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './src/navigation/MainStackNavigator';
import ApiHandler from './src/api/ApiHandler';

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
      const userInfo = await ApiHandler.getUserInfo(store.token, store.userId);
      const contacts = await ApiHandler.getContacts();
      const blocked = await ApiHandler.getBlockedUsers(store.token);
      await store.setFirstName(userInfo.first_name);
      await store.setLastName(userInfo.last_name);
      await store.setEmail(userInfo.email);
      await store.setBlocked(blocked);
      await store.setContacts(contacts);
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
