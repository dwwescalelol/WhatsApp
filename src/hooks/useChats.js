import { useState, useEffect } from 'react';
import { useStore } from '../stores/AppStore';
import ApiHandler from '../api/ApiHandler';

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
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  return {
    error,
    chats,
  };
};
