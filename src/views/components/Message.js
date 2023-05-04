import React from 'react';

import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { useStore } from '../../stores/AppStore';
import formatTime from '../../utilities/FormatTime';

const Message = ({ value }) => {
  const store = useStore();

  const isMyMessage = () => {
    return value.author.user_id === store.userId;
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isMyMessage() ? '#DCF8C5' : 'white',
          alignSelf: isMyMessage() ? 'flex-end' : 'flex-start',
        },
      ]}
    >
      <Text>{value.message}</Text>
      <Text style={styles.time}>{formatTime(value.timestamp)}</Text>
    </View>
  );
};

Message.propTypes = {
  value: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  value: {},
  time: {
    alignSelf: 'flex-end',
    color: 'grey',
  },
});

export default Message;
