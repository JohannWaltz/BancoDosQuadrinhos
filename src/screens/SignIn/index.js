/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {ScrollView, View, StyleSheet, Alert} from 'react-native';
import MyButtom from '../../components/MyButtom';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonActions} from '@react-navigation/native';
import Loading from '../../components/Loading';
import {AuthUserContext} from '../../context/AuthUserProvider';
import {useTheme, Input, Icon, Text, Image} from '@rneui/themed';

export default ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const {signIn} = useContext(AuthUserContext);
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#fff3e8',
    },
    divSuperior: {
      flex: 5,
      alignItems: 'center',
    },
    divInferior: {
      flex: 1,
      alignItems: 'center',
      marginTop: 20,
    },
    textEsqueceuSenha: {
      fontSize: 15,
      color: theme.colors.accentSecundary,
      alignSelf: 'flex-end',
      marginTop: 10,
      marginBottom: 10,
      marginRight: 13,
    },
    divOuHr: {
      width: '100%',
      height: 25,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    divHr: {
      width: '30%',
      height: 1,
      borderBottomColor: theme.colors.grey4,
      borderBottomWidth: 2,
    },
    textOu: {
      marginLeft: 20,
      marginRight: 20,
      fontSize: 18,
      color: theme.colors.grey4,
    },
    divCadastrarSe: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    textNormal: {
      fontSize: 18,
    },
    textCadastrarSe: {
      fontSize: 15,
      color: theme.colors.accentSecundary,
      marginLeft: 5,
    },
    
  });

  const entrar = async () => {
    let msgError = '';
    if (email && password) {
      setLoading(true);
      msgError = await signIn(email, password);
      if (msgError === 'ok') {
        setLoading(false);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'AppStack'}],
          }),
        );
      } else {
        setLoading(false);
        Alert.alert('Ops!', msgError);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.divSuperior}>
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
            returnKeyType="go"
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
            onChangeText={t => setPassword(t)}
          />
          <Text
            style={styles.textEsqueceuSenha}
            onPress={() => navigation.navigate('ForgotPassWord')}>
            Esqueceu sua senha?
          </Text>
          <MyButtom text="ENTRAR" onClick={entrar} />
        </View>
        <View style={styles.divInferior}>
          <View style={styles.divOuHr}>
            <View style={styles.divHr} />
            <Text style={styles.textOu}>OU</Text>
            <View style={styles.divHr} />
          </View>
          <View style={styles.divCadastrarSe}>
            <Text>Não tem uma conta?</Text>
            <Text
              style={styles.textCadastrarSe}
              onPress={() => navigation.navigate('SignUp')}>
              Cadastre-se
            </Text>
          </View>
        </View>
      </ScrollView>
      <Loading visivel={loading} />
    </SafeAreaView>
  );
};
