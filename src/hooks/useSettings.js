import { useState } from 'react';
import ApiHandler from '../api/ApiHandler';
import { useStore } from '../stores/AppStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export const useSettings = () => {
  const store = useStore();
  const navigation = useNavigation();

  const [error, setError] = useState('');

  const handleEditProfile = async () => {
    navigation.navigate('EditProfile');
  };

  const handleChangePassword = async () => {
    navigation.navigate('EditPassword');
  };

  const handleLogout = async () => {
    setError('');

    try {
      await ApiHandler.logout(store.token);
      await AsyncStorage.clear();
      await store.clearAll();
    } catch (error) {
      setError(error.message);
    }
  };

  return {
    error,
    handleEditProfile,
    handleChangePassword,
    handleLogout,
  };
};
