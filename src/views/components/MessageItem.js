import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import IconButton from './IconButton';

const MessageItem = ({ message, visible, setVisible, onEdit, onDelete }) => {
  useEffect(() => {
    setVisible(visible);
  }, [visible]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setVisible(!visible)}>
        <Modal isVisible={visible} onBackdropPress={() => setVisible(false)}>
          <View style={styles.modalContent}>
            <IconButton
              iconName="color-wand-outline"
              onPress={() => {
                setVisible(false);
                onEdit(message);
              }}
            />
            <IconButton
              iconName="backspace"
              onPress={() => {
                setVisible(false);
                onDelete(message);
              }}
            />
          </View>
        </Modal>
      </TouchableOpacity>
    </View>
  );
};

MessageItem.propTypes = {
  message: PropTypes.object,
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    alignSelf: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%',
  },
});

export default MessageItem;
