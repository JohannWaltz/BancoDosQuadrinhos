import React from 'react';
import {Dialog, useTheme} from '@rneui/themed';

export default ({visivel = false}) => {
  const {theme} = useTheme();
  return (
    <Dialog isVisible={visivel}>
      <Dialog.Loading loadingStyle={{color: theme.colors.primary}} />
    </Dialog>
  );
};
