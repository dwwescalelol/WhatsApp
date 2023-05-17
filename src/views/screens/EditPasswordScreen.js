import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useStore } from '../../stores/AppStore';
import { t } from '../../locales';

import ApiHandler from '../../api/ApiHandler';
import Validate from '../../utilities/ValidateFields';
import ErrorMessage from '../components/ErrorMessage';
import InputField from '../components/InputField';
import Button from '../components/Button';

const EditPasswordScreen = () => {
  const navigation = useNavigation();
  const store = useStore();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleEditPassword = async () => {
    setSubmitted(true);
    try {
      const responce = await ApiHandler.updateUserInfo(
        store.token,
        store.userId,
        store.firstName,
        store.lastName,
        store.email,
        password
      );
      console.log(responce);
    } catch (error) {
      setError(error);
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <View style={styles.container}>
      <InputField
        value={password}
        isPassword={true}
        onChangeText={setPassword}
        errorMessage={Validate.password(password)}
        placeholder={t('password')}
      />

      <InputField
        isPassword={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        errorMessage={Validate.confirmPassword(password, confirmPassword)}
        placeholder={t('current password')}
      />

      <ErrorMessage message={error} />

      <Button
        label={t('change password')}
        onPress={async () => {
          await handleEditPassword();
          navigation.navigate('Settings');
        }}
        disable={submitted}
        invert
        color="red"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default EditPasswordScreen;
