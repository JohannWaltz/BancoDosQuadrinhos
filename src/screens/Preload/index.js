import React, {useContext, useEffect} from 'react';
import {Container, Image} from './styles';
import {CommonActions} from '@react-navigation/native';
import {AuthenticationContext} from '../../context/AuthUserProvider';

const Preload = ({navigation}) => {
  const {retrieveUserSession, signIn} = useContext(AuthenticationContext);

  async function entrar() {
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
  }

  useEffect(() => {
    entrar();
  }, []);
  return (
    <Container>
      <Image
        source={require('../../assets/images/logo.svg')}
        accessibilityLabel="logo do app"
      />
    </Container>
  );
};

export default Preload;
