import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChatScreen from '../views/screens/ChatScreen';
import ProfileScreen from '../views/screens/ProfileScreen';
import MainTabNavigator from './MainTabNavigator';
import SearchContactScreen from '../views/screens/SearchContactScreen';
import CreateChatScreen from '../views/screens/CreateChatScreen';
import IconButton from '../views/components/IconButton';
import ChatSettingsScreen from '../views/screens/ChatSettingsScreen';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  const navigation = useNavigation();

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
      <Stack.Screen name="ChatSettings" component={ChatSettingsScreen} />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ route }) => {
          const { chat } = route.params;
          return {
            title: chat.name,
            headerRight: () => (
              <IconButton
                iconName="settings-outline"
                onPress={() =>
                  navigation.navigate('ChatSettings', { chat: chat })
                }
              />
            ),
          };
        }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Search" component={SearchContactScreen} />
      <Stack.Screen name="CreateChat" component={CreateChatScreen} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
