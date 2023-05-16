import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';

const EditMessage = ({ condition = false, message }) => {
  return condition ? <Text style={styles.responseText}>{message}</Text> : null;
};

EditMessage.propTypes = {
  condition: PropTypes.bool,
  message: PropTypes.string,
};

const styles = StyleSheet.create({
  responseText: {
    color: '#25D366',
  },
});

export default EditMessage;
