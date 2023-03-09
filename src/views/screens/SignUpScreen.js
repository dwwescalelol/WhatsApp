import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignUp = () => {
    // Perform sign-up logic here, such as making an API call to a server
    // If sign-up is successful, navigate to the Chats screen
    navigation.reset({
      routes: [{ name: 'MainApp' }],
    });
  };

  const switchLog = () => {
    // Perform sign-up logic here, such as making an API call to a server
    // If sign-up is successful, navigate to the Chats screen
    navigation.reset({
      routes: [{ name: 'LogIn' }],
    });
  };

  return (
    <View style={styles.container}>
      <Text>Sign Up Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Log In" onPress={switchLog} />
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});
