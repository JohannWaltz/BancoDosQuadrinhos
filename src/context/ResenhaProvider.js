/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useState, useContext, useEffect} from 'react';

import {ApiContext} from './ApiProvider';

export const ResenhaContext = createContext({});

export const ResenhaProvider = ({children}) => {
  const [resenhas, setResenhas] = useState([]);
  const {api} = useContext(ApiContext);

  useEffect(() => {
    if (api) {
      getReviews();
    }
  }, [api]);

  const getReviews = async () => {
    try {
      const response = await api.get('/resenhas/');

      let data = [];
      response.data.documents?.map(d => {
        let k = d.name.split(
          'projects/pdm-aulas-2023-2-5014f/databases/(default)/documents/resenhas/',
        );

        data.push({
          nome: d.fields.nome.stringValue,
          descricao: d.fields.descricao.stringValue,
          latitude: d.fields.latitude.doubleValue,
          longitude: d.fields.longitude.doubleValue,
          uid: k[1],
        });
      });
      data.sort((a, b) => {
        if (a.nome.toUpperCase() < b.nome.toUpperCase()) {
          return -1;
        }
        if (a.nome.toUpperCase() > b.nome.toUpperCase()) {
          return 1;
        }
        // nomes iguais
        return 0;
      });
      setResenhas(data);
    } catch (response) {
      console.error('Erro em getReviews via API:');
      console.error(response);
    }
  };

  const saveReview = async val => {
    try {
      await api.post('/resenhas/', {
        fields: {
          nome: {stringValue: val.nome},
          descricao: {stringValue: val.descricao},
          latitude: {doubleValue: val.latitude},
          longitude: {doubleValue: val.longitude},
        },
      });
      getReviews();
      return true;
    } catch (response) {
      console.error('Erro em saveReview via API: ' + response);
      return false;
    }
  };

  const updateReview = async val => {
    try {
      await api.patch('/resenhas/' + val.uid, {
        fields: {
          nome: {stringValue: val.nome},
          descricao: {stringValue: val.descricao},
          latitude: {doubleValue: val.latitude},
          longitude: {doubleValue: val.longitude},
        },
      });
      getReviews();
      return true;
    } catch (response) {
      // console.error('Erro em updateReviews via API: ' + response);
      return false;
    }
  };

  const deleteReview = async val => {
    try {
      await api.delete('/resenhas/' + val);
      getReviews();
      return true;
    } catch (response) {
      console.error('Erro em deleteReview via API: ' + response);
      return false;
    }
  };

  return (
    <ResenhaContext.Provider
      value={{
        resenhas,
        saveReview,
        updateReview,
        deleteReview,
      }}>
      {children}
    </ResenhaContext.Provider>
  );
};
