import React, {useState, useEffect, useContext} from 'react';
import {Alert, ToastAndroid} from 'react-native';
import styled from 'styled-components/native';
import MyButtom from '../../components/MyButtom';
import OutlineButton from '../../components/OutlineButton';
import Loading from '../../components/Loading';
import {ResenhaContext} from '../../context/ResenhaProvider';
import {useTheme, Input, Icon} from '@rneui/themed';

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 5px;
  padding-top: 20px;
`;

const Scroll = styled.ScrollView``;

export default ({route, navigation}) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [uid, setUid] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [loading, setLoading] = useState(false);
  const {saveReview, updateReview, deleteReview} =
    useContext(ResenhaContext);
  const {theme} = useTheme();

  useEffect(() => {
    if (route.params.resenha) {
      setUid(route.params.resenha.uid);
      setNome(route.params.resenha.nome);
      setDescricao(route.params.resenha.descricao);
      setLatitude(route.params.resenha.latitude);
      setLongitude(route.params.resenha.longitude);
    }
  }, [route]);

  const salvar = async () => {
    if (nome && descricao && latitude && longitude) {
      let review = {};
      review.uid = uid;
      review.nome = nome;
      review.descricao = descricao;
      review.latitude = latitude;
      review.longitude = longitude;
      setLoading(true);
      if (uid) {
        if (await updateReview(review)) {
          ToastAndroid.show(
            'Show! Você alterou com sucesso.',
            ToastAndroid.LONG,
          );
        } else {
          ToastAndroid.show('Ops! Erro ao alterar.', ToastAndroid.LONG);
        }
      } else {
        if (await saveReview(review)) {
          ToastAndroid.show(
            'Show! Você inluiu com sucesso.',
            ToastAndroid.LONG,
          );
        } else {
          ToastAndroid.show('Ops! Erro ao alterar.', ToastAndroid.LONG);
        }
      }
      setLoading(false);
      navigation.goBack();
    } else {
      Alert.alert('Atenção', 'Digite todos os campos.');
    }
  };

  const excluir = async () => {
    Alert.alert(
      'Fique Esperto!',
      'Você tem certeza que deseja excluir o curso?',
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
            if (await deleteReview(uid)) {
              ToastAndroid.show(
                'Show! Você excluiu com sucesso.',
                ToastAndroid.LONG,
              );
            } else {
              ToastAndroid.show('Ops! Erro ao excluir.', ToastAndroid.LONG);
            }
            setLoading(false);
            navigation.goBack();
          },
        },
      ],
    );
  };

  return (
    <Scroll>
      <Container>
        <Input
          placeholder="Nome da Review"
          keyboardType="default"
          returnKeyType="go"
          leftIcon={
            <Icon
              type="ionicon"
              name="business-outline"
              size={22}
              color={theme.colors.grey2}
            />
          }
          onChangeText={t => setNome(t)}
          value={nome}
        />
        <Input
          placeholder="Descricao"
          keyboardType="default"
          returnKeyType="go"
          leftIcon={
            <Icon
              type="ionicon"
              name="list-outline"
              size={22}
              color={theme.colors.grey2}
            />
          }
          onChangeText={t => setDescricao(t)}
          value={descricao}
        />
        <Input
          placeholder="Latitude"
          editable={false}
          keyboardType="default"
          returnKeyType="go"
          leftIcon={
            <Icon
              type="material-community"
              name="map-marker-check-outline"
              size={22}
              color={theme.colors.grey2}
            />
          }
          onChangeText={t => setLatitude(t)}
          value={latitude}
        />
        <Input
          placeholder="Longitude"
          editable={false}
          keyboardType="default"
          returnKeyType="go"
          leftIcon={
            <Icon
              type="material-community"
              name="map-marker-check-outline"
              size={22}
              color={theme.colors.grey2}
            />
          }
          onChangeText={t => setLongitude(t)}
          value={longitude}
        />
        <MyButtom text="Salvar" onClick={salvar} />
        {uid ? <OutlineButton text="Excluir" onClick={excluir} /> : null}
        <OutlineButton
          text="Obter Coordenadas no Mapa"
          onClick={() =>
            navigation.navigate('ResenhasMap', {
              resenha: {
                uid,
                nome,
                descricao,
                latitude,
                longitude,
              },
            })
          }
        />
        <Loading visivel={loading} />
      </Container>
    </Scroll>
  );
};
