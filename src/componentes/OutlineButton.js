import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, useTheme} from '@rneui/themed';

export default ({texto, onClick}) => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.transparent,
      marginBottom: 0,
    },
    button: {
      backgroundColor: theme.colors.transparent,
      borderColor: theme.colors.primary,
      borderWidth: 1,
    },
    title: {color: theme.colors.primary},
  });

  return (
    <Button
      title={texto}
      type="outline"
      containerStyle={styles.container}
      buttonStyle={styles.button}
      titleStyle={styles.title}
      onPress={onClick}
    />
  );
};
