import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import ApiHandler from '../../api/ApiHandler';
import { useStore } from '../../stores/AppStore';

const Avatar = ({ userId }) => {
  const [avatarUri, setAvatarUri] = useState('');
  const store = useStore();

  const getUserProfile = async () => {
    return await ApiHandler.getAvatar(store.token, store.userId);
  };

  useEffect(() => {
    getUserProfile().then((uri) => setAvatarUri(uri));
  }, [userId]);

  return (
    <Image
      source={{ uri: avatarUri }}
      style={{
        margin: 20,
        width: 120,
        height: 120,
        borderRadius: 60,
      }}
    />
  );
};

Avatar.propTypes = {
  userId: PropTypes.number,
};

export default Avatar;
