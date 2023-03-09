import React from 'react';
import Profile from './components/Profile';

const ProfileScreen = ({ route }) => {
  return <Profile user={route.params.user} />;
};

ProfileScreen.propTypes = {
  route: PropTypes.string.isRequired,
};

export default ProfileScreen;
