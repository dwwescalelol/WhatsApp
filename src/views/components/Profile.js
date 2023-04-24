import React, { useEffect, useState } from 'react';
import Avatar from './Avatar';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import Button from './Button';
import ApiHandler from '../../api/ApiHandler';
import ErrorMessage from './ErrorMessage';

const Profile = ({ user }) => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [contact, setContact] = useState('');

  const isContact = async () => {
    setError('');

    try {
      const contacts = await ApiHandler.getContacts();
      return (
        contacts.filter((contact) => contact.user_id == user.userId).length == 1
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const idk = async () => {
    setContact(await isContact());
  };

  const handleAddContact = async () => {
    setSubmitted(true);
    setError('');

    try {
      await ApiHandler.addContact(user.userId);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setSubmitted(false);
    }
  };

  const handleRemoveContact = async () => {
    setSubmitted(true);

    setError('');

    try {
      await ApiHandler.removeContact(user.userId);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setSubmitted(false);
    }
  };

  useEffect(() => {
    idk();
  }, [submitted]);

  return (
    <View style={styles.container}>
      <Avatar userId={user.userId} />

      {/* first and last name */}
      <View>
        <Text style={styles.infoTitle}>
          {user.firstName} {user.lastName}
        </Text>
      </View>

      <View style={styles.separator} />

      {/* email */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Email</Text>
        <Text style={styles.infoText}>{user.email}</Text>
      </View>

      <View style={styles.separator} />

      <ErrorMessage message={error} />
      {contact ? (
        <Button
          onPress={handleRemoveContact}
          label="Remove Contact"
          style={styles.button}
          invert
          color="red"
        />
      ) : (
        <Button
          onPress={handleAddContact}
          label="Add Contact"
          style={styles.button}
          invert
        />
      )}
    </View>
  );
};

Profile.propTypes = {
  user: PropTypes.object,
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
  button: {
    marginTop: 10,
  },
});

export default Profile;
