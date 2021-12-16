import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home, Search } from '../screens';

const Stack = createStackNavigator();

const MainNavigation: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name='Home' component={Home} />
    <Stack.Screen name='Search' component={Search} />
  </Stack.Navigator>
);

export default MainNavigation;
