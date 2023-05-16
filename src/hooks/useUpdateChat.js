import { useStore } from '../stores/AppStore';
import { useNavigation } from '@react-navigation/native';
import ApiHandler from '../api/ApiHandler';

export const useUpdateChat = () => {
  const store = useStore();
  const navigation = useNavigation();

  const handleUpdateChat = async () => {
    try {
      const chats = await ApiHandler.getChats(store.token);
      await store.setChats(chats);

      navigation.navigate('Chats');
    } catch {}
  };

  return handleUpdateChat;
};
