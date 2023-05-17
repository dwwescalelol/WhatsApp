import React from 'react';

import { FlatList, View, Text, Image } from 'react-native';
import { useChats } from '../../hooks/useChats';
import { t } from '../../locales';

import ChatListItem from '../components/ChatListItem';

const ChatsScreen = () => {
  const { error, chats } = useChats();

  const sortedChats = chats.sort((a, b) => {
    if (
      !Object.keys(a.last_message).length &&
      !Object.keys(b.last_message).length
    )
      return a.name.localeCompare(b.name);
    if (!Object.keys(a.last_message).length) return 1;
    if (!Object.keys(b.last_message).length) return -1;
    return b.last_message.timestamp - a.last_message.timestamp;
  });

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList
        data={sortedChats}
        renderItem={({ item }) => <ChatListItem chat={item} />}
      />
      {sortedChats.length == 0 ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ fontSize: 18, fontWeight: '500', color: 'gray' }}>
            {t('nochats')}
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

export default ChatsScreen;
