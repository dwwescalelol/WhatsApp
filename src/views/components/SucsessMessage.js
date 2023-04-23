import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';

const SucsessMessage = ({ message }) => {
  return message ? <Text style={styles.responseText}>{message}</Text> : null;
};

SucsessMessage.propTypes = {
  message: PropTypes.string,
};

const styles = StyleSheet.create({
  responseText: {
    color: '#25D366',
  },
});

export default SucsessMessage;
