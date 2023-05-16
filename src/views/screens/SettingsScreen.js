import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import { useSettings } from '../../hooks/useSettings';

import Avatar from '../components/Avatar';
import { useStore } from '../../stores/AppStore';

const SettingScreen = () => {
  const { error, handleEditProfile, handleChangePassword, handleLogout } =
    useSettings();

  const store = useStore();

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Avatar uri={store.avatar} />

        {/* first and last name */}
        <View>
          <Text style={styles.infoTitle}>
            {store.firstName} {store.lastName}
          </Text>
        </View>
      </View>
      <View style={styles.separator} />

      {/* email */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Email</Text>
        <Text>{store.email}</Text>
      </View>

      <View style={styles.separator} />

      <ErrorMessage message={error} />
      <Button label="Edit Profile" invert onPress={handleEditProfile} />
      <Button label="Change Password" invert onPress={handleChangePassword} />
      <Button label="Logout" onPress={handleLogout} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  buttons: {
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoContainer: {
    width: '90%',
  },
  separator: {
    height: 1,
    width: '90%',
    backgroundColor: '#c7c7c7',
    marginVertical: 16,
  },
});

export default SettingScreen;
