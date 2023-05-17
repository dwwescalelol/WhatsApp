import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useEditProfile } from '../../hooks/useEditProfile';
import { useStore } from '../../stores/AppStore';
import PropTypes from 'prop-types';
import { t } from '../../locales';

import Avatar from './Avatar';
import InputField from './InputField';
import SucsessMessage from '../components/SucsessMessage';
import ErrorMessage from '../components/ErrorMessage';
import Button from '../components/Button';
import Validate from '../../utilities/ValidateFields';

const EditableProfile = () => {
  const store = useStore();

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
        {avatar ? (
          <View>
            <Avatar uri={avatar} />
            <Text style={styles.editText}>Avatar has been edited</Text>
          </View>
        ) : (
          <Avatar userId={userId} />
        )}
      </TouchableOpacity>

      {/* first and last name */}
      <View style={styles.userInfo}>
        <InputField
          value={firstName}
          onChangeText={setFirstName}
          onFocus={() => {}}
          placeholder={t('firstn')}
          errorMessage={Validate.name(firstName)}
          isEdited={firstName !== store.firstName}
          editMessage={t('firstnedit')}
        />
        <InputField
          value={lastName}
          onChangeText={setLastName}
          onFocus={() => {}}
          placeholder={t('lastn')}
          errorMessage={Validate.name(lastName)}
          isEdited={lastName !== store.lastName}
          editMessage={t('lastnedit')}
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
          placeholder={t('email')}
          errorMessage={Validate.email(email)}
          isEdited={email !== store.email}
          editMessage={t('emailedit')}
        />
      </View>

      <View style={styles.separator} />
      <SucsessMessage message={success} />
      <ErrorMessage message={error} />

      <Button
        label={t('conchange')}
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
  editText: {
    alignSelf: 'flex-start',
    color: '#25D366',
  },
});

export default EditableProfile;
