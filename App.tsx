import {StyleSheet, View} from 'react-native';
import React from 'react';
import RootNavigation from './src/navigator/RootNavigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store/store';
const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
