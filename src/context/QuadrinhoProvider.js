import React, {createContext, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImageResizer from '@bam.tech/react-native-image-resizer';

export const QuadrinhoContext = createContext({});

export const QuadrinhoProvider = ({children}) => {
  const [quadrinhos, setQuadrinhos] = useState([]);

  useEffect(() => {
    const listener = firestore()
      .collection('quadrinhos')
      .orderBy('nome')
      .onSnapshot(snapShot => {
        //console.log(snapShot);
        //console.log(snapShot._docs);
        if (snapShot) {
          let data = [];
          snapShot.forEach(doc => {
            data.push({
              uid: doc.id,
              nome: doc.data().nome,
              autor: doc.data().autor,
              sinopse: doc.data().sinopse,
              preco: doc.data().preco,
              urlFoto: doc.data().urlFoto,
            });
          });
          setQuadrinhos(data);
        }
      });

    return () => {
      listener();
    };
  }, []);

  const save = async (quadrinho, urlDevice) => {
    try {
      if (urlDevice !== '') {
        quadrinho.urlFoto = await sendImageToStorage(urlDevice, quadrinho);
        if (!quadrinho.urlFoto) {
          return false; //não deixa salvar ou atualizar se não realizar todos os passpos para enviar a imagem para o storage
        }
      }
      await firestore().collection('quadrinhos').doc(quadrinho.uid).set(
        {
          nome: quadrinho.nome,
          autor: quadrinho.autor,
          sinopse: quadrinho.sinopse,
          preco: quadrinho.preco,
          capa: quadrinho.urlFoto,
        },
        {merge: true},
      );
      return true;
    } catch (e) {
      console.error('quadrinhoProvider, salvar: ' + e);
      return false;
    }
  };

  //urlDevice: qual imagem deve ser enviada via upload
  async function sendImageToStorage(urlDevice, quadrinho) {
    //1. Redimensiona e compacta a imagem
    let imageRedimencionada = await ImageResizer.createResizedImage(
      urlDevice,
      150,
      200,
      'PNG',
      80,
    );
    //2. e prepara o path onde ela deve ser salva no storage
    const pathToStorage = `images/${quadrinho.autor}/${quadrinho.uid}/foto.png`;

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
    task.then(async () => {
      //se a task finalizar com sucesso, busca a url
      url = await storage().ref(pathToStorage).getDownloadURL();
    });
    //5. Pode dar zebra, então pega a exceção
    task.catch(e => {
      console.error('quadrinhoProvider, sendImageToStorage: ' + e);
      url = null;
    });
    return url;
  }

  const del = async (uid, path) => {
    try {
      await firestore().collection('quadrinhos').doc(uid).delete();
      await storage().ref(path).delete();
      return true;
    } catch (e) {
      console.error('quadrinhoProvider, del: ', e);
      return false;
    }
  };

  return (
    <QuadrinhoContext.Provider value={{quadrinhos, save, del}}>
      {children}
    </QuadrinhoContext.Provider>
  );
};
