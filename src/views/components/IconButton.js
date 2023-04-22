import React from 'react';

import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

// professional :)
const IconButton = ({ iconName }) => (
  <TouchableOpacity style={styles.button}>
    <Text>
      <Ionicons name={iconName} size={24} color={'grey'} />
    </Text>
  </TouchableOpacity>
);

IconButton.propTypes = {
  iconName: PropTypes.string,
  color: PropTypes.string,
};

const styles = StyleSheet.create({
  button: {
    marginRight: 20,
  },
});

export default IconButton;
