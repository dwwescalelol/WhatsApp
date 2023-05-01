import React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  ImageBackground,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import bg from '../../../assets/images/BG.png';
import Message from '../components/Message';
import InputBox from '../components/InputBox';

const ChatScreen = ({ route }) => {
  const chat = route.params;
  return (
    <KeyboardAvoidingView keyboardVerticalOffset={60} style={styles.bg}>
      <ImageBackground source={bg} style={styles.bg}>
        <FlatList
          data={chat.messages}
          renderItem={({ message }) => <Message message={message.message} />}
          style={styles.list}
          inverted
        />
        <InputBox />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

ChatScreen.propTypes = {
  route: PropTypes.object,
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  list: {
    padding: 10,
  },
});

export default ChatScreen;
