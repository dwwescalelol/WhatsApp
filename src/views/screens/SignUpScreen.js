import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import InputField from '../components/InputField';
import ErrorMessage from '../components/ErrorMessage';
import Validate from '../../utilities/ValidateFields';
import Button from '../components/Button';
import { useSignUp } from '../../hooks/useSignUp';

// TODO: handel aria-label for text inputs, cahnge handelSignUp to do onblur of all fields, maybe change button red

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

      <ErrorMessage message={error} />
      {/* Signup Button */}
      <Button label="SIGN UP" onPress={handleSignUp} disabled={submitted} />

      {/* LogIn Button */}
      <Button
        label="LOG IN"
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
