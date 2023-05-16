import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import ApiHandler from '../api/ApiHandler';
import { useStore } from '../stores/AppStore';
import Validate from '../utilities/ValidateFields';

export const useEditProfile = () => {
  const store = useStore();

  const userId = store.userId;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [submitted, setSubmitted] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // initialise names
  useEffect(() => {
    setFirstName(store.firstName);
    setLastName(store.lastName);
    setEmail(store.email);
  }, [userId]);

  const handleUpdateUserInfo = async () => {
    setSuccess('');
    setError('');
    setSubmitted(true);
    try {
      const origionalUserInfo = {
        firstName: store.firstName,
        lastName: store.lastName,
        email: store.email,
      };

      const changedUserInfo = {
        firstName,
        lastName,
        email,
      };

      // if no change, throw error
      if (
        (Object.keys(origionalUserInfo).every(
          (key) => changedUserInfo[key] === origionalUserInfo[key]
        ) ||
          !changedUserInfo) &&
        !avatar
      ) {
        throw new Error('No change in details, try again.');
      }

      await ApiHandler.updateUserInfo(
        store.token,
        store.userId,
        changedUserInfo
      );
      await store.updateUserInfo(
        changedUserInfo.firstName,
        changedUserInfo.lastName,
        changedUserInfo.email
      );
      setSuccess('Details sucsessfully updated!');
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitted(false);
    }
  };

  const handleUpdateAvatar = async () => {
    if (avatar) {
      try {
        const blob = await (await fetch(avatar)).blob();
        await ApiHandler.uploadAvatar(store.token, store.userId, blob);
        store.setAvatar(avatar);
        setAvatar(null);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleConfirmChanges = async () => {
    await handleUpdateUserInfo();
    await handleUpdateAvatar();
  };

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

  return {
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
  };
};
