import React, {useContext, useState} from 'react';
import styled from 'styled-components/native';
import {QuadrinhoContext} from '../../context/QuadrinhoProvider';
import Item from './Item';
import FloatButtonAdd from '../../components/FloatButtonAdd';
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
  const {quadrinhos} = useContext(QuadrinhoContext);
  const [quadrinhosTemp, setQuadrinhosTemp] = useState([]);

  const filterByName = text => {
    if (text !== '') {
      let a = [];
      // estudantes.forEach(e => {
      //   if (e.nome.toLowerCase().includes(text.toLowerCase())) {
      //     a.push(e);
      //   }
      // });

      a.push(
        ...quadrinhos.filter(e =>
          e.nome.toLowerCase().includes(text.toLowerCase()),
        ),
      );

      if (a.length > 0) {
        setQuadrinhosTemp(a);
      }
    } else {
      setQuadrinhosTemp([]);
    }
  };

  const routeComic = value => {
    navigation.navigate('Quadrinho', {
      value,
    });
  };

  return (
    <Container>
      <SearchBar text="Quem você procura?" setSearch={filterByName} />
      {/* {estudantesTemp.length > 0
        ? estudantesTemp.map((v, k) => (
            <Item item={v} onPress={() => routeStudent(v)} key={k} />
          ))
        : estudantes.map((v, k) => (
            <Item item={v} onPress={() => routeStudent(v)} key={k} />
          ))} */}
      <FlatList
        data={quadrinhosTemp.length > 0 ? quadrinhosTemp : quadrinhos}
        renderItem={({item}) => (
          <Item item={item} onPress={() => routeComic(item)} key={item.uid} />
        )}
        keyExtractor={item => item.uid}
      />
      <FloatButtonAdd onClick={() => routeComic(null)} />
    </Container>
  );
};
