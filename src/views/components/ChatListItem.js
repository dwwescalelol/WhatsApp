import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import PropTypes from 'prop-types';
import Avatar from './Avatar';
import ApiHandler from '../../api/ApiHandler';
import { useStore } from '../../stores/AppStore';
import formatTime from '../../utilities/FormatTime';
import { t } from '../../locales';

const ChatListItem = ({ chat, onPress = null }) => {
  const store = useStore();
  const navigation = useNavigation();

  const getChat = async () => {
    try {
      const chatResponce = await ApiHandler.getChatDetails(
        store.token,
        chat.chat_id
      );
      return { ...(await chatResponce), chatId: chat.chat_id };
    } catch (error) {
      setError(error.message);
    }
  };
  const handlePress = async () => {
    if (onPress) {
      onPress(chat);
    } else {
      const responce = await getChat();
      navigation.navigate('Chat', { chat: responce });
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
                  {chat.last_message.timestamp
                    ? formatTime(chat.last_message.timestamp)
                    : ''}
                </Text>
              </View>
            </View>
            <Text style={styles.lastMessage} numberOfLines={2}>
              {chat.last_message.message || t('greeting')}
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
