import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChatScreen from '../views/screens/ChatScreen';
import ProfileScreen from '../views/screens/ProfileScreen';
import MainTabNavigator from './MainTabNavigator';
import SearchScreen from '../views/screens/SearchScreen';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: 'whitesmoke' } }}
    >
      <Stack.Screen
        name="Main"
        component={MainTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
