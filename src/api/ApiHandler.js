import React from 'react';
import ApiWrapper from './ApiWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStore } from '../stores/AppStore';

const ApiHandler = {
  // USER
  signUp: async (firstName, lastName, email, password) => {
    const responce = await ApiWrapper.register(
      firstName,
      lastName,
      email,
      password
    );
    if (responce.status == 201) {
      ApiHandler.login(email, password);
    }
    if (!responce.ok) {
      throw new Error(await responce.text());
    }
  },

  getUserInfo: async (token, userId) => {
    const responce = await ApiWrapper.getUserInfo(token, userId);
    if (responce.status == 200) return responce.json();
    if (responce.status == 401) throw new Error('Not authorised to view.');
    if (responce.status == 404) throw new Error('User cannot be found.');
    if (responce.status == 500) throw new Error('Server error...');
  },

  updateUserInfo: async (token, userId, data) => {
    const store = useStore.getState();

    const { firstName, lastName, email, password } = data;
    const responce = await ApiWrapper.updateUserInfo(token, userId, {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    });
    if (responce.status == 200) {
      await store.updateUserInfo(firstName, lastName, email);
      return responce.text();
    }
    if (responce.status == 401) throw new Error('Not authorised to view.');
    if (responce.status == 403) throw new Error('Forbidden.');
    if (responce.status == 404) throw new Error('User cannot be found.');
    if (responce.status == 500) throw new Error('Server error...');
  },

  // LOGIN
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

  // LOGOUT
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
