import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useContactActions } from '../../hooks/useContactActions';
import { t } from '../../locales';
import PropTypes from 'prop-types';

import Button from './Button';
import Avatar from './Avatar';
import ErrorMessage from './ErrorMessage';

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
        <Text>{user.email}</Text>
      </View>

      <View style={styles.separator} />

      <ErrorMessage message={contactHook.error} />

      {contactHook.blocked ? (
        <Button
          disable={contactHook.submitted}
          onPress={contactHook.handleUnblock}
          label={t('unblock')}
          color="red"
          invert
        />
      ) : contactHook.contact ? (
        <>
          <Button
            disable={contactHook.submitted}
            onPress={contactHook.handleRemoveContact}
            label={t('removec')}
            invert
            color="red"
          />
          <Button
            disable={contactHook.submitted}
            onPress={contactHook.handleBlock}
            label={t('block')}
            color="red"
          />
        </>
      ) : (
        <Button
          disable={contactHook.submitted}
          onPress={contactHook.handleAddContact}
          label={t('addc')}
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
});

export default Profile;
