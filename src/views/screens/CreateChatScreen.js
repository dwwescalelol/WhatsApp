// AddChatScreen.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ContactList from '../components/ContactList';
import { useStore } from '../../stores/AppStore';
import InputField from '../components/InputField';
import Button from '../components/Button';
import ApiHandler from '../../api/ApiHandler';
import ErrorMessage from '../components/ErrorMessage';
import { useSearchContact } from '../../hooks/useSearchContact';

const CreateChatScreen = () => {
  const store = useStore();

  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [chatName, setChatName] = useState('');
  const [search, setSearch] = useState('');

  const handleItemPress = (user) => {
    const users = selectedUsers.find((item) => item.userId === user.userId);

    if (users) {
      setSelectedUsers(
        selectedUsers.filter((item) => item.userId !== user.userId)
      );
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };
  const { searchText, searchResults, searchError, setSearchText } =
    useSearchContact({ searchIn: 'contacts' });
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

      // Navigate to the chat screen or any other desired screen
      // navigation.navigate('ChatScreen', { chatId });
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <InputField
          value={chatName}
          onChangeText={setChatName}
          placeholder="Chat Name"
        />
        <ErrorMessage message={error} />
        <Button
          label="Create Chat"
          onPress={handleCreateChat}
          disable={submitted}
        />
        <InputField
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search"
        />
      </View>
      <ContactList
        data={searchResults.length == 0 ? store.contacts : searchResults}
        onItemPress={handleItemPress}
        selectedItems={selectedUsers}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  buttons: {
    alignItems: 'center',
  },
});

export default CreateChatScreen;
