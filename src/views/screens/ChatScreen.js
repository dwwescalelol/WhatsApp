import React, { useState } from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, FlatList, View } from 'react-native';
import IconButton from '../components/IconButton';
import Message from '../components/Message';
import InputField from '../components/InputField';
import ApiHandler from '../../api/ApiHandler';
import { useStore } from '../../stores/AppStore';

const ChatScreen = ({ route }) => {
  const { chat } = route.params;
  const store = useStore();
  const [messages, setMessages] = useState(chat.messages);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formattedMessages, setFormattedMessages] = useState([]);

  // have to reverse the list twice to get name to apear in right place.
  const formatChat = () => {
    const reversedMessages = messages.reverse();
    const messagesWithSenderInfo = [];

    for (let index = 0; index < reversedMessages.length; index++) {
      const message = reversedMessages[index];
      const author = message.author.user_id;
      const isCurrentUser = author === store.userId;
      const isFirstMessage =
        index === 0 || reversedMessages[index - 1].author.user_id !== author;

      messagesWithSenderInfo.push([message, isCurrentUser, isFirstMessage]);
    }
    return messagesWithSenderInfo.reverse();
  };

  const updateChat = async () => {
    try {
      const chatResponce = await ApiHandler.getChatDetails(
        store.token,
        chat.chatId
      );
      return chatResponce;
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSendMessage = async () => {
    setSubmitted(true);
    setError('');

    try {
      if (!message.trim())
        throw new Error('Message must have more than one charecter.');
      await ApiHandler.sendMessage(store.token, chat.chatId, message);
      setMessages((await updateChat()).messages);
      setMessage('');
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitted(false);
    }
  };

  useEffect(() => {
    setFormattedMessages(formatChat());
  }, [messages]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const updatedMessages = (await updateChat()).messages;
      if (JSON.stringify(updatedMessages) !== JSON.stringify(messages))
        setMessages(updatedMessages);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={formattedMessages}
        renderItem={({ item }) => (
          <Message
            value={item[0]}
            isCurrentUser={item[1]}
            isFirstMessage={item[2]}
          />
        )}
        style={styles.list}
        inverted
      />
      <View style={styles.separator} />
      <View style={styles.sendMessage}>
        <InputField
          value={message}
          onChangeText={setMessage}
          placeholder="Type Message..."
          style={styles.inputField}
        />
        <IconButton iconName="send-outline" onPress={handleSendMessage} />
      </View>
    </View>
  );
};

ChatScreen.propTypes = {
  route: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 10,
  },
  sendMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  inputField: {
    marginTop: 0,
  },
  separator: {
    height: 1,
    backgroundColor: '#c7c7c7',
    marginVertical: 10,
  },
});

export default ChatScreen;
