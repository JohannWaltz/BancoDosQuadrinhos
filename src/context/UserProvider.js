import React, {createContext, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {AuthUserContext} from './AuthUserProvider';
import storage from '@react-native-firebase/storage';
import ImageResizer from '@bam.tech/react-native-image-resizer';

export const UserContext = createContext({});

export const UserProvider = ({children}) => {
  const {getUser, signOut} = useContext(AuthUserContext);

  const save = async (user, urlDevice) => {
    try {
      if (urlDevice !== '') {
        user.urlFoto = await sendImageToStorage(urlDevice, user);
        if (!user.urlFoto) {
          return false; //não deixa salvar ou atualizar se não realizar todos os passpos para enviar a imagem para o storage
        }
      }
      await firestore()
        .collection('users')
        .doc(user.uid)
        .set({nome: user.nome, urlFoto: user.urlFoto}, {merge: true});
      //renew user in session
      if (await getUser(user.pass)) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  };

  //urlDevice: qual imagem deve ser enviada via upload
  async function sendImageToStorage(urlDevice, user) {
    //1. Redimensiona e compacta a imagem
    let imageRedimencionada = await ImageResizer.createResizedImage(
      urlDevice,
      150,
      200,
      'PNG',
      80,
    );
    //2. e prepara o path onde ela deve ser salva no storage
    const pathToStorage = `images/users/${user.uid}/foto.png`;

    //3. Envia para o storage
    let url = ''; //local onde a imagem será salva no Storage
    const task = storage().ref(pathToStorage).putFile(imageRedimencionada?.uri);
    task.on('state_changed', taskSnapshot => {
      //Para acompanhar o upload, se necessário
      // console.log(
      //   'Transf:\n' +
      //     `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      // );
    });

    //4. Busca a URL gerada pelo Storage
    await task.then(async () => {
      //se a task finalizar com sucesso, busca a url
      url = await storage().ref(pathToStorage).getDownloadURL();
    });
    //5. Pode dar zebra, então pega a exceção
    task.catch(e => {
      console.error('EstudanteProvider, sendImageToStorage: ' + e);
      url = null;
    });
    return url;
  }

  const del = async uid => {
    try {
      await firestore().collection('users').doc(uid).delete();
      await auth().currentUser.delete();
      await signOut();
      return true;
    } catch (e) {
      return false;
    }
  };

  async function updatePassword(pass) {
    try {
      await auth().currentUser.updatePassword(pass);
      return true;
    } catch (e) {
      console.error('updatePassword' + e);
      return false;
    }
  }

  return (
    <UserContext.Provider value={{save, del, updatePassword}}>
      {children}
    </UserContext.Provider>
  );
};
