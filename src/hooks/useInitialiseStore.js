import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStore } from '../stores/AppStore';
import ApiHandler from '../api/ApiHandler';

export const useInitialiseStore = () => {
  const store = useStore();

  const handleInitialiseStore = async () => {
    console.log('called');
    if (!store.token) {
      console.log('no token');
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');

      if (token) {
        console.log('no async storage');
        await store.setToken(token);
        await store.setUserId(parseInt(userId));
      }
    }

    const userInfo = await ApiHandler.getUserInfo(store.token, store.userId);
    const avatar = await ApiHandler.getAvatar(store.token, store.userId);
    const contacts = await ApiHandler.getContacts(store.token);
    const blocked = await ApiHandler.getBlockedUsers(store.token);
    const chats = await ApiHandler.getChats(store.token);
    await store.setFirstName(userInfo.first_name);
    console.log(store.first_name);
    await store.setLastName(userInfo.last_name);
    await store.setEmail(userInfo.email);
    await store.setAvatar(avatar);
    await store.setBlocked(blocked);
    await store.setContacts(contacts);
    await store.setChats(chats);
  };

  return { handleInitialiseStore };
};
