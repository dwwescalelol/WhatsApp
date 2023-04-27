// components/ContactList.js
import React from 'react';
import { FlatList } from 'react-native';
import ContactListItem from './ContactListItem';
import PropTypes from 'prop-types';

const ContactList = ({ data, onItemPress = null, selectedItems = [] }) => (
  <FlatList
    data={data}
    renderItem={({ item }) => (
      <ContactListItem
        user={{
          userId: item.user_id,
          firstName: item.first_name ? item.first_name : item.given_name,
          lastName: item.last_name ? item.last_name : item.family_name,
          email: item.email,
        }}
        onPress={onItemPress}
        selected={selectedItems?.includes(item.user_id)}
      />
    )}
    style={{
      flex: 1,
    }}
  />
);

ContactList.propTypes = {
  data: PropTypes.array,
  onItemPress: PropTypes.func,
  selectedItems: PropTypes.array,
};

export default ContactList;
