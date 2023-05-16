import { useState } from 'react';
import { useStore } from '../stores/AppStore';
import ApiHandler from '../api/ApiHandler';
import { useUpdateChat } from './useUpdateChat';

export const useChatSettings = ({ chat }) => {
  const store = useStore();
  const handleUpdateChat = useUpdateChat();

  const numMembers = chat.members.length;
  const isAdmin = chat.creator.user_id === store.userId;
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [error, setError] = useState('');
  const [displayedChatName, setDisplayedChatName] = useState(chat.name);
  const [chatName, setChatName] = useState(chat.name);
  const [members, setMembers] = useState(chat.members);

  const handleEditChat = async () => {
    setError('');
    try {
      await ApiHandler.updateChat(store.token, chat.chatId, chatName);
      setDisplayedChatName(chatName);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRemoveUsers = async () => {
    setError('');

    try {
      const updatedMembers = [...members];

      for (const user of selectedUsers) {
        await ApiHandler.removeUserFromChat(
          store.token,
          chat.chatId,
          user.userId
        );

        const index = updatedMembers.findIndex(
          (member) => member.user_id === user.userId
        );
        if (index !== -1) {
          updatedMembers.splice(index, 1);
        }
      }

      setMembers(updatedMembers);
      setSelectedUsers([]);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleItemPress = (user) => {
    if (user.userId === store.userId) {
      return; // Do not proceed with the rest of the function
    }

    const users = selectedUsers.find((item) => item.userId === user.userId);

    if (users) {
      setSelectedUsers(
        selectedUsers.filter((item) => item.userId !== user.userId)
      );
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleLeaveChat = async () => {
    setError('');

    try {
      await ApiHandler.removeUserFromChat(
        store.token,
        chat.chatId,
        store.userId
      );
      await handleUpdateChat();
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  return {
    members,
    numMembers,
    isAdmin,
    selectedUsers,
    displayedChatName,
    chatName,
    setChatName,
    handleEditChat,
    handleRemoveUsers,
    handleItemPress,
    handleLeaveChat,
  };
};
