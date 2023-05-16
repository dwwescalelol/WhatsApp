import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import ApiHandler from '../api/ApiHandler';
import Validate from '../utilities/ValidateFields';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStore } from '../stores/AppStore';

export const useSignUp = () => {
  const store = useStore();
  const navigation = useNavigation();

  const [error, setError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState('');

  const handleSignUp = async () => {
    setError('');
    setSubmitted(true);

    if (
      Validate.signUp(firstName, lastName, email, password, confirmPassword)
    ) {
      setError('Make sure all fields are valid.');
      return;
    }

    try {
      const session = await ApiHandler.signUp(
        firstName,
        lastName,
        email,
        password
      );
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

  const navigateLogIn = () => {
    navigation.navigate('LogIn');
  };

  return {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    submitted,
    error,
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleSignUp,
    navigateLogIn,
  };
};
