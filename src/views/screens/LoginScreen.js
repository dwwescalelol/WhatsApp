import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import emailValidator from 'email-validator';
import ApiWrapper from '../../api/ApiWrapper';

const LoginScreen = () => {
  const [apiResponce, setApiResponce] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState('');

  const navigation = useNavigation();

  const handleLogin = async () => {
    if (validateEmail(email)) {
      setApiResponce('Must enter a valid email.');
      return;
    }

    setSubmitted(true);
    const responce = await ApiWrapper.login(email, password);
    if (responce.status == 200) navigation.navigate('MainApp');
    if (responce.status == 400)
      setApiResponce('Email and password do not match.');
    if (responce.status == 500)
      setApiResponce('What the fuck happend here then.');
    setSubmitted(false);
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
        errorMessage={validateEmail(email)}
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
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={submitted}
      >
        <Text style={styles.loginText}>LOG IN</Text>
      </TouchableOpacity>

      {/* Error Message */}
      {apiResponce ? (
        <Text style={styles.responceText}>{apiResponce}</Text>
      ) : (
        <Text>Dont have an account?</Text>
      )}

      {/* Signup Button */}
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.signupText}>SIGN UP</Text>
      </TouchableOpacity>
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
  loginButton: {
    backgroundColor: '#25D366',
    padding: 10,
    borderRadius: 5,
    width: '80%',
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signupButton: {
    padding: 5,
    width: '80%',
  },
  signupText: {
    color: '#25D366',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  responceText: {
    color: 'red',
  },
});

export default LoginScreen;
