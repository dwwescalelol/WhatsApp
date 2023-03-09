import React from 'react';
import PropTypes from 'prop-types';
import Profile from '../components/Profile';

const ProfileScreen = ({ route }) => {
  return <Profile user={route.params.user} />;
};

ProfileScreen.propTypes = {
  route: PropTypes.object,
};

export default ProfileScreen;
