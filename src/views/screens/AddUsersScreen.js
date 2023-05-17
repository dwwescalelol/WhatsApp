import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import ContactList from '../components/ContactList';
import { useContacts } from '../../hooks/useContacts';
import PropTypes from 'prop-types';
import { useStore } from '../../stores/AppStore';
import ApiHandler from '../../api/ApiHandler';
import Button from '../components/Button';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSearchUsers } from '../../hooks/useSearchUsers';
import InputField from '../components/InputField';
import ErrorMessage from '../components/ErrorMessage';

const AddUsersScreen = ({ route }) => {
  const chat = route.params;
  const store = useStore();
  const navigation = useNavigation();

  const { searchText, searchResults, setSearchText } =
    useSearchUsers('contacts');
  const { contacts } = useContacts();

  const [error, setError] = useState('');
  const [members, setMembers] = useState(chat.members);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filteredSearch, setFilteredSearch] = useState([]);

  const memberIds = members.map((user) => user.user_id);
  const filteredContacts = contacts.filter(
    (user) => !memberIds.includes(user.user_id)
  );

  const handleItemPress = (user) => {
    if (user.userId === store.userId) return;

    const users = selectedUsers.find((item) => item.userId === user.userId);
    if (users) {
      setSelectedUsers(
        selectedUsers.filter((item) => item.userId !== user.userId)
      );
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const updateChatInfo = async () => {
    setError('');

    try {
      const responce = await ApiHandler.getChatDetails(
        store.token,
        chat.chatId
      );
      console.log(responce);
      setMembers(responce.members);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    const memberIds = members.map((user) => user.user_id);
    const filtered = searchResults.filter(
      (user) => !memberIds.includes(user.user_id)
    );
    setFilteredSearch(filtered);
  }, [searchResults]);

  useFocusEffect(
    React.useCallback(() => {
      updateChatInfo();
      return () => {};
    }, [])
  );

  const handleAddUsers = async () => {
    selectedUsers.map(async (user) => {
      await ApiHandler.addUserToChat(store.token, chat.chatId, user.userId);
      if (chat.members.filter((u) => u.user_id === user.userId) === 0) {
        chat.members.push({
          user_id: user.userId,
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email,
        });
      }
    });
    console.log(chat.members);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <InputField
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search"
        />
        <ErrorMessage message={error} />
      </View>

      <ContactList
        data={searchText ? filteredSearch : filteredContacts}
        selectedItems={selectedUsers}
        onItemPress={handleItemPress}
      />
      <Button
        label="Add Users"
        onPress={handleAddUsers}
        invert
        style={{ alignSelf: 'center', marginBottom: 10 }}
      />
    </View>
  );
};

AddUsersScreen.propTypes = {
  route: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  switch: {
    flex: 1,
    alignItems: 'center',
  },
  searchContainer: {
    paddingTop: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    borderColor: '#c7c7c7',
    marginBottom: 10,
  },
});
export default AddUsersScreen;
