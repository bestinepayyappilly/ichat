// @ts-ignore
import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import ParentWrapper from '../../../components/ParentWrapper';
import {getAuthState} from '../../../utils/getAuthState';
import {useNavigation} from '@react-navigation/native';
import {ROOTNAVIGATIONNAMES} from '../../../navigator/RootNavigation';
import {useDispatch} from 'react-redux';
import {updateDetails} from '../../../redux/actions/updateUserDetails';
const SplashScreen = () => {
  const navigation = useNavigation();
  const {state, email, uuid, name} = getAuthState();
  const dispatch = useDispatch();
  console.log(state, email, uuid, name);

  useEffect(() => {
    if (state == 'authenticated') {
      const data = {email: email, _id: uuid, name: name, avatar: ''};
      dispatch(updateDetails(data));
      navigation.replace(ROOTNAVIGATIONNAMES.HOME_STACK);
    } else if (state == 'unauthenticated') {
      navigation.replace(ROOTNAVIGATIONNAMES.AUTH_STACK);
    } else {
      console.log(state);
    }
  }, [state]);

  return <ParentWrapper></ParentWrapper>;
};

export default SplashScreen;

const styles = StyleSheet.create({});
