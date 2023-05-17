import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useContacts } from '../../hooks/useContacts';
import { t } from '../../locales';

import Switch from '../components/Switch';
import ContactList from '../components/ContactList';

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
            label={t('blocked')}
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
      {contacts.length == 0 ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ fontSize: 18, fontWeight: '500', color: 'gray' }}>
            {t('nofriends')}
          </Text>
          <Image
            source={{
              uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/capybara+copy.png',
            }}
            style={{ width: '100%', aspectRatio: 2 / 1 }}
            resizeMode="contain"
          />
        </View>
      ) : null}
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
