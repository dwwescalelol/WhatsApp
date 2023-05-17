import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, FlatList, View } from 'react-native';
import { useStore } from '../../stores/AppStore';
import { v4 as uuidV4 } from 'uuid';
import { t } from '../../locales';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiHandler from '../../api/ApiHandler';
import ErrorMessage from '../components/ErrorMessage';
import SucsessMessage from '../components/SucsessMessage';
import Drafts from '../components/Drafts';
import IconButton from '../components/IconButton';
import Message from '../components/Message';
import InputField from '../components/InputField';

const ChatScreen = ({ route }) => {
  const { chat } = route.params;
  const store = useStore();

  const [messages, setMessages] = useState(chat.messages);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sucsess, setSucsess] = useState('');
  const [formattedMessages, setFormattedMessages] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [currentDraft, setCurrentDraft] = useState({});
  const [currentEdited, setCurrentEdited] = useState({});

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

  const getAsyncDrafts = async () => {
    const json = (await AsyncStorage.getItem('drafts')) || '[]';
    return JSON.parse(json);
  };

  const setChatDrafts = (allDrafts) => {
    const chatDrafts = allDrafts.filter((draft) => draft.chatId == chat.chatId);
    setDrafts(chatDrafts);
  };

  const getDrafts = async () => {
    const allDrafts = await getAsyncDrafts();
    setChatDrafts(allDrafts);
  };

  useEffect(() => {
    getDrafts();
  }, []);

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

  const handleSend = async () => {
    setError('');
    setSucsess('');

    if (!message.trim()) {
      setError(t('message>1'));
      return;
    }
    if (Object.values(currentDraft || {}).length > 0)
      handleSendDraft(currentDraft);
    else if (Object.values(currentEdited || {}).length > 0)
      sendEdittedMessage(currentEdited);
    else handleSendMessage();

    setCurrentDraft({});
    setCurrentEdited({});
    setMessage('');
  };

  const handleSendDraft = async (sendDraft) => {
    const allDrafts = await getAsyncDrafts();
    const newDrafts = allDrafts.filter(
      (draft) => draft.draftId !== sendDraft.draftId
    );
    await AsyncStorage.setItem('drafts', JSON.stringify(newDrafts));
    setChatDrafts(newDrafts);
    handleSendMessage(sendDraft);
    setCurrentDraft({});
    setSucsess(t('sentdraft'));
  };

  const handleSendMessage = async () => {
    try {
      await ApiHandler.sendMessage(store.token, chat.chatId, message);
      setMessages((await updateChat()).messages);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDraft = async () => {
    if (Object.values(currentEdited || {}).length > 0) return;
    setError('');
    setSucsess('');

    if (!message.trim()) {
      setError(t('emptydraft'));
      return;
    }
    if (Object.values(currentDraft || {}).length > 0) {
      handleEditDraft();
    } else handleSaveDraft();

    setCurrentDraft({});
    setCurrentEdited({});
    setMessage('');
  };

  const handleEditDraft = async () => {
    const allDrafts = await getAsyncDrafts();

    const newDrafts = allDrafts.map((draft) =>
      draft.draftId === currentDraft.draftId ? { ...draft, message } : draft
    );
    await AsyncStorage.setItem('drafts', JSON.stringify(newDrafts));
    setChatDrafts(newDrafts);
    setSucsess(t('draftedit'));
  };

  const handleSaveDraft = async () => {
    setError('');
    setSucsess('');

    const draft = {
      chatId: chat.chatId,
      timestamp: new Date().getTime(),
      message: message,
      draftId: uuidV4(),
    };
    const allDrafts = await getAsyncDrafts();
    allDrafts.push(draft);

    await AsyncStorage.setItem('drafts', JSON.stringify(allDrafts));
    setChatDrafts(allDrafts);
    setSucsess(t('draftsave'));
  };

  const handleDraftPress = (draft) => {
    setError('');
    setSucsess('Editing Draft:');
    store.closeDrafts();
    setMessage(draft.message);
    setCurrentDraft(draft);
  };

  const handleDeleteDraft = async (deleteDraft) => {
    const allDrafts = await getAsyncDrafts();

    const newDrafts = allDrafts.filter(
      (draft) => deleteDraft.draftId !== draft.draftId
    );
    await AsyncStorage.setItem('drafts', JSON.stringify(newDrafts));
    setChatDrafts(newDrafts);
  };

  const handleScheduleDraft = async (scheduledDraft) => {
    const allDrafts = await getAsyncDrafts();

    const newDrafts = allDrafts.map((draft) =>
      draft.draftId === scheduledDraft.draftId ? scheduledDraft : draft
    );
    await AsyncStorage.setItem('drafts', JSON.stringify(newDrafts));
    setChatDrafts(newDrafts);
  };

  const handleDeleteMessage = async (message) => {
    try {
      await ApiHandler.deleteMessage(
        store.token,
        chat.chatId,
        message.message_id
      );
    } catch (error) {
      setError(error);
    }
  };

  const sendEdittedMessage = async () => {
    try {
      await ApiHandler.updateMessage(
        store.token,
        chat.chatId,
        currentEdited.message_id,
        message
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditMessage = async (message) => {
    setCurrentDraft({});
    setCurrentEdited(message);
    setSucsess(t('editmsg'));
    setMessage(message.message);
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const currentTime = Date.now();
      const allDrafts = await getAsyncDrafts();

      const scheduledDrafts = allDrafts.filter(
        (draft) => draft.scheduled && draft.scheduled <= currentTime
      );

      scheduledDrafts.map(async (scheduledDraft) => {
        try {
          await ApiHandler.sendMessage(
            store.token,
            scheduledDraft.chatId,
            scheduledDraft.message
          );
          const newDrafts = allDrafts.filter(
            (draft) => draft.draftId !== scheduledDraft.draftId
          );
          await AsyncStorage.setItem('drafts', JSON.stringify(newDrafts));
          setChatDrafts(newDrafts);
        } catch (error) {
          setError(error.message);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [drafts]);

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
      <Drafts
        visible={store.isDraftsOpen}
        onClose={() => store.closeDrafts()}
        drafts={drafts}
        onElementPress={handleDraftPress}
        onElementDelete={handleDeleteDraft}
        onElemenetSchedule={handleScheduleDraft}
      />
      <FlatList
        data={formattedMessages}
        renderItem={({ item }) => (
          <Message
            value={item[0]}
            isCurrentUser={item[1]}
            isFirstMessage={item[2]}
            onDelete={handleDeleteMessage}
            onEdit={handleEditMessage}
          />
        )}
        style={styles.list}
        inverted
      />
      <View style={styles.separator} />
      <View style={styles.messages}>
        <ErrorMessage message={error} />
        <SucsessMessage message={sucsess} />
      </View>
      <View style={styles.sendMessage}>
        <InputField
          value={message}
          onChangeText={setMessage}
          placeholder={t('typemsg')}
          style={styles.inputField}
        />
        <IconButton iconName="save-outline" onPress={handleDraft} />
        <IconButton iconName="send-outline" onPress={handleSend} />
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
    width: '70%',
  },
  separator: {
    height: 1,
    backgroundColor: '#c7c7c7',
    marginVertical: 10,
  },
  messages: {
    marginHorizontal: 10,
    marginTop: -5,
    marginBottom: 5,
  },
});

export default ChatScreen;
