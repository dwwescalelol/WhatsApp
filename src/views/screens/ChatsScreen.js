import React from 'react';

import { FlatList } from 'react-native';
import { useChats } from '../../hooks/useChats';
import ChatListItem from '../components/ChatListItem';
import { View } from 'react-native-web';

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
    </View>
  );
};

export default ChatsScreen;
