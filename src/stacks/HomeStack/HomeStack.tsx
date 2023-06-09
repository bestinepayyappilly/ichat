import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home/Home';
import Settings from './Settings/Settings';
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import Chats from './Chats/Chats';
import ImageScreen from './ImageScreen/ImageScreen';
import AddChats from './AddChatScreen/AddChats';

export const HomeStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={MainTab}
        options={{cardStyle: {backgroundColor: '#000'}, headerShown: false}}
      />
      <Stack.Screen
        name="Chats"
        component={Chats}
        options={{
          headerShown: true,
          cardStyle: {backgroundColor: '#fff'},
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerStyle: {backgroundColor: '#2b9348'},
        }}
      />
      <Stack.Screen
        name="ImageScreen"
        component={ImageScreen}
        options={{headerShown: true, cardStyle: {backgroundColor: '#fff'}}}
      />
      <Stack.Screen
        name="AddChatRoom"
        component={AddChats}
        options={{
          headerShown: true,
          cardStyle: {backgroundColor: '#fff'},
          presentation: 'modal',
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
    </Stack.Navigator>
  );
};

const MainTab = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: '#000'}}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopWidth: 0,
          paddingTop: 10,
        },
        tabBarLabelStyle: {fontSize: 10.5, fontWeight: '700'},
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#D3D3D3',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  width: 25,
                  height: 25,
                  flex: 1,
                }}>
                <Image
                  source={require('../../assets/images/home.png')}
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? '#fff' : '#D3D3D3',
                  }}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  width: 26,
                  height: 26,
                  flex: 1,
                }}>
                <Image
                  source={require('../../assets/images/settings.png')}
                  style={{
                    width: 26,
                    height: 26,
                    tintColor: focused ? '#fff' : '#D3D3D3',
                  }}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;

const styles = StyleSheet.create({});
