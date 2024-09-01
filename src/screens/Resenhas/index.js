import React, {useContext, useState} from 'react';
import {CommonActions} from '@react-navigation/native';
import styled from 'styled-components/native';
import Item from './Item';
import FloatButtonAdd from '../../components/FloatButtonAdd';
import {ResenhaContext} from '../../context/ResenhaProvider';
import SearchBar from '../../components/SearchBar';
import {COLORS} from '../../assets/colors';


const Container = styled.SafeAreaView`
  flex: 1;
  padding: 5px;
  background-color: ${COLORS.secundary};
`;

const FlatList = styled.FlatList`
  width: 100%;
  height: 100%;
  background-color: ${COLORS.secundary};
`;

export default ({navigation}) => {
  const {resenhas} = useContext(ResenhaContext);
  const [resenhasTemp, setResenhasTemp] = useState([]);

  const filterByName = text => {
    if (text !== '') {
      let a = [];
      // estudantes.forEach(e => {
      //   if (e.nome.toLowerCase().includes(text.toLowerCase())) {
      //     a.push(e);
      //   }
      // });

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
    //console.log(item);
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
            texto: '',
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
