/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StatusBar} from 'react-native';
import SignIn from '../screens/SignIn';
import Quadrinhos from '../screens/Quadrinhos';
import Preload from '../screens/Preload';
import SignUp from '../screens/SignUp';
import Quadrinho from '../screens/Quadrinho';
import Resenhas from '../screens/Resenhas';
import Resenha from '../screens/Resenha';
import ForgotPassWord from '../screens/ForgotPassword';
import ResenhasMap from '../screens/ResenhasMap';
import Menu from '../screens/Menu';
import PerfilUsuario from '../screens/PerfilUsuario';
import {useTheme, Icon} from '@rneui/themed';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Preload"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen component={Preload} name="Preload" />
    <Stack.Screen component={SignIn} name="SignIn" />
    <Stack.Screen component={SignUp} name="SignUp" />
    <Stack.Screen component={ForgotPassWord} name="ForgotPassWord" />
  </Stack.Navigator>
);

const AppStack = () => {
  const {theme} = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Quadrinhos"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        component={Quadrinhos}
        name="Quadrinhos"
        options={{
          tabBarLabel: 'Quadrinhos',
          tabBarIcon: () => (
            <Icon
              type="ionicon"
              name="book"
              color={
                theme.mode === 'light'
                  ? theme.colors.black
                  : theme.colors.primary
              }
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        component={Resenhas}
        name="Local"
        options={{
          tabBarLabel: 'Local',
          tabBarIcon: () => (
            <Icon
              type="ionicon"
              name="people"
              color={
                theme.mode === 'light'
                  ? theme.colors.black
                  : theme.colors.blackprimary
              }
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        component={ResenhasMap}
        name="ResenhasMap"
        options={{
          tabBarLabel: 'Mapa',
          tabBarIcon: () => (
            <Icon
              type="ionicon"
              name="map-sharp"
              color={
                theme.mode === 'light'
                  ? theme.colors.black
                  : theme.colors.black
              }
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        component={Menu}
        name="Menu"
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: () => (
            <Icon
              type="ionicon"
              name="list"
              color={
                theme.mode === 'light'
                  ? theme.colors.black
                  : theme.colors.black
              }
              size={20}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Navigator = () => {
  const {theme} = useTheme();
  return (
    <NavigationContainer
      theme={{
        colors: {
          primary: theme.colors.primary,
          background: theme.colors.background,
          card: theme.colors.background,
        },
        dark: theme.mode === 'light',
      }}>
      <StatusBar backgroundColor={theme.colors.black} />
      <Stack.Navigator
        initialRouteName="AuthStack"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen component={AuthStack} name="AuthStack" />
        <Stack.Screen component={AppStack} name="AppStack" />
        <Stack.Screen
          component={Quadrinho}
          name="Quadrinho"
          options={{
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          component={Resenha}
          name="Resenha"
          options={{
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          component={PerfilUsuario}
          name="PerfilUsuario"
          options={{
            presentation: 'modal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigator;
