import React, {createContext, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthenticationContext = createContext({});

export const AuthenticationProvider = ({children}) => {
  const [user, setUser] = useState(null);

  async function storeUserSession(email, pass) {
    try {
      await EncryptedStorage.setItem(
        'user_session',
        JSON.stringify({
          email,
          pass,
        }),
      );
    } catch (error) {
      console.error('SignIn, storeUserSession' + error);
    }
  }
  async function retrieveUserSession() {
    try {
      const session = await EncryptedStorage.getItem('user_session');
      return session !== null ? JSON.parse(session) : null;
    } catch (e) {
      console.error('Authentication, retrieveUserSession: ' + e);
    }
  }
  async function signIn(email, pass) {
    try {
      await auth().signInWithEmailAndPassword(email, pass);
      if (!auth().currentUser.emailVerified) {
        return 'Você deve validar seu email para continuar.';
      }
      await storeUserSession(email, pass);
      if (await getUser(pass)) {
        return 'ok';
      } else {
        return 'Problemas ao buscar o seu perfil. Contate o administrador.';
      }
    } catch (e) {
      return launchServerMessageErro(e);
    }
  }

  async function signUp(localUser, pass) {
    try {
      await auth().createUserWithEmailAndPassword(localUser.email, pass);
      await auth().currentUser.sendEmailVerification();
      await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .set(localUser);
      return 'ok';
    } catch (e) {
      return launchServerMessageErro(e);
    }
  }

  async function forgotPassWord(email) {
    try {
      await auth().sendPasswordResetEmail(email);
      return 'ok';
    } catch (e) {
      return launchServerMessageErro(e);
    }
  }

  async function signOut() {
    try {
      setUser(null);
      await EncryptedStorage.removeItem('user_session');
      if (auth().currentUser) {
        await auth().signOut();
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  async function getUser(pass) {
    try {
      let doc = await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .get();
      if (doc.exists) {
        //console.log('Document data:', doc.data());
        doc.data().uid = auth().currentUser.uid;
        doc.data().pass = pass;
        setUser(doc.data());
        return doc.data();
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  //função utilitária
  function launchServerMessageErro(e) {
    switch (e.code) {
      case 'auth/user-not-found':
        return 'Usuário não cadastrado.';
      case 'auth/wrong-password':
        return 'Erro na senha.';
      case 'auth/invalid-email':
        return 'Email inválido.';
      case 'auth/user-disabled':
        return 'Usuário desabilitado.';
      case 'auth/email-already-in-use':
        return 'Email em uso. Tente outro email.';
      default:
        return 'Erro desconhecido. Contate o administrador';
    }
  }

  return (
    <AuthenticationContext.Provider
      value={{
        storeUserSession,
        signOut,
        signIn,
        signUp,
        forgotPassWord,
        retrieveUserSession,
        getUser,
        user,
      }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
