import React from 'react';

import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

// professional :)
const IconButton = ({ iconName, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text>
      <Ionicons name={iconName} size={24} color={'grey'} />
    </Text>
  </TouchableOpacity>
);

IconButton.propTypes = {
  iconName: PropTypes.string,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  button: {
    marginRight: 20,
  },
});

export default IconButton;
