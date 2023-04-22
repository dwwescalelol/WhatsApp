import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useStore } from '../../stores/AppStore';
import ApiWrapper from '../../api/ApiWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingScreen = () => {
  const store = useStore();

  const handleLogout = async () => {
    await ApiWrapper.logout(store.token);
    await AsyncStorage.clear();
    await store.clearAll();
  };

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default SettingScreen;

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
