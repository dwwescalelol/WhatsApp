import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Switch = ({ label, value, onValueChange }) => {
  const handlePress = () => {
    onValueChange(!value);
  };

  return (
    <TouchableOpacity
      style={[
        styles.switchContainer,
        value ? styles.switchActive : styles.switchInactive,
      ]}
      onPress={handlePress}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

Switch.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  onValueChange: PropTypes.func,
};

const styles = StyleSheet.create({
  switchContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  switchActive: {
    backgroundColor: '#4caf50',
  },
  switchInactive: {
    backgroundColor: '#c7c7c7',
  },
  label: {
    color: 'white',
    fontSize: 16,
  },
});

export default Switch;
