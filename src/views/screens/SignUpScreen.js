import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSignUp } from '../../hooks/useSignUp';
import { t } from '../../locales';

import InputField from '../components/InputField';
import ErrorMessage from '../components/ErrorMessage';
import Button from '../components/Button';
import Validate from '../../utilities/ValidateFields';

const SignUpScreen = () => {
  const {
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
  } = useSignUp();

  return (
    <View style={styles.container}>
      <Ionicons name="logo-whatsapp" size={120} color={'#25D366'} />
      <Text style={styles.heading}>WhatsApp</Text>

      {/* First name, more than 2, only alpha*/}
      <InputField
        value={firstName}
        onChangeText={setFirstName}
        errorMessage={Validate.name(firstName)}
        placeholder={t('firstn')}
      />

      {/* Last name*/}
      <InputField
        value={lastName}
        onChangeText={setLastName}
        errorMessage={Validate.name(lastName)}
        placeholder={t('lastn')}
      />

      {/* Email */}
      <InputField
        value={email}
        onChangeText={setEmail}
        errorMessage={Validate.email(email)}
        placeholder={t('email')}
      />

      {/* Password */}
      <InputField
        value={password}
        isPassword={true}
        onChangeText={setPassword}
        errorMessage={Validate.password(password)}
        placeholder={t('password')}
      />

      {/* Confirm Password */}
      <InputField
        isPassword={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        errorMessage={Validate.confirmPassword(password, confirmPassword)}
        placeholder={t('confirm password')}
      />

      <ErrorMessage message={error} />
      {/* Signup Button */}
      <Button label={t('signup')} onPress={handleSignUp} disabled={submitted} />

      {/* LogIn Button */}
      <Button
        label={t('login')}
        onPress={navigateLogIn}
        invert
        disabled={submitted}
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

export default SignUpScreen;
