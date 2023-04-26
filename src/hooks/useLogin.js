import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import ApiHandler from '../api/ApiHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStore } from '../stores/AppStore';
import Validate from '../utilities/ValidateFields';

export const useLogin = () => {
  const store = useStore();
  const navigation = useNavigation();

  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleLogin = async () => {
    setError('');
    setSubmitted(true);

    const isValidEmail = Validate.email(email);
    if (isValidEmail) {
      setError(isValidEmail);
      return;
    }

    try {
      const session = await ApiHandler.login(email, password);
      await AsyncStorage.multiSet([
        ['userId', session.id],
        ['token', session.token],
      ]);
      await store.setUserId(session.id);
      await store.setToken(session.token);
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitted(false);
    }
  };

  const navigateSignUp = () => {
    navigation.navigate('SignUp');
  };

  return {
    email,
    password,
    submitted,
    error,
    setEmail,
    setPassword,
    handleLogin,
    navigateSignUp,
  };
};
