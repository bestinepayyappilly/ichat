import auth from '@react-native-firebase/auth';
import {ROOTNAVIGATIONNAMES} from '../navigator/RootNavigation';
import {getAuthState} from '../utils/getAuthState';
import firestore from '@react-native-firebase/firestore';

export const signUp = (username: string, password: string) => {
  return auth()
    .createUserWithEmailAndPassword(username, password)
    .then(() => {
      return {
        state: 'success',
        message: 'Account created successfully',
      };
    })

    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        return {
          state: 'failed',
          message: 'That email address is already in use!',
        };
      }

      if (error.code === 'auth/invalid-email') {
        return {
          state: 'failed',
          message: 'This email address is invalid',
        };
      }
      return {
        state: 'failed',
        message: error,
      };
      //   console.error(error);
    });
};

export const handleInitialization = () => {
  const {state} = getAuthState();
  if (state == 'authenticated') {
    return {route_name: ROOTNAVIGATIONNAMES.HOME_STACK};
  } else if (state == 'unauthenticated') {
    return {route_name: ROOTNAVIGATIONNAMES.AUTH_STACK};
  } else {
    return {route_name: 'LOADING'};
  }
};
