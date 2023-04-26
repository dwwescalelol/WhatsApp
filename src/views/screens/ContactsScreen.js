import React, { useState, useEffect, useCallback } from 'react';
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
      const responce = await ApiHandler.getContacts(store.token);
      store.setContacts(responce);
    } catch (error) {}
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <FlatList
      data={store.contacts}
      renderItem={({ item }) => (
        <ContactListItem
          user={{
            userId: item.user_id,
            firstName: item.first_name,
            lastName: item.last_name,
            email: item.email,
          }}
        />
      )}
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    />
  );
};

export default ContactsScreen;
