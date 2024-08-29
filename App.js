import React from 'react';
import Providers from './src/navigation';

import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();

export default function App() {
  return <Providers />;
}
