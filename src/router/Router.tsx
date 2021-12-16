import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Home } from '../screens';

const Router = () => {
  return (
    <NavigationContainer>
      <Home />
    </NavigationContainer>
  );
};

export default Router;
