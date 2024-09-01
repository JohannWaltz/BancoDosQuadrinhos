import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme, Card, Text} from '@rneui/themed';
import OutlineButton from '../../components/OutlineButton';

export default ({item, onPress}) => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    card: {
      alignContent: 'center',
      alignItems: 'center',
      borderRadius: 1,
      borderColor:
        theme.mode === 'light' ? theme.colors.black : theme.colors.primaryDark,
      backgroundColor: '#fff3e8',
    },
    title: {
      color:
        theme.mode === 'light' ? theme.colors.black : theme.colors.primaryDark,
      fontSize: 20,
      fontWeight: 'bold',
    },
    divider: {
      width: 260,
    },
    div_texto: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    texto: {
      textAlign: 'center',
      color: theme.colors.black,
      fontSize: 16,
    },
  });

  return (
    <Card containerStyle={styles.card}>
      <Card.Title style={styles.title}>{item.nome}</Card.Title>
      <Card.Divider color={theme.colors.primary} style={styles.divider} />
      <View style={styles.div_texto}>
        <Text style={styles.texto}>{item.texto}</Text>
      </View>
      <OutlineButton texto={'Detalhar'} onClick={onPress} />
    </Card>
  );
};
