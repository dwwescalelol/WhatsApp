import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Switch = ({ label, value, onValueChange, color = '#4caf50' }) => {
  const handlePress = () => {
    onValueChange(!value);
  };

  return (
    <TouchableOpacity
      style={[
        styles.switchContainer,
        value
          ? { backgroundColor: color, paddingVertical: 11 }
          : {
              backgroundColor: 'white',
              borderColor: color,
              borderBottomWidth: '2px',
            },
        {},
      ]}
      onPress={handlePress}
    >
      <Text
        style={[styles.text, value ? { color: 'white' } : { color: color }]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

Switch.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  onValueChange: PropTypes.func,
  color: PropTypes.string,
};

const styles = StyleSheet.create({
  switchContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '100%',
  },
  switchInactive: {
    backgroundColor: '#c7c7c7',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Switch;
