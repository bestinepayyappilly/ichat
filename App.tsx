import {StyleSheet, View} from 'react-native';
import React from 'react';
import RootNavigation from './src/navigator/RootNavigation';

const App = () => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <RootNavigation />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
