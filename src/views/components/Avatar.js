import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { useAvatar } from '../../hooks/useAvatar';

const Avatar = ({ userId, uri = null, style }) => {
  const { avatarUri } = useAvatar(userId, uri);

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
