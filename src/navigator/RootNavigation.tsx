import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from '../stacks/AuthStack/AuthStack';
import HomeStack from '../stacks/HomeStack/HomeStack';
import SettingStack from '../stacks/SettingStack/SettingStack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {handleInitialization} from '../functions/authenticate';
import SplashScreen from '../stacks/AuthStack/SplashScreen/SplashScreen';
import MainTab from '../stacks/HomeStack/HomeStack';

export const ROOTNAVIGATIONNAMES = {
  AUTH_STACK: 'AUTH_STACK',
  HOME_STACK: 'HOME_STACK',
  SPLASH_SCREEN: 'SPLASH_SCREEN',
};

const RootNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ROOTNAVIGATIONNAMES.SPLASH_SCREEN}
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name={ROOTNAVIGATIONNAMES.SPLASH_SCREEN}
          component={SplashScreen}
        />
        <Stack.Screen
          name={ROOTNAVIGATIONNAMES.AUTH_STACK}
          component={AuthStack}
        />
        <Stack.Screen
          name={ROOTNAVIGATIONNAMES.HOME_STACK}
          component={MainTab}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
