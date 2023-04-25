import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ApiHandler from '../../api/ApiHandler';
import { useStore } from '../../stores/AppStore';
import SucsessMessage from '../components/SucsessMessage';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import EditableProfile from '../components/EditableProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingScreen = () => {
  const store = useStore();
  const [submitted, setSubmitted] = useState('');
  const [changedUserInfo, setChangedUserInfo] = useState({});
  const [error, setError] = useState('');
  const [sucsess, setSucsess] = useState('');
  const [avatar, setAvatar] = useState(null);

  const handleLogout = async () => {
    setSucsess('');
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
      if (
        (Object.keys(originalData).every(
          (key) => changedUserInfo[key] === originalData[key]
        ) ||
          !changedUserInfo) &&
        !avatar
      ) {
        throw new Error('No change in details, try again.');
      }

      await ApiHandler.updateUserInfo(store.token, store.userId, userData);
      await store.updateUserInfo(
        changedUserInfo.firstName,
        changedUserInfo.lastName,
        changedUserInfo.email
      );
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

  const onAvatarUpdate = (avatar) => {
    setAvatar(avatar);
  };

  const handleUpdateAvatar = async () => {
    if (avatar) {
      try {
        const blob = await (await fetch(avatar)).blob();
        await ApiHandler.uploadAvatar(store.token, store.userId, blob);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleConfirmChanges = async () => {
    setError('');
    setSucsess('');
    await handleUpdateUserInfo(changedUserInfo);
    await handleUpdateAvatar();
  };

  return (
    <View style={styles.container}>
      <View>
        <EditableProfile
          onUpdate={onProfileUpdate}
          onAvatarUpdate={onAvatarUpdate}
        />
      </View>
      <View style={styles.buttons}>
        <SucsessMessage message={sucsess} />
        <ErrorMessage message={error} />

        <Button
          label="Confirm Changes"
          onPress={handleConfirmChanges} // Call the new function to handle both updates
          disabled={submitted}
          style={{ margin: 10 }}
          invert
        />
        <Button label="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SettingScreen;
