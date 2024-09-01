/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react';
import {CommonActions} from '@react-navigation/native';
import {AuthUserContext} from '../../context/AuthUserProvider';
import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.secundary};
`;

export const Image = styled.Image`
  width: 150px;
  height: 150px;
`;

const Preload = ({navigation}) => {
  const {retrieveUserSession, signIn} = useContext(AuthUserContext);

  const entrar = async () => {
    const userSession = await retrieveUserSession();

    if (
      userSession &&
      (await signIn(userSession.email, userSession.pass)) === 'ok'
    ) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'AppStack'}],
        }),
      );
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'SignIn'}],
        }),
      );
    }
  };

  useEffect(() => {
    entrar();
  }, []);

  return (
    <Container>
      <Image
        containerStyle={{
        width: 300,
        height: 300,
        // borderRadius: 300 / 2,
        marginBottom: 40,
        }}
        style={{width: 305, height: 200}}
        source={require('../../assets/images/logo.png')}
        accessibilityLabel="logo do app"
      />
    </Container>
  );
};

export default Preload;
