import React from 'react';
import { View, StyleSheet } from 'react-native';
import InputField from '../components/InputField';
import { useAddContact } from '../../hooks/useAddContact';
import ErrorMessage from '../components/ErrorMessage';
import ContactList from '../components/ContactList';

const SearchContactScreen = () => {
  const { searchText, searchResults, error, setSearchText } = useAddContact();

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
    borderBottomWidth: 1,
    borderColor: '#c7c7c7',
  },
  list: {
    backgroundColor: 'white',
    width: '100%',
    flex: 1,
  },
});

export default SearchContactScreen;
