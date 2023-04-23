import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import ApiHandler from '../../api/ApiHandler';
import { useStore } from '../../stores/AppStore';
import Profile from '../components/Profile';
import Validate from '../../utilities/ValidateFields';
import SucsessMessage from '../components/SucsessMessage';
import ErrorMessage from '../components/ErrorMessage';

const SettingScreen = () => {
  const store = useStore();
  const [submitted, setSubmitted] = useState('');
  const [changedUserInfo, setChangedUserInfo] = useState({});
  const [error, setError] = useState('');
  const [sucsess, setSucsess] = useState('');

  // implemented to a professional standard
  const handleLogout = async () => {
    setSucsess('');
    setError('');

    setSubmitted(true);
    try {
      await ApiHandler.logout();
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitted(false);
    }
  };

  // update ONLY if the new user information is differnt to the old user information
  // the new user information should be valid.
  const handleUpdateUserInfo = async (userData) => {
    setSucsess('');
    setError('');
    setSubmitted(true);
    try {
      const originalData = {
        firstName: store.firstName,
        lastName: store.lastName,
        email: store.email,
      };

      // if no change, throw error
      console.log(originalData);
      console.log(changedUserInfo);
      if (
        Object.keys(originalData).every(
          (key) => changedUserInfo[key] === originalData[key]
        ) ||
        !changedUserInfo
      ) {
        throw new Error('blah blah blah');
      }

      await ApiHandler.updateUserInfo(store.token, store.userId, userData);
      setSucsess('Details sucsessfully updated!');
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitted(false);
    }
  };

  const onProfileUpdate = async (firstName, lastName, email) => {
    setChangedUserInfo({ firstName, lastName, email });
  };

  return (
    <View>
      <Profile userId={store.userId} editable onUpdate={onProfileUpdate} />
      <SucsessMessage message={sucsess} />
      <ErrorMessage message={error} />

      <Button
        title="Confirm Changes"
        onPress={() => {
          handleUpdateUserInfo(changedUserInfo);
        }}
      />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default SettingScreen;
