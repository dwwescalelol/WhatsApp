import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import ApiHandler from '../../api/ApiHandler';
import { useStore } from '../../stores/AppStore';
import Switch from '../components/Switch';
import ContactListItem from '../components/ContactListItem';

const ContactsScreen = () => {
  const store = useStore();
  const [showBlockedContacts, setShowBlockedContacts] = useState(false);
  const [activeSwitch, setActiveSwitch] = useState('contacts');

  // const sortedChats = chats.sort((a, b) =>
  //   a.user.name.localeCompare(b.user.name)
  // );

  const getContacts = async () => {
    try {
      const responce = await ApiHandler.getContacts(store.token);
      store.setContacts(responce);
    } catch (error) {}
  };

  const getBlockedUsers = async () => {
    try {
      const response = await ApiHandler.getBlockedUsers(store.token);
      store.setBlocked(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (showBlockedContacts) {
      getBlockedUsers();
    } else {
      getContacts();
    }
  }, [showBlockedContacts]);

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Switch
            label="Contacts"
            value={activeSwitch === 'contacts'}
            onValueChange={() => setActiveSwitch('contacts')}
          />
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Switch
            label="Blocked"
            value={activeSwitch === 'blockedContacts'}
            onValueChange={() => setActiveSwitch('blockedContacts')}
            color="red"
          />
        </View>
      </View>

      <FlatList
        data={
          activeSwitch === 'blockedContacts' ? store.blocked : store.contacts
        }
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
        }}
      />
    </View>
  );
};

export default ContactsScreen;
