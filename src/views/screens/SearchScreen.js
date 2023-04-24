import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import InputField from '../components/InputField';
import ApiHandler from '../../api/ApiHandler';
import { useStore } from '../../stores/AppStore';
import ContactListItem from '../components/ContactListItem';
import ErrorMessage from '../components/ErrorMessage';

const SearchScreen = () => {
  const store = useStore();

  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');

  const searchUsers = async (query) => {
    try {
      const results = await ApiHandler.searchUsers(store.token, query);
      setSearchResults(results.filter((user) => user.user_id != store.userId));
    } catch (error) {
      setError('Error searching users:', error);
      setSearchResults([]);
    }
  };

  useEffect(() => {
    if (searchText.length > 0) {
      searchUsers(searchText);
    } else {
      setSearchResults([]);
    }
  }, [searchText]);

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
        <FlatList
          data={searchResults}
          renderItem={({ item }) => (
            <ContactListItem
              user={{
                userId: item.user_id,
                firstName: item.given_name,
                lastName: item.family_name,
                email: item.email,
              }}
            />
          )}
          style={styles.list}
        />
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

export default SearchScreen;
