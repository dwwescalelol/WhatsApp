import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';

const InputField = ({
  value,
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
        placeholderTextColor="grey"
        value={value}
        onChangeText={onChangeText}
        onBlur={() => {
          setError(errorMessage);
        }}
        onFocus={onFocus}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

InputField.propTypes = {
  value: PropTypes.string,
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
