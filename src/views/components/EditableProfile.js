import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import InputField from './InputField';
import Validate from '../../utilities/ValidateFields';

const EditableProfile = ({ user, onUpdate }) => {
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [email, setEmail] = useState(user.email || '');

  useEffect(() => {
    setFirstName(user.firstName || '');
    setLastName(user.lastName || '');
    setEmail(user.email || '');
  }, [user]);

  useEffect(() => {
    onUpdate(firstName, lastName, email);
  }, [firstName, lastName, email]);

  return (
    <>
      {/* first and last name */}
      <View style={styles.userInfo}>
        <InputField
          value={firstName}
          onChangeText={setFirstName}
          onFocus={() => {}}
          placeholder="First Name"
          errorMessage={Validate.name(firstName)}
        />
        <InputField
          value={lastName}
          onChangeText={setLastName}
          onFocus={() => {}}
          placeholder="Last Name"
          errorMessage={Validate.name(lastName)}
        />
      </View>

      <View style={styles.separator} />

      {/* email */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Email</Text>
        <InputField
          value={email}
          onChangeText={setEmail}
          onFocus={() => {}}
          placeholder="Email"
          errorMessage={Validate.email(email)}
        />
      </View>

      <View style={styles.separator} />
    </>
  );
};

EditableProfile.propTypes = {
  user: PropTypes.object,
  onUpdate: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginVertical: 16,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 18,
    color: 'lightgray',
  },
  separator: {
    height: 1,
    width: '90%',
    backgroundColor: '#c7c7c7',
    marginVertical: 16,
  },
  infoContainer: {
    width: '90%',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 18,
    color: '#000000',
  },
});

export default EditableProfile;
