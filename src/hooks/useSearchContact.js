import { useState, useEffect } from 'react';
import ApiHandler from '../api/ApiHandler';
import { useStore } from '../stores/AppStore';

export const useSearchContact = ({ searchIn = 'all' }) => {
  const store = useStore();

  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');

  const searchUsers = async (query) => {
    try {
      console.log(searchIn);
      const results = await ApiHandler.searchUsers(
        store.token,
        query,
        searchIn
      );
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

  return {
    searchText,
    searchResults,
    error,
    setSearchText,
  };
};
