import React from 'react';

import PropTypes from 'prop-types';
import { Text, Image, StyleSheet, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ContactListItem = ({ user }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate('Profile', { user: user })}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? 'lightgray' : 'white',
        },
      ]}
    >
      <View style={styles.container}>
        <Image source={{ uri: user.image }} style={styles.image} />

        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>
            {user.name}
          </Text>

          <Text numberOfLines={1} style={styles.subTitle}>
            {user.status == null
              ? 'Hey there! I am using WhatsApp.'
              : user.status}
          </Text>

          <View style={styles.separator} />
        </View>
      </View>
    </Pressable>
  );
};

ContactListItem.propTypes = {
  user: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 5,
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
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
    marginTop: 5,
  },
});

export default ContactListItem;
