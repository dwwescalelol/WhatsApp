import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

const NonEditableProfile = ({ user }) => {
  return (
    <>
      {/* first and last name */}
      <View style={styles.userInfo}>
        <Text style={styles.username}>
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
    </>
  );
};

NonEditableProfile.propTypes = {
  user: PropTypes.object,
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

export default NonEditableProfile;
