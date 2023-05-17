import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Button from '../components/Button';
import PropTypes from 'prop-types';
import ContactList from '../components/ContactList';
import InputField from '../components/InputField';
import { useChatSettings } from '../../hooks/useChatSettings';

const ChatSettingsScreen = ({ route }) => {
  const {
    members,
    numMembers,
    isAdmin,
    selectedUsers,
    displayedChatName,
    chatName,
    setChatName,
    handleEditChat,
    handleRemoveUsers,
    handleItemPress,
    handleLeaveChat,
    handleAddUsers,
  } = useChatSettings(route.params);

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Text style={styles.title} numberOfLines={1}>
          {displayedChatName}
        </Text>
      </View>
      {isAdmin ? (
        <View style={styles.buttons}>
          <InputField
            value={chatName}
            onChangeText={setChatName}
            placeholder={chatName}
          />
          <Button label="Edit Name" onPress={handleEditChat} invert />
        </View>
      ) : null}
      <View style={styles.buttons}>
        <Button label="Add Users" onPress={handleAddUsers} />
      </View>
      {isAdmin ? (
        <View style={styles.buttons}>
          <Button
            label="Remove Users"
            color="red"
            onPress={handleRemoveUsers}
            invert
          />
        </View>
      ) : null}
      <View>
        <View style={styles.buttons}>
          <Text style={styles.title}> {numMembers} Users </Text>
        </View>
        <ContactList
          data={members}
          onItemPress={handleItemPress}
          selectedItems={selectedUsers}
        />
      </View>

      <View style={styles.buttons}>
        <Button label="Leave Chat" onPress={handleLeaveChat} color="red" />
      </View>
    </View>
  );
};

ChatSettingsScreen.propTypes = {
  route: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
});

export default ChatSettingsScreen;
