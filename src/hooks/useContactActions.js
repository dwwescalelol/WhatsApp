import { useState, useEffect } from 'react';
import { useStore } from '../stores/AppStore';
import ApiHandler from '../api/ApiHandler';

export const useContactActions = (user) => {
  const store = useStore();

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [contact, setContact] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const checkIfContact = () => {
    try {
      const contacts = store.contacts;
      return contacts.some((contact) => contact.user_id === user.userId);
    } catch (error) {
      setError(error.message);
    }
  };

  const checkIfBlocked = () => {
    try {
      const blockedUsers = store.blocked;
      return blockedUsers.some(
        (blockedUser) => blockedUser.user_id === user.userId
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const updateContactState = async () => {
    setContact(await checkIfContact());
    setBlocked(await checkIfBlocked());
  };

  const handleAddContact = async () => {
    setSubmitted(true);
    setError('');

    try {
      await ApiHandler.addContact(store.token, user.userId);
      store.addContact({
        user_id: user.userId,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
      });
      updateContactState();
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitted(false);
    }
  };

  const handleRemoveContact = async () => {
    setSubmitted(true);
    setError('');

    try {
      await ApiHandler.removeContact(store.token, user.userId);
      store.removeContact(user.userId);
      updateContactState();
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitted(false);
    }
  };

  const handleBlock = async () => {
    setSubmitted(true);
    setError('');

    try {
      await ApiHandler.blockUser(store.token, user.userId);
      store.addBlocked({
        user_id: user.userId,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
      });
      store.removeContact(user.userId);
      setBlocked(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitted(false);
    }
  };

  const handleUnblock = async () => {
    setSubmitted(true);
    setError('');

    try {
      await ApiHandler.unblockUser(store.token, user.userId);
      store.removeBlocked(user.userId);
      store.addContact({
        user_id: user.userId,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
      });
      setBlocked(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitted(false);
    }
  };

  useEffect(() => {
    updateContactState();
  }, [submitted]);

  return {
    error,
    contact,
    blocked,
    submitted,
    handleAddContact,
    handleRemoveContact,
    handleBlock,
    handleUnblock,
  };
};
