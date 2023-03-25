import {StyleSheet} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from '../stacks/AuthStack/AuthStack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../stacks/AuthStack/SplashScreen/SplashScreen';
import {HomeStack} from '../stacks/HomeStack/HomeStack';

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
          component={HomeStack}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
