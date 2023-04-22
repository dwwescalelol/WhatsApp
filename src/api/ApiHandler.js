import React from 'react';
import ApiWrapper from './ApiWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStore } from '../stores/AppStore';

const ApiHandler = {
  login: async (email, password) => {
    const store = useStore.getState();

    const responce = await ApiWrapper.login(email, password);
    if (responce.status === 200) {
      const sessionInfo = await responce.json();
      await AsyncStorage.multiSet([
        ['userId', sessionInfo.id],
        ['token', sessionInfo.token],
      ]);
      await store.setUserId(sessionInfo.id);
      await store.setToken(sessionInfo.token);
    }
    if (!responce.ok) {
      throw new Error(await responce.text());
    }
  },

  signUp: async (firstName, lastName, email, password) => {
    const store = useStore.getState();

    const responce = await ApiWrapper.register(
      firstName,
      lastName,
      email,
      password
    );
    if (responce.status == 201) {
      const loginResponce = await ApiWrapper.login(email, password);
      const sessionInfo = await loginResponce.json();
      await AsyncStorage.multiSet([
        ['userId', sessionInfo.id],
        ['token', sessionInfo.token],
      ]);
      await store.setUserId(sessionInfo.id);
      await store.setToken(sessionInfo.token);
    }
    if (!responce.ok) {
      throw new Error(await responce.text());
    }
  },

  logout: async () => {
    const store = useStore.getState();

    const responce = await ApiWrapper.logout(store.token);
    await AsyncStorage.clear();
    await store.clearAll();
    if (!responce.ok) {
      throw new Error(await responce.text());
    }
  },
};

export default ApiHandler;
