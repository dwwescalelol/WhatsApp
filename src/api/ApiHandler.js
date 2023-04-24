import React from 'react';
import ApiWrapper from './ApiWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStore } from '../stores/AppStore';

const ApiHandler = {
  // USER
  signUp: async (firstName, lastName, email, password) => {
    const response = await ApiWrapper.register(
      firstName,
      lastName,
      email,
      password
    );
    if (response.status == 201) {
      ApiHandler.login(email, password);
    }
    if (!response.ok) {
      throw new Error(await response.text());
    }
  },

  getUserInfo: async (token, userId) => {
    const response = await ApiWrapper.getUserInfo(token, userId);
    if (response.status == 200) return response.json();
    if (response.status == 401) throw new Error('Not authorised to view.');
    if (response.status == 404) throw new Error('User cannot be found.');
    if (response.status == 500) throw new Error('Server error...');
  },

  updateUserInfo: async (token, userId, data) => {
    const store = useStore.getState();

    const { firstName, lastName, email, password } = data;
    const response = await ApiWrapper.updateUserInfo(token, userId, {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    });
    if (response.status == 200) {
      await store.updateUserInfo(firstName, lastName, email);
      return response.text();
    }
    if (response.status == 401) throw new Error('Not authorised to view.');
    if (response.status == 403) throw new Error('Forbidden.');
    if (response.status == 404) throw new Error('User cannot be found.');
    if (response.status == 500) throw new Error('Server error...');
    throw new Error('An unexpected error occurred.');
  },

  getAvatar: async (token, userId) => {
    const response = await ApiWrapper.getAvatar(token, userId);
    if (response.status === 200) {
      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      return imageUrl;
    }
    if (response.status === 401) throw new Error('Not authorised to view.');
    if (response.status === 404) throw new Error('User cannot be found.');
    if (response.status === 500) throw new Error('Server error...');
    throw new Error('An unexpected error occurred.');
  },

  uploadAvatar: async (token, userId, image) => {
    const response = await ApiWrapper.uploadAvatar(token, userId, image);
    if (response.status === 200) {
      return response;
    }
    if (response.status === 401) throw new Error('Not authorized to upload.');
    if (response.status == 403) throw new Error('Forbidden.');
    if (response.status === 404) throw new Error('User cannot be found.');
    if (response.status === 500) throw new Error('Server error...');
    throw new Error('An unexpected error occurred.');
  },

  // LOGIN
  login: async (email, password) => {
    const store = useStore.getState();

    const response = await ApiWrapper.login(email, password);
    if (response.status === 200) {
      const sessionInfo = await response.json();
      await AsyncStorage.multiSet([
        ['userId', sessionInfo.id],
        ['token', sessionInfo.token],
      ]);
      await store.setUserId(sessionInfo.id);
      await store.setToken(sessionInfo.token);
    }
    if (!response.ok) {
      throw new Error(await response.text());
    }
  },

  // LOGOUT
  logout: async () => {
    const store = useStore.getState();

    const response = await ApiWrapper.logout(store.token);
    await AsyncStorage.clear();
    await store.clearAll();
    if (!response.ok) {
      throw new Error(await response.text());
    }
  },

  // SEARCH

  // CONTACTS
  getContacts: async (token) => {
    const response = await ApiWrapper.getContacts(token);
    if (response.status == 200) return response.json();
    if (response.status == 401) throw new Error('Not authorised to view.');
    if (response.status == 500) throw new Error('Server error...');
  },
};

export default ApiHandler;
