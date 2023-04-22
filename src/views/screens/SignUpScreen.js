import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import ApiHandler from '../../api/ApiHandler';
import ErrorMessage from '../components/ErrorMessage';
import Validate from '../../utilities/ValidateFields';

// TODO: handel aria-label for text inputs, cahnge handelSignUp to do onblur of all fields, maybe change button red

const SignUpScreen = () => {
  const [apiResponce, setApiResponce] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState('');

  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (isSignUpValid()) {
      setApiResponce('Make sure all fields are valid.');
      return;
    }

    setSubmitted(true);
    try {
      await ApiHandler.signUp(firstName, lastName, email, password);
    } catch (error) {
      setApiResponce(error.message);
    } finally {
      setSubmitted(false);
    }
  };

  const isSignUpValid = () => {
    return (
      Validate.name(firstName) ||
      Validate.name(lastName) ||
      Validate.email(email) ||
      Validate.password(password) ||
      Validate.confirmPassword(password, confirmPassword)
    );
  };

  return (
    <View style={styles.container}>
      <Ionicons name="logo-whatsapp" size={120} color={'#25D366'} />
      <Text style={styles.heading}>WhatsApp</Text>

      {/* First name, more than 2, only alpha*/}
      <InputField
        value={firstName}
        onChangeText={setFirstName}
        errorMessage={Validate.name(firstName)}
        placeholder="First Name"
      />
      {/* Last name*/}
      <InputField
        value={lastName}
        onChangeText={setLastName}
        errorMessage={Validate.name(lastName)}
        placeholder="Last Name"
      />
      {/* Email */}
      <InputField
        value={email}
        onChangeText={setEmail}
        errorMessage={Validate.email(email)}
        placeholder="Email Adress"
      />
      {/* Password */}
      <InputField
        value={password}
        isPassword={true}
        onChangeText={setPassword}
        errorMessage={Validate.password(password)}
        placeholder="Password"
      />
      {/* Confirm Password */}
      <InputField
        label="Confirm Password"
        isPassword={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        errorMessage={Validate.confirmPassword(password, confirmPassword)}
        placeholder="Current Password"
      />
      {/* Login Button */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleSignUp}
        disabled={submitted}
      >
        <Text style={styles.loginText}>SIGN UP</Text>
      </TouchableOpacity>

      <ErrorMessage message={apiResponce} />
      <Text>Already have an account?</Text>
      {/* Signup Button */}
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
