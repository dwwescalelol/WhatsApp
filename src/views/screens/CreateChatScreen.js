import React from 'react';
import { View, StyleSheet } from 'react-native';
import ContactList from '../components/ContactList';
import InputField from '../components/InputField';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import { useSearchUsers } from '../../hooks/useSearchUsers';
import { useCreateChat } from '../../hooks/useCreateChat';

const CreateChatScreen = () => {
  const {
    contacts,
    chatName,
    setChatName,
    error,
    submitted,
    selectedUsers,
    setSelectedUsers,
    handleCreateChat,
  } = useCreateChat();

  const { searchText, searchResults, searchError, setSearchText } =
    useSearchUsers({ searchIn: 'contacts' });

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
        <ErrorMessage message={searchError} />
      </View>
      <ContactList
        data={
          searchResults.length == 0 && !searchText ? contacts : searchResults
        }
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
