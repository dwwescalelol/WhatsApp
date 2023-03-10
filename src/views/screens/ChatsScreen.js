import React from 'react';

import { FlatList } from 'react-native';
import chats from '../../../assets/data/chats.json';
import ChatListItem from '../components/ChatListItem';

const ChatsScreen = () => {
  const sortedChats = chats.sort((b, a) =>
    a.lastMessage.createdAt.localeCompare(b.lastMessage.createdAt)
  );

  return (
    <FlatList
      data={sortedChats}
      renderItem={({ item }) => <ChatListItem chat={item} />}
    />
  );
};

export default ChatsScreen;
