import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import emailValidator from 'email-validator';
import fetch from 'node-fetch';

// TODO: handel aria-label for text inputs

const SignUpScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation();

  const handleSignUp = () => {
    // navigation.navigate('MainApp');
  };

  const alphabetRegex = /^[a-zA-Z]+$/;
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  // check legnth, check regex. Ed is a name
  const validateName = (name) => {
    if (name.length < 2) return 'Must be atleast 3 charecters';
    if (!alphabetRegex.test(name))
      return 'Name must consist of only alphabetical charecters';
    return null;
  };

  const validateEmail = (email) => {
    if (!emailValidator.validate(email))
      return 'Not a valid email, please try again cunt';
    return null;
  };

  const validatePassword = (password) => {
    if (!passwordRegex.test(password)) return 'Password too week';
    return null;
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (!(password === confirmPassword)) return 'Passwords are not the same';
    return null;
  };
  return (
    <View style={styles.container}>
      <Ionicons name="logo-whatsapp" size={120} color={'#25D366'} />
      <Text style={styles.heading}>WhatsApp</Text>

      {/* First name, more than 2, only alpha*/}
      <InputField
        value={firstName}
        onChangeText={setFirstName}
        errorMessage={validateName(firstName)}
        placeholder="First Name"
      />
      {/* Last name*/}
      <InputField
        value={lastName}
        onChangeText={setLastName}
        errorMessage={validateName(lastName)}
        placeholder="Last Name"
      />
      {/* Email */}
      <InputField
        value={email}
        onChangeText={setEmail}
        errorMessage={validateEmail(email)}
        placeholder="Email Adress"
      />
      {/* Password */}
      <InputField
        value={password}
        onChangeText={setPassword}
        errorMessage={validatePassword(password)}
        placeholder="Password"
      />
      {/* Confirm Password */}
      <InputField
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        errorMessage={validateConfirmPassword(password, confirmPassword)}
        placeholder="Current Password"
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
        <Text style={styles.loginText}>SIGN UP</Text>
      </TouchableOpacity>
      <Text>Already have an account?</Text>
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => navigation.navigate('LogIn')}
      >
        <Text style={styles.signupText}>LOG IN</Text>
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
});

export default SignUpScreen;
