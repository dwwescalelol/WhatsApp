import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage';
import EditMessage from './EditMessage';

const InputField = ({
  value,
  isPassword,
  onChangeText,
  onFocus,
  placeholder,
  style,
  errorMessage,
  isEdited,
  editMessage,
}) => {
  const [error, setError] = useState('');

  return (
    <View style={[styles.inputContainer, style]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={isPassword}
        placeholderTextColor="grey"
        value={value || ''}
        onChangeText={onChangeText}
        onBlur={() => {
          setError(errorMessage);
        }}
        onFocus={onFocus}
      />
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <EditMessage condition={isEdited} message={editMessage} />
      )}
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
  isEdited: PropTypes.bool,
  editMessage: PropTypes.string,
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '80%',
    marginTop: 10,
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
