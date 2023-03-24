import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from '../stacks/AuthStack/AuthStack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import SplashScreen from '../stacks/AuthStack/SplashScreen/SplashScreen';
import MainTab from '../stacks/HomeStack/HomeStack';
import Chats from '../stacks/HomeStack/Chats/Chats';

export const ROOTNAVIGATIONNAMES = {
  AUTH_STACK: 'AUTH_STACK',
  HOME_STACK: 'HOME_STACK',
  SPLASH_SCREEN: 'SPLASH_SCREEN',
};

const RootNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ROOTNAVIGATIONNAMES.SPLASH_SCREEN}>
        <Stack.Screen
          name={ROOTNAVIGATIONNAMES.SPLASH_SCREEN}
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ROOTNAVIGATIONNAMES.AUTH_STACK}
          component={AuthStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ROOTNAVIGATIONNAMES.HOME_STACK}
          component={MainTab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Chats"
          component={Chats}
          options={{headerShown: true, cardStyle: {backgroundColor: '#fff'}}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
