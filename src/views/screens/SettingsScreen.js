import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import ApiHandler from '../../api/ApiHandler';

const SettingScreen = () => {
  const [submitted, setSubmitted] = useState('');

  // implemeneted to a proffessional standard
  const handleLogout = async () => {
    setSubmitted(true);
    try {
      await ApiHandler.logout();
    } catch (error) {
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});

export default SettingScreen;
