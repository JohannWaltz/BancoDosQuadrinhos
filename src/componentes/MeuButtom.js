import React from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';
import {COLORS} from '../assets/colors';

function MeuButtom({aoClicar, texto, cor = COLORS.accent}) {
  //console.log(props);
  const styles = StyleSheet.create({
    buttom: {
      width: '60%',
      height: 50,
      backgroundColor: cor,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 10,
      borderRadius: 5,
    },
    text: {
      color: COLORS.white,
    },
  });

  return (
    <TouchableHighlight style={styles.buttom} onPress={aoClicar}>
      <Text style={styles.text}>{texto}</Text>
    </TouchableHighlight>
  );
}
export default MeuButtom;
