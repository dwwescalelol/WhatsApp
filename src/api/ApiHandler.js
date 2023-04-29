import React from 'react';
import ApiWrapper from './ApiWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStore } from '../stores/AppStore';

const ApiHandler = {
  // USER
  signUp: async (firstName, lastName, email, password) => {
    const store = useStore.getState();
    const response = await ApiWrapper.register(
      firstName,
      lastName,
      email,
      password
    );
    if (response.status == 201) {
      const session = await ApiHandler.login(email, password);
      await AsyncStorage.multiSet([
        ['userId', session.id],
        ['token', session.token],
      ]);
      await store.setUserId(session.id);
      await store.setToken(session.token);
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
    const { firstName, lastName, email, password } = data;
    const response = await ApiWrapper.updateUserInfo(token, userId, {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    });
    if (response.status == 200) return response.text();
    if (response.status == 400) throw new Error('Email already registered.');
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

  addContact: async (token, userId) => {
    const response = await ApiWrapper.addContact(token, userId);
    if (response.status === 200) {
      return;
    }
    if (response.status === 400)
      throw new Error('Cannot add yourself as a contact.');
    if (response.status === 401)
      throw new Error('Not authorized to add contact.');
    if (response.status === 403) throw new Error('Forbidden.');
    if (response.status === 404) throw new Error('User not found.');
    if (response.status === 500) throw new Error('Server error.');
    throw new Error('An unexpected error occurred.');
  },

  removeContact: async (token, userId) => {
    const response = await ApiWrapper.removeContact(token, userId);
    if (response.status === 200) {
      return response.text();
    }
    if (response.status === 400)
      throw new Error('Cannot remove yourself as a contact.');
    if (response.status === 401)
      throw new Error('Not authorized to remove contact.');
    if (response.status === 404) throw new Error('Contact not found.');
    if (response.status === 500) throw new Error('Server error...');
    throw new Error('An unexpected error occurred.');
  },

  blockUser: async (token, userId) => {
    const response = await ApiWrapper.blockUser(token, userId);
    if (response.status == 200) {
      return response.text();
    }
    if (response.status == 400)
      throw new Error('Cannot block user who is not a contact.');
    if (response.status == 401) throw new Error('Not authorised to view.');
    if (response.status == 404) throw new Error('User cannot be found.');
    if (response.status == 500) throw new Error('Server error...');
    throw new Error('An unexpected error occurred.');
  },

  unblockUser: async (token, userId) => {
    const response = await ApiWrapper.unblockUser(token, userId);
    if (response.status == 200) {
      return response.text();
    }
    if (response.status == 400)
      throw new Error('Cannot unblock user who is not a contact.');
    if (response.status == 401) throw new Error('Not authorised to view.');
    if (response.status == 403) throw new Error('Forbidden.');
    if (response.status == 404) throw new Error('User cannot be found.');
    if (response.status == 500) throw new Error('Server error...');
    throw new Error('An unexpected error occurred.');
  },

  // LOGIN
  login: async (email, password) => {
    const response = await ApiWrapper.login(email, password);
    if (response.status === 200) return await response.json();
    if (!response.ok) {
      throw new Error(await response.text());
    }
  },

  // LOGOUT
  logout: async (token) => {
    const response = await ApiWrapper.logout(token);
    if (!response.ok) {
      throw new Error(await response.text());
    }
  },

  // SEARCH
  searchUsers: async (
    token,
    query,
    searchIn = 'all',
    limit = 20,
    offset = 0
  ) => {
    const response = await ApiWrapper.searchUsers(
      token,
      query,
      searchIn,
      limit,
      offset
    );
    if (response.status === 200) return response.json();
    if (response.status === 401) throw new Error('Not authorised to view.');
    if (response.status === 500) throw new Error('Server error...');
    throw new Error('An unexpected error occurred.');
  },

  // CONTACTS
  getContacts: async (token) => {
    const response = await ApiWrapper.getContacts(token);
    if (response.status == 200) return response.json();
    if (response.status == 401) throw new Error('Not authorised to view.');
    if (response.status == 500) throw new Error('Server error...');
    throw new Error('An unexpected error occurred.');
  },

  // BLOCKED
  getBlockedUsers: async (token) => {
    const response = await ApiWrapper.getBlockedUsers(token);
    if (response.status === 200) {
      return await response.json();
    }
    if (response.status === 401) throw new Error('Not authorized to view.');
    if (response.status === 500) throw new Error('Server error...');
    throw new Error('An unexpected error occurred.');
  },

  // CHAT

  getChats: async (token) => {
    const response = await ApiWrapper.getChats(token);
    if (response.status === 200) return await response.json();
    if (response.status === 401)
      throw new Error('Not authorized to view chats.');
    if (response.status === 500) throw new Error('Server error.');
    throw new Error('An unexpected error occurred.');
  },

  createChat: async (token, name) => {
    const response = await ApiWrapper.createChat(token, name);
    if (response.status === 201) {
      return await response.json();
    }
    if (response.status === 400) throw new Error('Bad request.');
    if (response.status === 401)
      throw new Error('Not authorized to create chat.');
    if (response.status === 403) throw new Error('Forbidden.');
    if (response.status === 500) throw new Error('Server error.');
    throw new Error('An unexpected error occurred.');
  },

  getChatDetails: async (token, chat_id, limit, offset) => {
    const response = await ApiWrapper.getChatDetails(
      token,
      chat_id,
      limit,
      offset
    );
    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
    if (response.status === 401)
      throw new Error('Not authorized to view chat details.');
    if (response.status === 404) throw new Error('Chat not found.');
    if (response.status === 500) throw new Error('Server error.');
    throw new Error('An unexpected error occurred.');
  },

  updateChat: async (token, chat_id, name) => {
    const response = await ApiWrapper.updateChat(token, chat_id, name);
    if (response.status === 200) {
      return;
    }
    if (response.status === 400) throw new Error('Bad request.');
    if (response.status === 401)
      throw new Error('Not authorized to update chat.');
    if (response.status === 404) throw new Error('Chat not found.');
    if (response.status === 500) throw new Error('Server error.');
    throw new Error('An unexpected error occurred.');
  },

  addUserToChat: async (token, chat_id, user_id) => {
    const response = await ApiWrapper.addUserToChat(token, chat_id, user_id);
    if (response.status === 200) {
      return;
    }
    if (response.status === 400) throw new Error('Bad request.');
    if (response.status === 401)
      throw new Error('Not authorized to add user to chat.');
    if (response.status === 403) throw new Error('Forbidden.');
    if (response.status === 404) throw new Error('Chat or user not found.');
    if (response.status === 500) throw new Error('Server error.');
    throw new Error('An unexpected error occurred.');
  },
};

export default ApiHandler;
