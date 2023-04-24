import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import ApiHandler from '../../api/ApiHandler';
import { useStore } from '../../stores/AppStore';

const Avatar = ({ userId, uri = null, style }) => {
  const [avatarUri, setAvatarUri] = useState('');
  const store = useStore();

  const getUserProfile = async () => {
    try {
      return await ApiHandler.getAvatar(store.token, userId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId && !uri) getUserProfile().then((uri) => setAvatarUri(uri));
    else setAvatarUri(uri);
  }, [userId, uri]);

  return (
    <Image
      source={{ uri: avatarUri }}
      style={[
        {
          margin: 20,
          width: 120,
          height: 120,
          borderRadius: 60,
        },
        style,
      ]}
    />
  );
};

Avatar.propTypes = {
  userId: PropTypes.number,
  uri: PropTypes.string,
  style: PropTypes.object,
};

export default Avatar;
