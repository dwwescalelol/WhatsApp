import { useState } from 'react';
import ApiHandler from '../api/ApiHandler';
import { useStore } from '../stores/AppStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useSettings = () => {
  const store = useStore();

  const [submitted, setSubmitted] = useState('');
  const [error, setError] = useState('');

  const handleLogout = async () => {
    setSuccess('');
    setError('');

    setSubmitted(true);
    try {
      await ApiHandler.logout(store.token);
      await AsyncStorage.clear();
      await store.clearAll();
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitted(false);
    }
  };

  return {
    error,
    handleLogout,
  };
};
