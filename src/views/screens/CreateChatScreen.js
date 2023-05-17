import React from 'react';
import { View, StyleSheet } from 'react-native';
import ContactList from '../components/ContactList';
import InputField from '../components/InputField';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import { useCreateChat } from '../../hooks/useCreateChat';
import { t } from '../../locales';

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
          placeholder={t('chatn')}
        />
      </View>
      <ContactList
        data={contacts}
        onItemPress={handleItemPress}
        selectedItems={selectedUsers}
      />
      <View style={styles.buttons}>
        <ErrorMessage message={error} />
        <Button
          label={t('createc')}
          onPress={handleCreateChat}
          disable={submitted}
          style={{ marginBottom: 10 }}
        />
      </View>
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
