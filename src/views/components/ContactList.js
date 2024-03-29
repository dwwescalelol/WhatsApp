// components/ContactList.js
import React from 'react';
import { FlatList, View } from 'react-native';
import ContactListItem from './ContactListItem';
import PropTypes from 'prop-types';

const ContactList = ({ data, onItemPress = null, selectedItems = [] }) => (
  <View
    style={{
      flex: 1,
    }}
  >
    <FlatList
      data={data}
      renderItem={({ item }) => {
        const user = {
          userId: item.user_id,
          firstName: item.first_name ? item.first_name : item.given_name,
          lastName: item.last_name ? item.last_name : item.family_name,
          email: item.email,
        };

        return (
          <ContactListItem
            user={user}
            onPress={onItemPress}
            selected={selectedItems.some(
              (selectedUser) => selectedUser.userId === user.userId
            )}
          />
        );
      }}
    />
  </View>
);

ContactList.propTypes = {
  data: PropTypes.array,
  onItemPress: PropTypes.func,
  selectedItems: PropTypes.array,
};

export default ContactList;
