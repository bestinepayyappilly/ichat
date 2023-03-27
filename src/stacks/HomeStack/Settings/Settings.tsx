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
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        style={{
          height: 100,
          width: '100%',
          backgroundColor: '#d3d3d3',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
        }}
        onPress={() => {
          auth()
            .signOut()
            .then(() => {
              dispatch(SignOut());
              navigation.replace('SPLASH_SCREEN');
            });
        }}>
        <Text style={{fontSize: 20, fontWeight: '700'}}>Sign Out</Text>
      </TouchableOpacity>
    </ParentWrapper>
  );
};

export default Settings;

const styles = StyleSheet.create({});
