import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import InputField from '../components/InputField';
import Switch from '../components/Switch';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [searchBy, setSearchBy] = useState('firstName');

  const toggleSwitch = (value) => {
    setSearchBy(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Switch
          label="First Name"
          value={searchBy === 'firstName'}
          onValueChange={() => toggleSwitch('firstName')}
        />
        <Switch
          label="Last Name"
          value={searchBy === 'lastName'}
          onValueChange={() => toggleSwitch('lastName')}
        />
        <Switch
          label="Email"
          value={searchBy === 'email'}
          onValueChange={() => toggleSwitch('email')}
        />
      </View>
      <InputField
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search"
      />
      {/* Render the search results here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
  },
  switchItem: {
    alignItems: 'center',
  },
});

export default SearchScreen;
