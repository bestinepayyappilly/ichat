import {StatusBar, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useState} from 'react';
import AuthTextInput from '../components/AuthTextInput';
import {ScreenHeight, ScreenWidth} from '../../../utils/dimensions';
import ParentWrapper from '../../../components/ParentWrapper';
import AuthButton from '../components/AuthButton';
import {signUp} from '../../../functions/authenticate';
import {useNavigation} from '@react-navigation/native';
import {ROOTNAVIGATIONNAMES} from '../../../navigator/RootNavigation';

const Signup = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
    username: '',
    password: '',
  });
  const navigation = useNavigation();

  const verifyAndSignup = async () => {
    const username =
      userName && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(userName)
        ? ''
        : 'username is invalid!\nPlease use a valid email as username';
    const validPassword =
      password &&
      new RegExp(
        '^(?=(.*d){2})(?=.*[a-zA-Z])(?=.*[!@#$%])[0-9a-zA-Z!@#$%]{8,}',
      ).test(password);
    const error = {
      username,
      password: validPassword
        ? 'Please use a password with at least two digits and one special character and minimum password length is 8.'
        : '',
    };
    setError(error);
    if (error.password?.length > 2 || error.username?.length > 2) {
      ToastAndroid.show(error.password ? error.password : error.username, 100);
    } else {
      const {state, message} = await signUp(userName, password);
      if (state == 'success') {
        navigation.replace(ROOTNAVIGATIONNAMES.HOME_STACK);
      }
      ToastAndroid.show(message, 100);
    }
  };

  return (
    <ParentWrapper>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      <AuthTextInput
        title="Username"
        containerStyle={{
          height: ScreenHeight * 0.1,
          width: ScreenWidth * 0.95,
        }}
        onChangeText={value => {
          setUserName(value);
        }}
        placeholder={'John1234'}
        textInputProps={{value: userName, textContentType: 'username'}}
      />
      <AuthTextInput
        title="Password"
        containerStyle={{
          height: ScreenHeight * 0.1,
          width: ScreenWidth * 0.95,
        }}
        onChangeText={value => {
          setPassword(value);
        }}
        placeholder={'password'}
        textInputProps={{
          value: password,
          secureTextEntry: true,
          textContentType: 'password',
        }}
      />
      <AuthButton
        onPress={() => {
          verifyAndSignup();
        }}
        buttonText="Submit"
      />
    </ParentWrapper>
  );
};

export default Signup;

const styles = StyleSheet.create({});
