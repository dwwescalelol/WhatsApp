import React from 'react';
import Avatar from './Avatar';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import Button from './Button';
import ErrorMessage from './ErrorMessage';
import { useContactActions } from '../../hooks/useContactActions';

const Profile = ({ user }) => {
  const contactHook = useContactActions(user);

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

      <ErrorMessage message={contactHook.error} />

      {contactHook.blocked ? (
        <Button
          disable={contactHook.submitted}
          onPress={contactHook.handleUnblock}
          label="Unblock"
          style={styles.button}
          color="red"
          invert
        />
      ) : contactHook.contact ? (
        <>
          <Button
            disable={contactHook.submitted}
            onPress={contactHook.handleRemoveContact}
            label="Remove Contact"
            style={styles.button}
            invert
            color="red"
          />
          <Button
            disable={contactHook.submitted}
            onPress={contactHook.handleBlock}
            label="Block"
            style={styles.button}
            color="red"
          />
        </>
      ) : (
        <Button
          disable={contactHook.submitted}
          onPress={contactHook.handleAddContact}
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
