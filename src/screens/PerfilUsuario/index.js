import React, {useContext, useEffect, useState} from 'react';
import {Alert, ToastAndroid} from 'react-native';
import styled from 'styled-components/native';
import MyButtom from '../../components/MyButtom';
import DeleteButton from '../../components/OutlineButton';
import Loading from '../../components/Loading';
import {AuthUserContext} from '../../context/AuthUserProvider';
import {UserContext} from '../../context/UserProvider';
import {CommonActions} from '@react-navigation/native';
import {useTheme, Image, ButtonGroup, Input, Icon} from '@rneui/themed';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {COLORS} from '../../assets/colors';

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 5px;
  padding-top: 20px;
  background-color: ${COLORS.secundary};
`;

const Scroll = styled.ScrollView`
  background-color: ${COLORS.secundary};
`;

export default ({navigation}) => {
  const {user} = useContext(AuthUserContext);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [newPassConfirm, setNePassConfirm] = useState('');
  const [showPass, setShowPass] = useState(true);
  const [loading, setLoading] = useState(false);
  const [urlDevice, setUrlDevice] = useState('');
  const {save, del, updatePassword} = useContext(UserContext);
  const {theme} = useTheme();

  useEffect(() => {
    if (user) {
      setNome(user.nome);
      setEmail(user.email);
    }
  }, [user]);

  function salvar() {
    if (oldPass === '' && newPass === '' && newPassConfirm === '') {
      Alert.alert(
        'Fique Esperto!',
        'Você tem certeza que deseja alterar estes dados?',
        [
          {
            text: 'Não',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Sim',
            onPress: async () => {
              setLoading(true);
              /*
                Para evitar que dados sensíveis sejam enviados para
                o Firestore, um novo objeto é criado.
              */
              let localUser = {};
              localUser.uid = user.uid;
              localUser.nome = nome;
              if (await save(localUser, urlDevice)) {
                ToastAndroid.show(
                  'Show! Você salvou os dados com sucesso.',
                  ToastAndroid.LONG,
                );
              } else {
                ToastAndroid.show('Ops! Erro ao salvar.', ToastAndroid.LONG);
              }
              setLoading(false);
              navigation.goBack();
            },
          },
        ],
      );
    }
  }

  function excluir() {
    Alert.alert(
      'Fique Esperto!',
      'Você tem certeza que deseja excluir permanentemente sua conta?\nSe você confirmar essa operação seus dados serão excluídos e você não terá mais acesso ao app.',
      [
        {
          text: 'Não',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            Alert.alert(
              'Que pena :-(',
              `Você tem certeza que deseja excluir seu perfil de usuário ${user.email}?`,
              [
                {
                  text: 'Não',
                  onPress: () => {},
                  style: 'cancel',
                },
                {
                  text: 'Sim',
                  onPress: async () => {
                    setLoading(true);
                    if (await del(user.uid)) {
                      navigation.dispatch(
                        CommonActions.reset({
                          index: 0,
                          routes: [{name: 'AuthStack'}],
                        }),
                      );
                    } else {
                      ToastAndroid.show(
                        'Ops! Erro ao exlcluir sua conta. Contate o administrador.',
                        ToastAndroid.LONG,
                      );
                    }
                    setLoading(false);
                  },
                },
              ],
            );
          },
        },
      ],
    );
  }

  function alterarSenha() {
    if (oldPass !== '' && newPass !== '' && newPassConfirm !== '') {
      if (oldPass !== user.pass) {
        Alert.alert('Veja!', 'A senha antiga é diferente da senha digitada.');
      } else if (newPass === newPassConfirm) {
        //TODO: fazer validar senha forte (uma caixa alta, um número, um caractere especial, tam. mín. 6)
        Alert.alert('Ok!', 'Por favor, confirme a alteração de sua senha.', [
          {
            text: 'Não',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Sim',
            onPress: async () => {
              if (await updatePassword(newPass)) {
                ToastAndroid.show(
                  'Show! Você alterou sua senha com sucesso.',
                  ToastAndroid.LONG,
                );
                navigation.goBack();
              } else {
                ToastAndroid.show(
                  'Ops! Erro ao alterar sua senha. Contate o administrador.',
                  ToastAndroid.LONG,
                );
              }
            },
            style: 'cancel',
          },
        ]);
      } else {
        Alert.alert('Ops!', 'A nova senha é diferente da confirmação');
      }
    } else {
      Alert.alert('Veja!', 'Preencha os campos relativos a senha');
    }
  }

  const buscaNaGaleria = () => {
    const options = {
      storageOptions: {
        title: 'Selecionar  uma imagem',
        skipBackup: true,
        path: 'images',
        mediaType: 'photo',
        width: 150,
        height: 200,
      },
    };

    launchImageLibrary(options, response => {
      if (response.errorCode) {
        ToastAndroid.show('Ops! Erro ao buscar a imagem.', ToastAndroid.LONG);
      } else if (response.didCancel) {
        ToastAndroid.show('Ok, você cancelou.', ToastAndroid.LONG);
      } else {
        const path = response.assets[0].uri;
        setUrlDevice(path); //armazena a uri para a imagem no device
      }
    });
  };

  function tiraFoto() {
    const options = {
      storageOptions: {
        title: 'Tirar uma foto',
        skipBackup: true,
        path: 'images',
        mediaType: 'photo',
        width: 150,
        height: 200,
      },
    };

    launchCamera(options, response => {
      if (response.errorCode) {
        ToastAndroid.show('Ops! Erro ao tirar a foto.', ToastAndroid.LONG);
      } else if (response.didCancel) {
        ToastAndroid.show('Ok, você cancelou.', ToastAndroid.LONG);
      } else {
        const path = response?.assets[0]?.uri;
        //console.log(path);
        setUrlDevice(path); //armazena a uri para a imagem no device
      }
    });
  }

  function buscarImagemNoDevice(v) {
    switch (v) {
      case 0:
        buscaNaGaleria();
        break;
      case 1:
        tiraFoto();
        break;
    }
  }

  return (
    <Scroll>
      <Container>
        <Image
          source={
            urlDevice !== ''
              ? {uri: urlDevice}
              : user.urlFoto !== ''
              ? {uri: user.urlFoto}
              : {
                  uri: 'https://firebasestorage.googleapis.com/v0/b/banco-dos-quadrinhos.appspot.com/o/images%2Fperson.png?alt=media&token=2be8523f-4c17-4a09-afbb-301a95a5ddfb&_gl=1*18jiiyk*_ga*MjA2NDY5NjU3NS4xNjg4MTI5NjYw*_ga_CW55HF8NVT*MTY5NjAyMzQxOS4zMS4xLjE2OTYwMjU4NzQuMzMuMC4w',
                }
          }
          PlaceholderContent={<Loading />}
        />
        <ButtonGroup
          buttons={['Buscar na Galeria', 'Tira Foto']}
          onPress={v => buscarImagemNoDevice(v)}
          containerStyle={{
            borderColor:
              theme.mode === 'light'
                ? theme.colors.black
                : theme.colors.primary,
            backgroundColor: theme.colors.white,
          }}
          textStyle={{
            color:
              theme.mode === 'light'
                ? theme.colors.black
                : theme.colors.primary,
          }}
        />
        <Input
          value={nome}
          placeholder="nome"
          keyboardType="default"
          returnKeyType="next"
          leftIcon={
            <Icon
              type="ionicon"
              name="person-outline"
              size={22}
              color={theme.colors.grey2}
            />
          }
          onChangeText={t => setNome(t)}
        />
        <Input
          value={email}
          editable={false}
          placeholder="email"
          keyboardType="default"
          returnKeyType="next"
          leftIcon={
            <Icon
              type="material-community"
              name="email-check-outline"
              size={22}
              color={theme.colors.grey2}
            />
          }
        />
        <Input
          value={oldPass}
          secureTextEntry={showPass}
          placeholder="Senha antiga"
          keyboardType="default"
          returnKeyType="next"
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
          onChangeText={t => setOldPass(t)}
        />
        <Input
          value={newPass}
          secureTextEntry={showPass}
          placeholder="Nova senha (mín. 6 caracteres)"
          keyboardType="default"
          returnKeyType="next"
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
          onChangeText={t => setNewPass(t)}
        />
        <Input
          value={newPassConfirm}
          secureTextEntry={showPass}
          placeholder="Confirme a nova senha"
          keyboardType="default"
          returnKeyType="next"
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
          onChangeText={t => setNePassConfirm(t)}
        />
        <MyButtom text="Salvar" onClick={salvar} />
        <DeleteButton texto="Excluir Conta" onClick={excluir} />
        <DeleteButton texto="Alterar Senha" onClick={alterarSenha} />
        <Loading visivel={loading} />
      </Container>
    </Scroll>
  );
};
