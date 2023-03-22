import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Signup = () => {
  return (
    <View
      style={{
        backgroundColor: 'red',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({});
