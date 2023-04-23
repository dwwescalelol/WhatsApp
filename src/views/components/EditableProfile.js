import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ApiHandler from '../../api/ApiHandler';
import { useStore } from '../../stores/AppStore';
import Avatar from './Avatar';
import InputField from './InputField';
import Validate from '../../utilities/ValidateFields';

const EditableProfile = ({ onUpdate, onAvatarUpdate }) => {
  const store = useStore();
  const userId = store.userId;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(null);

  const getUserData = async (userId) => {
    try {
      const response = await ApiHandler.getUserInfo(store.token, userId);

      return {
        firstName: response.first_name,
        lastName: response.last_name,
        email: response.email,
      };
    } catch (error) {
      return {
        firstName: error.message,
        lastName: 'hello',
        email: 'hello',
      };
    }
  };

  // set properties
  useEffect(() => {
    getUserData(userId).then((userData) => {
      setFirstName(userData.firstName || '');
      setLastName(userData.lastName || '');
      setEmail(userData.email || '');
    });
  }, [userId]);

  // passup properties
  useEffect(() => {
    onUpdate(firstName, lastName, email);
  }, [firstName, lastName, email]);

  useEffect(() => {
    if (avatar) onAvatarUpdate(avatar);
  }, [avatar]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled === false) {
      const { assets } = result;
      const uri = assets[0].uri;
      setAvatar(uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        {avatar ? <Avatar uri={avatar} /> : <Avatar userId={store.userId} />}
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
