import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ApiHandler from '../../api/ApiHandler';
import { useStore } from '../../stores/AppStore';
import Profile from '../components/Profile';
import Validate from '../../utilities/ValidateFields';
import SucsessMessage from '../components/SucsessMessage';
import Button from '../components/Button';
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
      if (
        Object.keys(originalData).every(
          (key) => changedUserInfo[key] === originalData[key]
        ) ||
        !changedUserInfo
      ) {
        throw new Error('No change in details, try again.');
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
    <View style={styles.container}>
      <View>
        <Profile userId={store.userId} editable onUpdate={onProfileUpdate} />
        <SucsessMessage message={sucsess} />
        <ErrorMessage message={error} />
      </View>
      <View style={styles.buttons}>
        <Button
          label="Confirm Changes"
          onPress={() => {
            handleUpdateUserInfo(changedUserInfo);
          }}
          disabled={submitted}
          style={{ marginBottom: 10 }}
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
    backgroundColor: 'white',
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SettingScreen;
