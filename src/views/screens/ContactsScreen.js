import React from 'react';
import { View, StyleSheet } from 'react-native';
import Switch from '../components/Switch';
import ContactList from '../components/ContactList';
import { useContacts } from '../../hooks/useContacts';
import { t } from '../../locales';

const ContactsScreen = () => {
  const {
    error,
    showContacts,
    contacts,
    blocked,
    setShowContacts,
    handleSwitchChange,
  } = useContacts();

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <View style={styles.switch}>
          <Switch
            label={t('contacts')}
            value={showContacts}
            onValueChange={() => {
              setShowContacts(true);
              handleSwitchChange('contacts');
            }}
          />
        </View>
        <View style={styles.switch}>
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

      <ContactList data={showContacts ? contacts : blocked} />
    </View>
  );
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
});
export default ContactsScreen;
