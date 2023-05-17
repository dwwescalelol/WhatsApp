import React from 'react';
import { useState } from 'react';
import { useStore } from '../stores/AppStore';
import ApiHandler from '../api/ApiHandler';

import { useFocusEffect } from '@react-navigation/native';

export const useChats = () => {
  const store = useStore();

  const [error, setError] = useState('');
  const chats = store.chats;

  const getChats = async () => {
    setError('');
    try {
      const response = await ApiHandler.getChats(store.token);
      store.setChats(response);
    } catch (error) {
      setError(error);
      console.log('caught hanging again');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (!store.token) return;
      getChats();
      return () => {};
    }, [])
  );

  return {
    error,
    chats,
  };
};
