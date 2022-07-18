import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CardStyleInterpolators} from '@react-navigation/stack';

import BottomTabNavigation from './BottomNavigation';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
  screenInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
};

const Navigation = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name="BottomTabNavigation" component={BottomTabNavigation} />
  </Stack.Navigator>
);

export default Navigation;
