import React from 'react';
import { FlatList } from 'react-native';
import ContactListItem from '../components/ContactListItem';
import ApiHandler from '../../api/ApiHandler';
import { useStore } from '../../stores/AppStore';

const ContactsScreen = () => {
  const store = useStore();
  // const sortedChats = chats.sort((a, b) =>
  //   a.user.name.localeCompare(b.user.name)
  // );

  const getContacts = async () => {
    try {
      const contacts = await ApiHandler.getContacts(store.token);
      console.log(contacts);
      return contacts;
    } catch (error) {}
  };

  return (
    <FlatList
      data={getContacts()}
      renderItem={({ item }) => <ContactListItem user={item.user} />}
      style={{ backgroundColor: 'white' }}
    />
  );
};

export default ContactsScreen;
