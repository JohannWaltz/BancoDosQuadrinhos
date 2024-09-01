import React from 'react';
import {AuthUserProvider} from '../context/AuthUserProvider';
import { QuadrinhoProvider } from '../context/QuadrinhoProvider';
import Navigator from './Navigator';
import {ApiProvider} from '../context/ApiProvider';
import {ResenhaProvider} from '../context/ResenhaProvider';
import {UserProvider} from '../context/UserProvider';
import {NotificationsProvider} from '../context/NotificationsProvider';
import {ThemeProvider, createTheme} from '@rneui/themed';
import {COLORS} from '../assets/colors';


const theme = createTheme({
  lightColors: {
    primary: COLORS.primary,
    primaryDark: COLORS.primaryDark, //esta cor extende a paleta do rneui
    secondary: COLORS.accent,
    accentSecundary: COLORS.accentSecundary, //esta cor extende a paleta do rneui
    background: COLORS.white,
    white: COLORS.white,
    error: COLORS.error,
    transparent: COLORS.transparent, //esta cor extende a paleta do rneui
  },
  darkColors: {
    primary: COLORS.white,
    primaryDark: COLORS.black, //esta cor extende a paleta do rneui
    secondary: COLORS.accent,
    accentSecundary: COLORS.accentSecundary, //esta cor extende a paleta do rneui
    background: COLORS.black,
    error: COLORS.error,
    loading: COLORS.primaryDark,
    transparent: COLORS.transparent, //esta cor extende a paleta do rneui
  },
  mode: 'light',
  components: {
    Button: {
      containerStyle: {
        width: '85%',
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        margin: 10,
        backgroundColor: COLORS.accent,
        borderRadius: 5,
      },
      buttonStyle: {
        height: 48,
        backgroundColor: COLORS.accent,
        borderRadius: 3,
      },
      titleStyle: {color: COLORS.white},
    },
    ButtonGroup: {
      containerStyle: {
        height: 35,
        marginTop: 20,
        marginBottom: 20,
        borderColor: COLORS.primary,
        backgroundColor: COLORS.white,
      },
      buttonStyle: {
        height: 32,
      },
      textStyle: {color: COLORS.primary},
      innerBorderStyle: {color: COLORS.primary},
    },
    Image: {
      containerStyle: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 120 / 2,
        backgroundColor: COLORS.transparent,
      },
    },
    Input: {
      inputContainerStyle: {
        borderBottomColor: COLORS.grey,
      },
    },
  },
});

export default function Providers() {
  return (
    <ThemeProvider theme={theme}>
      <AuthUserProvider>
        <NotificationsProvider>
          <ApiProvider>
            <UserProvider>
              <QuadrinhoProvider>
                <ResenhaProvider>
                  <Navigator />
                </ResenhaProvider>
              </QuadrinhoProvider>
            </UserProvider>
          </ApiProvider>
        </NotificationsProvider>
      </AuthUserProvider>
    </ThemeProvider>
  );
}
