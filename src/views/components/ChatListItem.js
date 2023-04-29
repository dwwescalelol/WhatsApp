import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Avatar from './Avatar';

dayjs.extend(relativeTime);

const ChatListItem = ({ chat, onPress = null }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress(chat);
    } else {
      navigation.navigate('Chat', { id: chat.chat_id, name: chat.name });
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? 'lightgray' : 'white',
        },
      ]}
    >
      <View style={styles.container}>
        <Avatar userId={chat.creator.user_id} style={styles.image} />

        <View style={styles.body}>
          <View style={styles.content}>
            <View style={styles.title}>
              <Text style={styles.name} numberOfLines={1}>
                {chat.name}
              </Text>
              <View>
                <Text style={styles.timestamp} numberOfLines={1}>
                  {chat.last_message.timestamp || 'Just Created'}
                </Text>
              </View>
            </View>
            <Text style={styles.lastMessage} numberOfLines={2}>
              {chat.last_message.message || 'New chat, say hello!'}
            </Text>
          </View>
          <View style={styles.separator} />
        </View>
      </View>
    </Pressable>
  );
};

ChatListItem.propTypes = {
  chat: PropTypes.object,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 5,
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  body: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
  },
  content: {
    justifyContent: 'flex-start',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    flexShrink: 1,
    paddingRight: 5,
  },
  timestamp: {
    marginRight: 10,
    color: 'gray',
    fontSize: 12,
    textAlign: 'right',
  },
  lastMessage: {
    color: 'gray',
    marginTop: 3,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'lightgray',
  },
});

export default ChatListItem;
