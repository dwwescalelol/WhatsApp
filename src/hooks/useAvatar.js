import { useState, useEffect } from 'react';
import ApiHandler from '../api/ApiHandler';
import { useStore } from '../stores/AppStore';

export const useAvatar = (userId, uri) => {
  const store = useStore();

  const [avatarUri, setAvatarUri] = useState('');

  const getUserProfile = async () => {
    try {
      return await ApiHandler.getAvatar(store.token, userId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (uri) setAvatarUri(uri);
    else getUserProfile().then((uri) => setAvatarUri(uri));
  }, [userId, uri]);

  return { avatarUri };
};
