import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScreenHeight, ScreenWidth} from '../../../utils/dimensions';

const ImageScreen = ({route}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <StatusBar barStyle={'dark-content'} />
      {route?.params?.imageSrc && (
        <Image
          source={{uri: route?.params?.imageSrc}}
          style={{
            flex: 1,
            height: ScreenHeight * 0.85,
            width: ScreenWidth,
            alignItems: 'flex-start',
            marginVertical: 50,
          }}
          resizeMode="contain"
        />
      )}
    </View>
  );
};

export default ImageScreen;

const styles = StyleSheet.create({});
