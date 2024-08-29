import React, {useContext, useState} from 'react';
import {CommonActions} from '@react-navigation/native';
import styled from 'styled-components/native';
import Item from './Item';
import FloatButtonAdd from '../../componentes/FloatButtonAdd';
import {ResenhaContext} from '../../context/ResenhaProvider';
import SearchBar from '../../componentes/SearchBar';

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 5px;
`;

const FlatList = styled.FlatList`
  width: 100%;
  height: 100%;
`;

export default ({navigation}) => {
  const {resenhas} = useContext(ResenhaContext);
  const [resenhasTemp, setResenhasTemp] = useState([]);

  const filterByName = text => {
    if (text !== '') {
      let a = [];

      a.push(
        ...resenhas.filter(e =>
          e.nome.toLowerCase().includes(text.toLowerCase()),
        ),
      );

      if (a.length > 0) {
        setResenhasTemp(a);
      }
    } else {
      setResenhasTemp([]);
    }
  };

  const routeReview = item => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Resenha',
        params: {resenha: item},
      }),
    );
  };

  const routeAddReview = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Resenha',
        params: {
          resenha: {
            nome: '',
            descricao: '',
            latitude: '',
            longitude: '',
          },
        },
      }),
    );
  };

  return (
    <Container>
      <SearchBar text="Quem você procura?" setSearch={filterByName} />
      <FlatList
        data={resenhasTemp.length > 0 ? resenhasTemp : resenhas}
        renderItem={({item}) => (
          <Item item={item} onPress={() => routeReview(item)} />
        )}
        keyExtractor={item => item.uid}
      />
      <FloatButtonAdd onClick={routeAddReview} />
    </Container>
  );
};
