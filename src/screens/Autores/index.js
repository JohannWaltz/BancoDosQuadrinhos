import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 5px;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.secundary};
`;

const Scroll = styled.ScrollView`
  background-color: ${COLORS.secundary};
`;

const Text = styled.Text`
  font-size: 32px;
`;

const Autores = () => {
  return (
    <Container>
      <Text>Autores</Text>
    </Container>
  );
};

export default Autores;
