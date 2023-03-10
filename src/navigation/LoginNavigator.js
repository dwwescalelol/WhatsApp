import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainStackNavigator from './MainStackNavigator';
import SignUpScreen from '../views/screens/SignUpScreen';
import LogInScreen from '../views/screens/LoginScreen';

const Stack = createNativeStackNavigator();

const LoginNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LogIn"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="LogIn" component={LogInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="MainApp" component={MainStackNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoginNavigator;
