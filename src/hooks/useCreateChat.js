import { useState } from 'react';
import { useStore } from '../stores/AppStore';
import ApiHandler from '../api/ApiHandler';
import { useUpdateChat } from './useUpdateChat';

export const useCreateChat = () => {
  const store = useStore();

  const handleUpdateChat = useUpdateChat();

  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [chatName, setChatName] = useState('');
  const contacts = store.contacts;

  const handleCreateChat = async () => {
    setError('');
    setSubmitted(true);

    try {
      if (!chatName) throw new Error('Chat must have a name.');
      if (selectedUsers.length === 0)
        throw new Error('Chat must contain at least one contact.');

      const createChatResponse = await ApiHandler.createChat(
        store.token,
        chatName
      );
      const chatId = createChatResponse.chat_id;

      for (const user of selectedUsers) {
        await ApiHandler.addUserToChat(store.token, chatId, user.userId);
      }

      setSelectedUsers([]);
      setChatName('');

      await handleUpdateChat();
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitted(false);
    }
  };

  return {
    contacts,
    chatName,
    setChatName,
    error,
    submitted,
    selectedUsers,
    setSelectedUsers,
    handleCreateChat,
  };
};
