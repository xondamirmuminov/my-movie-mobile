import {View, Text, SafeAreaView, Platform} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../constants';
import Home from '../screens/Home';
import Movie from '../screens/Movies';

const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
  tabBarActiveTintColor: COLORS.RED,
  tabBarStyle: {
    elevation: 2,
    backgroundColor: COLORS.SCREEN_BG,
    height: Platform.OS === 'android' ? 70 : 90,
    paddingTop: 5,
    paddingHorizontal: 15,
    borderRadius: 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBarItemStyle: {
    height: 58,
    paddingHorizontal: 9,
    paddingVertical: 8,
  },
  tabBarIconStyle: {
    width: 30,
    height: 30,
  },
  tabBarLabelStyle: {
    fontFamily: 'Poppins',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: -5,
  },
};

EntypoIcon.loadFont();
FontAwesomeIcon.loadFont();

const BottomTabNavigation = ({navigation}) => {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <EntypoIcon color={color} name="home" size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Movies"
        component={Movie}
        options={{
          tabBarLabel: 'Movies',
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon color={color} name="film" size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="TV Shows"
        component={Movie}
        options={{
          tabBarLabel: 'TV Shows',
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon color={color} name="tv" size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Actors"
        component={Movie}
        options={{
          tabBarLabel: 'Actors',
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon color={color} name="star-o" size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
