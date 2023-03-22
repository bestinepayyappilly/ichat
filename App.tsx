import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RootNavigation from './src/navigator/RootNavigation';

const App = () => {
  return (
    <View
      style={{
        paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 45,
        flex: 1,
      }}>
      <RootNavigation />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
