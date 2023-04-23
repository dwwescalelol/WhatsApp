import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';

const Avatar = ({ userId }) => {
  const [avatarUri, setAvatarUri] = useState('');

  const getUserProfile = async () => {
    // API call logic to get user profile
    // For now, this is a placeholder image
    return 'https://cdn.discordapp.com/attachments/1061351144389103719/1099488148502876160/313.jpg';
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
