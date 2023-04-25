import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const Button = ({
  label,
  onPress,
  invert,
  style,
  color = '#25D366',
  disable,
}) => {
  const dynamicStyle = StyleSheet.create({
    normalButton: {
      backgroundColor: color,
    },
    invertedText: {
      color: color,
    },
    invertedButton: {
      borderWidth: 1,
      backgroundColor: '#fff',
      borderColor: color,
    },
  });

  const buttonStyle = invert
    ? dynamicStyle.invertedButton
    : dynamicStyle.normalButton;
  const textStyle = invert ? dynamicStyle.invertedText : styles.normalText;

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, style]}
      onPress={onPress}
      disabled={disable}
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
  color: PropTypes.string,
  disable: PropTypes.bool,
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    width: '80%',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  normalText: {
    color: '#fff',
  },
});

export default Button;
