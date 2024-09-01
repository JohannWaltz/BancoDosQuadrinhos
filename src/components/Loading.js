import React from 'react';
import {Dialog, useTheme} from '@rneui/themed';

export default ({visivel = false}) => {
  const {theme} = useTheme();
  return (
    <Dialog isVisible={visivel}>
      <Dialog.Title title="Aguarde..." />
      <Dialog.Loading
        loadingProps={{
          color:
            theme.mode === 'light'
              ? theme.colors.black
              : theme.colors.loading,
        }}
      />
    </Dialog>
  );
};
