import {StatusBar, StyleSheet, Text, ToastAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import AuthTextInput from '../components/AuthTextInput';
import {padding, ScreenHeight, ScreenWidth} from '../../../utils/dimensions';
import ParentWrapper from '../../../components/ParentWrapper';
import AuthButton from '../components/AuthButton';
import {signUp} from '../../../functions/authenticate';
import {useNavigation} from '@react-navigation/native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const Signup = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    username: '',
    password: '',
  });
  useEffect(() => {
    animatedValue.value = withTiming(1, {duration: 800});
    bodyAnimatedValue.value = withDelay(1000, withTiming(1, {duration: 1000}));
  }, []);
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
      setLoading(true);
      const {state, message} = await signUp(userName, password, firstName);
      setLoading(false);
      if (state == 'success') {
        navigation.replace('SPLASH_SCREEN');
      }
      ToastAndroid.show(message, 100);
    }
  };
  const animatedValue = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(animatedValue.value, [0, 1], [200, 0]),
        },
        {
          scale: interpolate(animatedValue.value, [0, 1], [3, 1]),
        },
      ],
    };
  });
  const bodyAnimatedValue = useSharedValue(0);
  const bodyAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(bodyAnimatedValue.value, [0, 1], [0, 1]),
    };
  });

  return (
    <ParentWrapper>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
      <Animated.Image
        source={require('../../../assets/images/logo.png')}
        style={[
          {
            height: ScreenHeight * 0.12,
            width: ScreenHeight * 0.12,
            marginVertical: padding.p20,
          },
          animatedStyle,
        ]}
      />
      <Animated.View style={[bodyAnimatedStyle, {alignItems: 'center'}]}>
        <Text
          style={{
            fontWeight: '700',
            alignSelf: 'flex-start',

            marginVertical: padding.p20,
            fontSize: 36,
            color: '#f5f5f5',
          }}>
          Register
        </Text>
        <AuthTextInput
          title="FirstName"
          containerStyle={{
            height: ScreenHeight * 0.1,
            width: ScreenWidth * 0.95,
            marginVertical: padding.p5,
          }}
          onChangeText={value => {
            setFirstName(value);
          }}
          placeholder={'John Doe'}
          textInputProps={{value: firstName, textContentType: 'name'}}
        />
        <AuthTextInput
          title="Username"
          containerStyle={{
            height: ScreenHeight * 0.1,
            width: ScreenWidth * 0.95,
            marginVertical: padding.p5,
          }}
          onChangeText={value => {
            setUserName(value);
          }}
          placeholder={'xxxxxx@gmail.com'}
          textInputProps={{value: userName, textContentType: 'username'}}
        />
        <AuthTextInput
          title="Password"
          containerStyle={{
            height: ScreenHeight * 0.1,
            width: ScreenWidth * 0.95,
            marginVertical: padding.p5,
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
          loading={loading}
          onPress={() => {
            verifyAndSignup();
          }}
          buttonText="Submit"
        />
      </Animated.View>
    </ParentWrapper>
  );
};

export default Signup;

const styles = StyleSheet.create({});
