import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChatScreen from '../views/screens/ChatScreen';
import ProfileScreen from '../views/screens/ProfileScreen';
import MainTabNavigator from './MainTabNavigator';
import SearchContactScreen from '../views/screens/SearchContactScreen';
import CreateChatScreen from '../views/screens/CreateChatScreen';
import IconButton from '../views/components/IconButton';
import ChatSettingsScreen from '../views/screens/ChatSettingsScreen';
import { useNavigation } from '@react-navigation/native';
import EditableProfile from '../views/components/EditableProfile';
import { useStore } from '../stores/AppStore';
import AddUsersScreen from '../views/screens/AddUsersScreen';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  const navigation = useNavigation();

  const store = useStore();

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
              <View style={{ flexDirection: 'row' }}>
                <IconButton
                  iconName="albums-outline"
                  onPress={() => store.openDrafts()}
                />
                <IconButton
                  iconName="settings-outline"
                  onPress={() =>
                    navigation.navigate('ChatSettings', { chat: chat })
                  }
                />
              </View>
            ),
          };
        }}
      />
      <Stack.Screen name="AddUsers" component={AddUsersScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Search" component={SearchContactScreen} />
      <Stack.Screen name="CreateChat" component={CreateChatScreen} />
      <Stack.Screen name="EditProfile" component={EditableProfile} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
