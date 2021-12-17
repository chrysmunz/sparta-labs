import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Details, Home, Search } from '../screens';

const Stack = createStackNavigator();

const MainNavigation: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name='Home' component={Home} />
    <Stack.Screen name='Search' component={Search} />
    <Stack.Screen name='Details' component={Details} />
  </Stack.Navigator>
);

export default MainNavigation;
