import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import ParentWrapper from '../../../components/ParentWrapper';
import {padding} from '../../../utils/dimensions';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {SignOut} from '../../../redux/actions/signOut';

const Settings = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
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
      }}>
      <TouchableOpacity
        style={{height: 100, width: '100%', backgroundColor: 'blue'}}
        onPress={() => {
          auth()
            .signOut()
            .then(() => {
              dispatch(SignOut());
              navigation.replace('SPLASH_SCREEN');
            });
        }}></TouchableOpacity>
    </ParentWrapper>
  );
};

export default Settings;

const styles = StyleSheet.create({});
