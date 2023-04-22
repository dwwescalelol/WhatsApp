import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage';

const InputField = ({
  value,
  isPassword,
  onChangeText,
  onFocus,
  placeholder,
  style,
  errorMessage,
}) => {
  const [error, setError] = useState('');

  return (
    <View style={[styles.inputContainer, style]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={isPassword}
        placeholderTextColor="grey"
        value={value}
        onChangeText={onChangeText}
        onBlur={() => {
          setError(errorMessage);
        }}
        onFocus={onFocus}
      />
      <ErrorMessage message={error} />
    </View>
  );
};

InputField.propTypes = {
  value: PropTypes.string,
  isPassword: PropTypes.bool,
  onChangeText: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  errorMessage: PropTypes.string,
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '80%',
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
  },
});

export default InputField;
