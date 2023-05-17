import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import ChatsScreen from '../views/screens/ChatsScreen';
import { Ionicons } from '@expo/vector-icons';
import ContactsScreen from '../views/screens/ContactsScreen';
import SettingScreen from '../views/screens/SettingsScreen';
import IconButton from '../views/components/IconButton';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      initialRouteName="Contacts"
      screenOptions={{
        tabBarStyle: { backgroundColor: 'whitesmoke' },
        headerStyle: { backgroundColor: 'whitesmoke' },
      }}
    >
      <Tab.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
          headerRight: () => (
            <IconButton
              iconName={'person-add-outline'}
              onPress={() => navigation.navigate('Search')}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles-outline" size={size} color={color} />
          ),
          headerRight: () => (
            <IconButton
              iconName={'ios-add-circle-outline'}
              onPress={() => navigation.navigate('CreateChat')}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
          tabBarLabel: () => null,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
