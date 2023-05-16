import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStore } from '../stores/AppStore';
import ApiHandler from '../api/ApiHandler';

export const useInitialiseStore = () => {
  const store = useStore();

  const handleInitialiseStore = async () => {
    if (!store.token) {
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');

      if (token) {
        await store.setUserId(parseInt(userId));
        await store.setToken(token);
      }
    }

    if (store.token) {
      const userInfo = await ApiHandler.getUserInfo(store.token, store.userId);
      const avatar = await ApiHandler.getAvatar(store.token, store.userId);
      const contacts = await ApiHandler.getContacts(store.token);
      const blocked = await ApiHandler.getBlockedUsers(store.token);
      await store.setFirstName(userInfo.first_name);
      await store.setLastName(userInfo.last_name);
      await store.setEmail(userInfo.email);
      await store.setAvatar(avatar);
      await store.setContacts(contacts);
      await store.setBlocked(blocked);

      // if no chats this will hang indefinatly cause api.
      ApiHandler.getChats(store.token).then((chats) => store.setChats(chats));
    }
  };

  return handleInitialiseStore;
};
