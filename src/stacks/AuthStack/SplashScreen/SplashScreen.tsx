import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import ParentWrapper from '../../../components/ParentWrapper';
import {getAuthState} from '../../../utils/getAuthState';
import {useNavigation} from '@react-navigation/native';
import {ROOTNAVIGATIONNAMES} from '../../../navigator/RootNavigation';

const SplashScreen = () => {
  const navigation = useNavigation();
  const {state} = getAuthState();

  useEffect(() => {
    if (state == 'authenticated') {
      navigation.replace(ROOTNAVIGATIONNAMES.HOME_STACK);
    } else if (state == 'unauthenticated') {
      navigation.replace(ROOTNAVIGATIONNAMES.AUTH_STACK);
    } else {
      console.log(state);
    }
  }, [state]);

  return <ParentWrapper></ParentWrapper>;
};

export default SplashScreen;

const styles = StyleSheet.create({});
