import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import emailValidator from 'email-validator';
import ApiWrapper from '../../api/ApiWrapper';

// TODO: handel aria-label for text inputs, cahnge handelSignUp to do onblur of all fields, maybe change button red

const SignUpScreen = () => {
  const [apiResponce, setApiResponce] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (isSignUpValid()) {
      setApiResponce('Make sure all fields are valid.');
      return;
    }
    const responce = await ApiWrapper.register(
      firstName,
      lastName,
      email,
      password
    );
    if (responce.status == 201) navigation.navigate('LogIn');
    if (responce.status == 400) setApiResponce('Email is already registered.');
    if (responce.status == 500)
      setApiResponce('What the fuck happend here then.');
  };

  const isSignUpValid = () => {
    return (
      validateName(firstName) ||
      validateName(lastName) ||
      validateEmail(email) ||
      validatePassword(password) ||
      validateConfirmPassword(password, confirmPassword)
    );
  };

  const alphabetRegex = /^[a-zA-Z]+$/;
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

  const validateName = (name) => {
    if (name.length < 2) return 'Must be atleast 3 charecters';
    if (!alphabetRegex.test(name))
      return 'Name must consist of only alphabetical charecters';
    return null;
  };

  const validateEmail = (email) => {
    if (!emailValidator.validate(email)) return 'Not a valid email';
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
        isPassword={true}
        onChangeText={setPassword}
        errorMessage={validatePassword(password)}
        placeholder="Password"
      />
      {/* Confirm Password */}
      <InputField
        label="Confirm Password"
        isPassword={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        errorMessage={validateConfirmPassword(password, confirmPassword)}
        placeholder="Current Password"
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
        <Text style={styles.loginText}>SIGN UP</Text>
      </TouchableOpacity>

      {apiResponce ? (
        <Text style={styles.responceText}>{apiResponce}</Text>
      ) : (
        <Text>Already have an account?</Text>
      )}

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
  responceText: {
    color: 'red',
  },
});

export default SignUpScreen;
