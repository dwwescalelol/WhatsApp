import React from 'react';

import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import formatTime from '../../utilities/FormatTime';

const Message = ({ value, isCurrentUser, isFirstMessage }) => {
  const getColor = () => {
    const input = JSON.stringify(value.author);
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      hash = input.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += ('00' + value.toString(16)).substr(-2);
    }

    return '#' + color;
  };

  return (
    <View style={[styles.container, { marginTop: isFirstMessage ? 13 : 0 }]}>
      <View
        style={[
          styles.textBox,
          {
            backgroundColor: isCurrentUser ? '#DCF8C5' : 'white',
            alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
          },
        ]}
      >
        {isFirstMessage && !isCurrentUser ? (
          <Text
            style={[
              styles.name,
              {
                alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
                color: getColor(),
              },
            ]}
          >
            {value.author.first_name}
          </Text>
        ) : null}
        <Text>{value.message}</Text>
        <Text style={styles.time}>{formatTime(value.timestamp)}</Text>
      </View>
    </View>
  );
};

Message.propTypes = {
  value: PropTypes.object,
  isCurrentUser: PropTypes.bool,
  isFirstMessage: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 2,
  },
  name: {
    fontWeight: 'bold',
  },
  textBox: {
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
