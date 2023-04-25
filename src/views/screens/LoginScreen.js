import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import emailValidator from 'email-validator';
import ErrorMessage from '../components/ErrorMessage';
import ApiHandler from '../../api/ApiHandler';
import Button from '../components/Button';
import { useStore } from '../../stores/AppStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState('');
  const store = useStore();

  const navigation = useNavigation();

  const handleLogin = async () => {
    setError('');

    const isValidEmail = validateEmail(email);
    if (isValidEmail) {
      setError(isValidEmail);
      return;
    }

    setSubmitted(true);
    try {
      const session = await ApiHandler.login(email, password);
      await AsyncStorage.multiSet([
        ['userId', session.id],
        ['token', session.token],
      ]);
      await store.setUserId(session.id);
      await store.setToken(session.token);
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitted(false);
    }
  };

  const validateEmail = (email) => {
    if (!emailValidator.validate(email)) return 'Must enter a valid email.';
    return null;
  };

  return (
    <View style={styles.container}>
      <Ionicons name="logo-whatsapp" size={120} color={'#25D366'} />
      <Text style={styles.heading}>WhatsApp</Text>

      {/* Email */}
      <InputField
        value={email}
        onChangeText={setEmail}
        placeholder="Email Adress"
      />

      {/* Password */}
      <InputField
        isPassword={true}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
      />

      {/* Login Button */}
      <Button label="LOG IN" onPress={handleLogin} disabled={submitted} />

      <ErrorMessage message={error} />
      <Text>Dont have an account?</Text>

      {/* Signup Button */}
      <Button
        label="SIGN UP"
        onPress={() => navigation.navigate('SignUp')}
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
