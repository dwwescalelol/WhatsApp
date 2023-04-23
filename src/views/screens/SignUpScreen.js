import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import ApiHandler from '../../api/ApiHandler';
import ErrorMessage from '../components/ErrorMessage';
import Validate from '../../utilities/ValidateFields';
import Button from '../components/Button';

// TODO: handel aria-label for text inputs, cahnge handelSignUp to do onblur of all fields, maybe change button red

const SignUpScreen = () => {
  const [error, setError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState('');

  const navigation = useNavigation();

  const handleSignUp = async () => {
    setError('');

    if (
      Validate.signUp(firstName, lastName, email, password, confirmPassword)
    ) {
      setError('Make sure all fields are valid.');
      return;
    }

    setSubmitted(true);
    try {
      await ApiHandler.signUp(firstName, lastName, email, password);
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitted(false);
    }
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
        isPassword={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        errorMessage={Validate.confirmPassword(password, confirmPassword)}
        placeholder="Current Password"
      />

      {/* Signup Button */}
      <Button label="SIGN UP" onPress={handleSignUp} disabled={submitted} />

      <ErrorMessage message={error} />
      <Text>Already have an account?</Text>

      {/* LogIn Button */}
      <Button
        label="LOG IN"
        onPress={() => navigation.navigate('LogIn')}
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

export default SignUpScreen;
