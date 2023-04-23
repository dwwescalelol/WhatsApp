import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import ApiHandler from '../../api/ApiHandler';
import { useStore } from '../../stores/AppStore';
import Profile from '../components/Profile';

const SettingScreen = () => {
  const store = useStore();
  const [submitted, setSubmitted] = useState('');
  const [changedUserInfo, setChangedUserInfo] = useState({});

  // implemented to a professional standard
  const handleLogout = async () => {
    setSubmitted(true);
    try {
      await ApiHandler.logout();
    } catch (error) {
    } finally {
      setSubmitted(false);
    }
  };

  const handleUpdateUserInfo = async (userData) => {
    setSubmitted(true);

    try {
      await ApiHandler.updateUserInfo(store.token, store.userId, userData);
    } catch (error) {
      console.error(error.message);
    } finally {
      setSubmitted(false);
    }
  };

  const onProfileUpdate = async (firstName, lastName, email) => {
    setChangedUserInfo({ firstName, lastName, email });
    console.log(changedUserInfo);
  };

  return (
    <View>
      <Profile userId={store.userId} editable onUpdate={onProfileUpdate} />
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
