import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSearchUsers } from '../../hooks/useSearchUsers';
import InputField from '../components/InputField';
import ErrorMessage from '../components/ErrorMessage';
import ContactList from '../components/ContactList';
import Button from '../components/Button';

const SearchContactScreen = () => {
  const {
    searchText,
    searchResults,
    error,
    setSearchText,
    handleDisplayMoreUsers,
    isMoreUsers,
  } = useSearchUsers('all');

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <InputField
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search"
        />
        <ErrorMessage message={error} />
      </View>
      <View>
        <ContactList data={searchResults} />
      </View>
      {isMoreUsers ? (
        <Button
          label="Load More Users"
          style={{ alignSelf: 'center' }}
          onPress={handleDisplayMoreUsers}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchContainer: {
    paddingTop: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    borderColor: '#c7c7c7',
    marginBottom: 10,
  },
  list: {
    backgroundColor: 'white',
    width: '100%',
    flex: 1,
  },
});

export default SearchContactScreen;
