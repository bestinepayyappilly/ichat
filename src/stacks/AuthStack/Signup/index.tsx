import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AuthTextInput from '../components/AuthTextInput';
import {ScreenHeight, ScreenWidth} from '../../../utils/dimensions';
import ParentWrapper from '../../../components/ParentWrapper';
import AuthButton from '../components/AuthButton';

const Signup = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
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
      <AuthButton onPress={({eventPhase})=>[
        console.log(eventPhase)

      ]} buttonText="Submit" />
    </ParentWrapper>
  );
};

export default Signup;

const styles = StyleSheet.create({});
