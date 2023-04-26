import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import EditableProfile from '../components/EditableProfile';
import { useSettings } from '../../hooks/useSettings';

const SettingScreen = () => {
  const { error, handleLogout } = useSettings();

  return (
    <View style={styles.container}>
      <View>
        <EditableProfile />
      </View>
      <View style={styles.buttons}>
        <ErrorMessage message={error} />
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
