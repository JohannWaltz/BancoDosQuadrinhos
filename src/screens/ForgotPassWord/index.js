import React, {useContext, useState} from 'react';
import {Alert} from 'react-native';
import MyButtom from '../../components/MyButtom';
import {AuthUserContext} from '../../context/AuthUserProvider';
import styled from 'styled-components/native';
import {useTheme, Input, Icon} from '@rneui/themed';

export const Body = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  /* margin: 10px; */
  margin-top: 10px;
  background-color: #fff3e8;
`;

export default ({navigation}) => {
  const [email, setEmail] = useState('');
  const {forgotPass} = useContext(AuthUserContext);
  const {theme} = useTheme();

  const recover = async () => {
    let msgError = '';
    if (email !== '') {
      msgError = await forgotPass(email);
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
    <Body>
      <Input
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="go"
        leftIcon={
          <Icon
            name="email-check-outline"
            type="material-community"
            size={22}
            color={theme.colors.grey2}
          />
        }
        onChangeText={t => setEmail(t)}
        autoFocus={true}
      />
      <MyButtom text="Recuperar Senha" onClick={recover} />
    </Body>
  );
};
