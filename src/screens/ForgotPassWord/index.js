import React, {useContext, useState} from 'react';
import {View, StyleSheet, TextInput, Alert} from 'react-native';
import {COLORS} from '../../assets/colors';
import MeuButtom from '../../componentes/MeuButtom';
import {AuthenticationContext} from '../../context/AuthUserProvider';

const ForgotPassWord = ({navigation}) => {
  const [email, setEmail] = useState('');
  const {forgotPassWord} = useContext(AuthenticationContext);

  const recover = async () => {
    let msgError = '';
    if (email !== '') {
      msgError = await forgotPassWord(email);
      if (msgError === 'ok') {
        Alert.alert(
          'Atenção',
          'Enviamos um email de recuperação de senha para o seguinte endereço:\n' +
            email,
          [{text: 'OK', onPress: () => navigation.goBack()}],
        );
      } else {
        Alert.alert('Ops!', msgError);
      }
    } else {
      Alert.alert('Ops!', 'Por favor, digite um email cadastrado.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="go"
        onChangeText={t => setEmail(t)}
        autoFocus={true}
      />
      <MeuButtom texto="Recuperar" aoClicar={recover} />
    </View>
  );
};
export default ForgotPassWord;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    width: '95%',
    height: 50,
    borderBottomColor: COLORS.black,
    borderBottomWidth: 2,
    fontSize: 16,
    paddingLeft: 2,
    paddingBottom: 1,
    marginTop: 40,
    color: COLORS.black,
  },
});
