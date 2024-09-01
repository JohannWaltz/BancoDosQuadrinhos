import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, useTheme} from '@rneui/themed';

export default ({text, onClick}) => {
    const {theme} = useTheme();
  
    const styles = StyleSheet.create({
      container: {
        backgroundColor: theme.colors.transparent,
        marginBottom: 0,
      },
      button: {
        backgroundColor: theme.colors.black,
        borderColor:
          theme.mode === 'light' ? theme.colors.white : theme.colors.black,
        borderWidth: 1,
      },
      title: {
        color: theme.mode === 'light' ? theme.colors.white : theme.colors.black,
      },
    });
  
    return (
      <Button
        title={text}
        type="outline"
        containerStyle={styles.container}
        buttonStyle={styles.button}
        titleStyle={styles.title}
        onPress={onClick}
      />
    );
  };
//   <Button title={text} onPress={onClick} />;
