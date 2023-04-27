// useContacts.js
import { useState, useEffect } from 'react';
import ApiHandler from '../api/ApiHandler';
import { useStore } from '../stores/AppStore';

export const useContacts = () => {
  const store = useStore();

  const [error, setError] = useState('');
  const [showContacts, setShowContacts] = useState(true);

  const getContacts = async () => {
    setError('');
    try {
      const response = await ApiHandler.getContacts(store.token);
      store.setContacts(response);
    } catch (error) {
      setError(error);
    }
  };

  const getBlocked = async () => {
    setError('');
    try {
      const response = await ApiHandler.getBlockedUsers(store.token);
      store.setBlocked(response);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (showContacts) {
      getContacts();
    } else {
      getBlocked();
    }
  }, [showContacts]);

  useEffect(() => {
    getContacts();
  }, []);

  const handleSwitchChange = (value) => {
    setShowContacts(value === 'contacts');
  };

  return { error, showContacts, store, setShowContacts, handleSwitchChange };
};
