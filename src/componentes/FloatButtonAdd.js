import React from 'react';
import {useTheme, FAB} from '@rneui/themed';

export default ({onClick}) => {
  const {theme} = useTheme();
  return (
    <FAB
      visible={true}
      icon={{type: 'ionicon', name: 'add', color: theme.colors.white}}
      color={theme.colors.secondary}
      onPress={() => onClick()}
      containerStyle={{position: 'absolute', bottom: 10, right: 10}}
    />
  );
};
