import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import Avatar from './Avatar';
import ApiHandler from '../../api/ApiHandler';
import { useStore } from '../../stores/AppStore';
import EditableProfile from './EditableProfile';
import NonEditableProfile from './NonEditableProfile';

const Profile = ({ userId, editable, onUpdate }) => {
  const [user, setUser] = useState({});
  const [error, setError] = useState('');

  const store = useStore();

  const getUserData = async (userId) => {
    try {
      const responce = await ApiHandler.getUserInfo(store.token, userId);

      return {
        firstName: responce.first_name,
        lastName: responce.last_name,
        email: responce.email,
      };
    } catch (error) {
      setError(error.message);
      return {
        firstName: error.message,
        lastName: 'hello',
        email: 'hello',
      };
    }
  };

  useEffect(() => {
    getUserData(userId).then((userData) => setUser(userData));
  }, [userId]);

  return (
    <View style={styles.container}>
      <Avatar userId={userId} />

      {editable ? (
        <EditableProfile user={user} onUpdate={onUpdate} />
      ) : (
        <NonEditableProfile user={user} />
      )}
    </View>
  );
};

Profile.propTypes = {
  userId: PropTypes.number,
  editable: PropTypes.bool,
  onUpdate: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginVertical: 16,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 18,
    color: 'lightgray',
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
  infoText: {
    fontSize: 18,
    color: '#000000',
  },
});

export default Profile;
