import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Login';
import Signup from './Signup';
import SplashScreen from './SplashScreen/SplashScreen';

const AuthStack = () => {
  const Stack = createStackNavigator();
  const AUTHNAVIGATIONNAMES = {
    SPLASH_SCREEN: 'SPLASH_SCREEN',
    LOGIN: 'LOGIN',
    SIGNUP: 'SIGNUP',
  };
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={AUTHNAVIGATIONNAMES.SIGNUP}>
      <Stack.Screen name={AUTHNAVIGATIONNAMES.SIGNUP} component={Signup} />
      <Stack.Screen name={AUTHNAVIGATIONNAMES.LOGIN} component={Login} />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
