/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Platform} from 'react-native';
import {useTheme, SearchBar} from '@rneui/themed';

export default ({text, setSearch}) => {
  const {theme} = useTheme();
  return (
    <SearchBar
      placeholder={text}
      platform={Platform.OS === 'android' ? 'android' : 'ios'}
      searchIcon={{
        type: 'ionicon',
        name: 'search',
        size: 20,
        color: theme.colors.grey4,
      }}
      clearIcon={{
        type: 'ionicon',
        name: 'close',
        size: 20,
        color: theme.colors.grey4,
      }}
      cancelIcon={{
        type: 'ionicon',
        name: 'arrow-back',
        size: 20,
        color: theme.colors.grey4,
      }}
      containerStyle={{height: 50}}
      returnKeyType="next"
      onChangeText={t => setSearch(t)}
    />
  );
};
