import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLogin } from '../../hooks/useLogin';
import InputField from '../components/InputField';
import ErrorMessage from '../components/ErrorMessage';
import Button from '../components/Button';

const LoginScreen = () => {
  const {
    email,
    password,
    submitted,
    error,
    setEmail,
    setPassword,
    handleLogin,
    navigateSignUp,
  } = useLogin();

  return (
    <View style={styles.container}>
      <Ionicons name="logo-whatsapp" size={120} color={'#25D366'} />
      <Text style={styles.heading}>WhatsApp</Text>

      {/* Email */}
      <InputField
        value={email}
        onChangeText={setEmail}
        placeholder="Email Address"
      />

      {/* Password */}
      <InputField
        isPassword={true}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
      />

      {/* Login Button */}
      <ErrorMessage message={error} />
      <Button label="LOG IN" onPress={handleLogin} disable={submitted} />

      {/* Signup Button */}
      <Button
        label="SIGN UP"
        onPress={navigateSignUp}
        disable={submitted}
        invert
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

export default LoginScreen;
