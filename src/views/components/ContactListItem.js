import React from 'react';

import PropTypes from 'prop-types';
import { Text, StyleSheet, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Avatar from './Avatar';

const ContactListItem = ({ user, onPress = null, selected = false }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    if (onPress) {
      onPress(user);
    } else {
      navigation.navigate('Profile', { user });
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        {
          flex: 1,
          width: '100%',
          backgroundColor: selected
            ? 'lightblue'
            : pressed
            ? 'lightgray'
            : 'white',
        },
      ]}
    >
      <View style={styles.container}>
        <Avatar userId={user.userId} style={styles.image} />

        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>
            {user.firstName} {user.lastName}
          </Text>

          <Text numberOfLines={1} style={styles.subTitle}>
            {user.email}
          </Text>
          <View style={styles.separator} />
        </View>
      </View>
    </Pressable>
  );
};

ContactListItem.propTypes = {
  user: PropTypes.object,
  onPress: PropTypes.func,
  selected: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 5,
    height: 45,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 30,
    marginRight: 10,
  },
  name: {
    fontWeight: 'bold',
  },
  subTitle: {
    color: 'gray',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'lightgray',
  },
});

export default ContactListItem;
