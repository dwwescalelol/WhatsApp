import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const Button = ({ label, onPress, invert, style }) => {
  const buttonStyle = invert ? styles.invertedButton : styles.normalButton;
  const textStyle = invert ? styles.invertedText : styles.normalText;

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, style]}
      onPress={onPress}
    >
      <Text style={[styles.text, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
  invert: PropTypes.bool,
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    width: '80%',
  },
  normalButton: {
    backgroundColor: '#25D366',
  },
  invertedButton: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#25D366',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  normalText: {
    color: '#fff',
  },
  invertedText: {
    color: '#25D366',
  },
});

export default Button;
