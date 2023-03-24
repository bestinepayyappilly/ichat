import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ParentWrapper from '../../../components/ParentWrapper';
import {padding} from '../../../utils/dimensions';

const Settings = () => {
  return (
    <ParentWrapper
      statusBarProps={{
        barStyle: 'light-content',
        translucent: true,
        backgroundColor: 'transparent',
      }}
      parentStyle={{
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 45,
        borderRadius: 15,
        marginTop: padding.p25,
        marginHorizontal: padding.p6,
      }}></ParentWrapper>
  );
};

export default Settings;

const styles = StyleSheet.create({});
