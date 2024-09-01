import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Text, Image, useTheme} from '@rneui/themed';
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
    },
    divider: {
      width: 260,
    },
    div_quadrinho: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    foto: {
      width: 50,
      height: 50,
      marginRight: 20,
      borderRadius: 1 / 2,
    },
    nome: {
      textAlign: 'center',
      color:
        theme.mode === 'light' ? theme.colors.black : theme.colors.primaryDark,
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

  return (
    <Card containerStyle={styles.card}>
      <Card.Title style={styles.title}>{item.curso}</Card.Title>
      <Card.Divider color={theme.colors.black} style={styles.divider} />
      <View style={styles.div_quadrinho}>
        <Image containerStyle={styles.foto} source={{uri: item.urlFoto}} />
        <Text style={styles.nome}>{item.nome}</Text>
      </View>
      <OutlineButton texto={'Detalhar'} onClick={onPress} />
    </Card>
  );
};
