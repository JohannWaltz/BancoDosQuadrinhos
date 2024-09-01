import React, {useContext, useState} from 'react';
import {Alert} from 'react-native';
import MyButtom from '../../components/MyButtom';
import Loading from '../../components/Loading';
import {AuthUserContext} from '../../context/AuthUserProvider';
import styled from 'styled-components/native';
import {Input, Icon} from '@rneui/themed';
import {useTheme, Image} from '@rneui/themed';

export const Body = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  /* margin: 10px; */
  margin-top: 10px;
  background-color: #fff3e8;
`;

export default ({navigation}) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirPass, setConfirmPass] = useState('');
  const [showPass, setShowPass] = useState(true);
  const [loading, setLoading] = useState(false);
  const {signUp} = useContext(AuthUserContext);
  const {theme} = useTheme();

  const cadastar = async () => {
    let msgError = '';
    if (nome !== '' && email !== '' && pass !== '' && confirPass !== '') {
      if (pass === confirPass) {
        let user = {};
        user.nome = nome;
        user.email = email;
        setLoading(true);
        msgError = await signUp(user, pass);
        if (msgError === 'ok') {
          setLoading(false);
          Alert.alert(
            'Show!',
            'Foi enviado um email para:\n' +
              user.email +
              '\nFaça a verificação.',
          );
          navigation.goBack();
        } else {
          setLoading(false);
          Alert.alert('Ops!', msgError);
        }
      } else {
        Alert.alert('Ops!', 'As senhas digitadas são diferentes.');
      }
    } else {
      Alert.alert('Ops!', 'Por favor, digite todos os campos.');
    }
  };

  return (
    <Body>
      <Image
            containerStyle={{
              width: 330,
              height: 300,
              borderRadius: 5 / 2,
              marginBottom: 10,
            }}
            style={{width: 305, height: 200}}
            source={require('../../assets/images/logo.png')}
            accessibilityLabel="logo do app"
          />
      <Input
        placeholder="Nome Completo"
        keyboardType="default"
        returnKeyType="next"
        leftIcon={
          <Icon
            name="card-account-details-outline"
            type="material-community"
            size={22}
            color={theme.colors.grey2}
          />
        }
        onChangeText={t => setNome(t)}
      />
      <Input
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="next"
        leftIcon={
          <Icon
            name="email-check-outline"
            type="material-community"
            size={22}
            color={theme.colors.grey2}
          />
        }
        onChangeText={t => setEmail(t)}
      />
      <Input
        secureTextEntry={showPass}
        placeholder="Senha"
        keyboardType="default"
        returnKeyType="next"
        leftIcon={
          showPass ? (
            <Icon
              name="form-textbox-password"
              type="material-community"
              size={22}
              color={theme.colors.grey2}
              onPress={() => setShowPass(false)}
            />
          ) : (
            <Icon
              name="form-textbox-password"
              type="material-community"
              size={22}
              color={theme.colors.error}
              onPress={() => setShowPass(true)}
            />
          )
        }
        onChangeText={t => setPass(t)}
      />
      <Input
        secureTextEntry={showPass}
        placeholder="Confirmar Senha"
        keyboardType="default"
        returnKeyType="send"
        leftIcon={
          showPass ? (
            <Icon
              type="material-community"
              name="form-textbox-password"
              size={22}
              color={theme.colors.grey2}
              onPress={() => setShowPass(false)}
            />
          ) : (
            <Icon
              type="material-community"
              name="form-textbox-password"
              size={22}
              color={theme.colors.error}
              onPress={() => setShowPass(true)}
            />
          )
        }
        onChangeText={t => setConfirmPass(t)}
      />
      <MyButtom text="Cadastrar" onClick={cadastar} />
      <Loading visivel={loading} />
    </Body>
  );
};
