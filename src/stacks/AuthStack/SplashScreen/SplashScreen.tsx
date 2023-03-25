// @ts-ignore
import {Image, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import ParentWrapper from '../../../components/ParentWrapper';
import {getAuthState} from '../../../utils/getAuthState';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {updateDetails} from '../../../redux/actions/updateUserDetails';
import {padding, ScreenHeight} from '../../../utils/dimensions';
const SplashScreen = () => {
  const navigation = useNavigation();
  const {state, email, uuid, name} = getAuthState();
  const dispatch = useDispatch();
  console.log(state, email, uuid, name);

  useEffect(() => {
    if (state == 'authenticated') {
      const data = {email: email, _id: uuid, name: name, avatar: ''};
      dispatch(updateDetails(data));
      navigation.replace('HOME_STACK');
    } else if (state == 'unauthenticated') {
      navigation.replace('AUTH_STACK');
    } else {
      console.log(state);
    }
  }, [state]);

  return (
    <ParentWrapper>
      <Image
        style={{
          height: ScreenHeight * 0.12,
          width: ScreenHeight * 0.12,
          marginVertical: padding.p20,
          transform: [
            {
              scale: 3,
            },
          ],
        }}
        source={require('../../../assets/images/logo.png')}
      />
    </ParentWrapper>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
