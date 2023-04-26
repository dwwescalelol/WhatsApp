import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useEditProfile } from '../../hooks/useEditProfile';
import ErrorMessage from '../components/ErrorMessage';
import SucsessMessage from '../components/SucsessMessage';
import Avatar from './Avatar';
import InputField from './InputField';
import Button from '../components/Button';
import Validate from '../../utilities/ValidateFields';

const EditableProfile = () => {
  const {
    userId,
    firstName,
    lastName,
    email,
    avatar,
    submitted,
    error,
    success,
    setFirstName,
    setLastName,
    setEmail,
    pickImage,
    handleConfirmChanges,
  } = useEditProfile();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        {avatar ? <Avatar uri={avatar} /> : <Avatar userId={userId} />}
      </TouchableOpacity>

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
      <SucsessMessage message={success} />
      <ErrorMessage message={error} />

      <Button
        label="Confirm Changes"
        onPress={handleConfirmChanges}
        disabled={submitted}
        invert
      />
    </View>
  );
};

EditableProfile.propTypes = {
  onUpdate: PropTypes.func,
  onAvatarUpdate: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 16,
    width: '70%',
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
});

export default EditableProfile;
