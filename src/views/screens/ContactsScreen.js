// ContactsScreen.js
import React from 'react';
import { View } from 'react-native';
import Switch from '../components/Switch';
import ContactList from '../components/ContactList';
import { useContacts } from '../../hooks/useContacts';

const ContactsScreen = () => {
  const { error, showContacts, store, setShowContacts, handleSwitchChange } =
    useContacts();

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
            value={showContacts}
            onValueChange={() => {
              setShowContacts(true);
              handleSwitchChange('contacts');
            }}
          />
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Switch
            label="Blocked"
            value={!showContacts}
            onValueChange={() => {
              setShowContacts(false);
              handleSwitchChange('blocked');
            }}
            color="red"
          />
        </View>
      </View>

      <ContactList data={showContacts ? store.contacts : store.blocked} />
    </View>
  );
};

export default ContactsScreen;
