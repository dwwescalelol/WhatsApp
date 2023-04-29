import React from 'react';

import { FlatList } from 'react-native';
import { useChats } from '../../hooks/useChats';
import ChatListItem from '../components/ChatListItem';
import { View } from 'react-native-web';

const ChatsScreen = () => {
  const { error, chats } = useChats();
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList
        data={chats}
        renderItem={({ item }) => <ChatListItem chat={item} />}
      />
    </View>
  );
};

export default ChatsScreen;
