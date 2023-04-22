import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';

const ErrorMessage = ({ message }) => {
  return message ? <Text style={styles.responseText}>{message}</Text> : null;
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

const styles = StyleSheet.create({
  responseText: {
    color: 'red',
  },
});

export default ErrorMessage;
