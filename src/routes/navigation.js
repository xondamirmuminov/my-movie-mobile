import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CardStyleInterpolators} from '@react-navigation/stack';

import BottomTabNavigation from './BottomNavigation';
import MovieDetails from '../screens/MovieDetails';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
  screenInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
};

const Navigation = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name="BottomTabNavigation" component={BottomTabNavigation} />
    <Stack.Screen name="MovieDetails" component={MovieDetails} />
  </Stack.Navigator>
);

export default Navigation;
