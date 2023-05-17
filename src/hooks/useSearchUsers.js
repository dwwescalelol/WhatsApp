import { useState, useEffect } from 'react';
import ApiHandler from '../api/ApiHandler';
import { useStore } from '../stores/AppStore';

export const useSearchUsers = ({ searchIn = 'all' }) => {
  const store = useStore();

  const [offset, setOffset] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [isMoreUsers, setIsMoreUsers] = useState(false);

  const searchUsers = async () => {
    try {
      const results = await ApiHandler.searchUsers(
        store.token,
        searchText,
        searchIn,
        20,
        offset
      );
      setSearchResults(results.filter((user) => user.user_id != store.userId));
    } catch (error) {
      setError('Error searching users:', error);
      setSearchResults([]);
    }
  };

  const checkIfMoreUsers = async () => {
    try {
      const result = await ApiHandler.searchUsers(
        store.token,
        searchText,
        searchIn,
        1,
        offset + 21
      );
      setIsMoreUsers(result.length > 0);
    } catch (error) {
      setError('Error searching users:', error);
      setSearchResults([]);
    }
  };

  const handleDisplayMoreUsers = async () => {
    try {
      checkIfMoreUsers();
      setOffset(offset + 20);
      const results = await ApiHandler.searchUsers(
        store.token,
        searchText,
        searchIn,
        20,
        offset + 20
      );
      setSearchResults(
        searchResults.concat(
          results.filter((user) => user.user_id != store.userId)
        )
      );
    } catch (error) {
      setError('Error searching users:', error);
      setSearchResults([]);
    }
  };

  useEffect(() => {
    setOffset(0);
    if (searchText.trim().length > 0) {
      searchUsers();
      checkIfMoreUsers();
    } else {
      setSearchResults([]);
    }
  }, [searchText]);

  return {
    searchText,
    searchResults,
    error,
    setSearchText,
    handleDisplayMoreUsers,
    isMoreUsers,
  };
};
