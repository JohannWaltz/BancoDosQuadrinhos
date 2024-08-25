import React, {useState, useEffect, useContext} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import MeuButtom from '../../componentes/MeuButtom';
import {COLORS} from '../../assets/colors';
import {CommonActions} from '@react-navigation/native';
import {AuthenticationContext} from '../../context/AuthUserProvider';

const Home = ({navigation}) => {
  const [cont, setCont] = useState(0);
  const {signOut} = useContext(AuthenticationContext);

  function incrementar() {
    setCont(cont + 1);
  }

  function decrementar() {
    setCont(cont - 1);
  }

  function sair() {
    if (signOut()) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'AuthStack'}],
        }),
      );
    } else {
      Alert.alert(
        'Opa!',
        'Estamos com problemas para realizar essa operação.\nPor favor, contate o administrador.',
      );
    }
  }

  useEffect(() => {
    console.log('Reagiu na construção do compoenente.');

    return () => {
      console.log('Reagiu na descontrução do compoenente.');
    };
  }, []); //array obtém as etapas do ciclo de via

  useEffect(() => {
    console.log('====================================');
    console.log('Reagiu ao atualizar o componente.');
    console.log('====================================');
  }, [cont]);

  return (
    <View style={styles.container}>
      <Text color="blue">Open up App.js to start working on your app!</Text>
      <Text>Open up App.js to start working on your app!</Text>
      <Text style={styles.text}>{cont}</Text>
      <MeuButtom
        aoClicar={incrementar}
        texto="Incrementar"
        cor={COLORS.accent}
      />
      <MeuButtom
        aoClicar={decrementar}
        texto="decrementar"
        cor={COLORS.primary}
      />
      <MeuButtom aoClicar={sair} texto="Sair" cor={COLORS.primary} />
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLORS.accent,
    fontSize: 60,
  },
});
