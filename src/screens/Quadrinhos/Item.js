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
        fontSize: 24,
        fontWeight: 'bold',
    },
    divider: {
      width: 330,
    },
    div_quadrinho: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    foto: {
      width: 150,
      height: 200,
      marginRight: 10,
      marginLeft: 10,
      borderRadius: 1 / 2,
    },
    nome: {
      textAlign: 'center',
      color:
        theme.mode === 'light' ? theme.colors.black : theme.colors.primaryDark,
      fontSize: 14,
    },
  });

  return (
    <Card containerStyle={styles.card}>
      <Card.Title style={styles.title}>{item.nome}</Card.Title>
      <Card.Divider color={theme.colors.black} style={styles.divider} />
      <View style={styles.div_quadrinho}>
        <Image containerStyle={styles.foto} source={{uri: item.urlFoto}} />
        <Text style={styles.nome}>{item.autor}</Text>
      </View>
      <OutlineButton texto={'Detalhar'} onClick={onPress} />
    </Card>
  );
};
