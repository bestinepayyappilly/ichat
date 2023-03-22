import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from '../stacks/AuthStack/AuthStack';
import HomeStack from '../stacks/HomeStack/HomeStack';
import SettingStack from '../stacks/SettingStack/SettingStack';
import {NavigationContainer} from '@react-navigation/native';

const RootNavigation = () => {
  const Stack = createStackNavigator();

  const ROOTNAVIGATIONNAMES = {
    AUTH_STACK: 'AUTH_STACK',
    HOME_STACK: 'HOME_STACK',
    SETTING_STACK: 'SETTING_STACK',
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name={ROOTNAVIGATIONNAMES.AUTH_STACK}
          component={AuthStack}
        />
        <Stack.Screen
          name={ROOTNAVIGATIONNAMES.HOME_STACK}
          component={HomeStack}
        />
        <Stack.Screen
          name={ROOTNAVIGATIONNAMES.SETTING_STACK}
          component={SettingStack}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
