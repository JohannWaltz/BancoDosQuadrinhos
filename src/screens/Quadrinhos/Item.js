import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Text, Image, useTheme} from '@rneui/themed';
import OutlineButton from '../../componentes/OutlineButton';

export default ({item, onPress}) => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    card: {
      alignContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      borderColor: theme.colors.primaryDark,
      backgroundColor: theme.colors.background,
    },
    title: {
      color: theme.colors.primaryDark,
    },
    divider: {
      width: 260,
    },
    div_quadrinho: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    capa: {
      width: 50,
      height: 50,
      marginRight: 20,
      borderRadius: 50 / 2,
    },
    nome: {
      textAlign: 'center',
      color: theme.colors.primaryDark,
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

  return (
    <Card containerStyle={styles.card}>
      <Card.Title style={styles.title}>{item.nome}</Card.Title>
      <Card.Divider color={theme.colors.primary} style={styles.divider} />
      <View style={styles.div_quadrinho}>
        <Image containerStyle={styles.capa} source={{uri: item.urlFoto}} />
        <Text style={styles.preco}>{item.preco}</Text>
      </View>
      <OutlineButton texto={'Detalhar'} onClick={onPress} />
    </Card>
  );
};
