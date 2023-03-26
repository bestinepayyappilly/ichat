import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {getAuthState} from '../utils/getAuthState';

export const signUp = (username: string, password: string, name: string) => {
  return auth()
    .createUserWithEmailAndPassword(username, password)
    .then(data => {
      return data.user.updateProfile({displayName: name}).then(() => {
        return firestore()
          .collection('users')
          .add({
            _id: data.user.uid,
            email: data.user.email,
            createdAt: data.user.metadata.creationTime,
            displayName: name,
          })
          .then(() => {
            return {
              state: 'success',
              message: 'Account created successfully',
            };
          });
      });
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
  const {state, email, uuid, name} = getAuthState();
  if (state == 'authenticated') {
    return {route_name: 'SPLASH_SCREEN'};
  } else if (state == 'unauthenticated') {
    return {route_name: 'AUTH_STACK'};
  } else {
    return {route_name: 'LOADING'};
  }
};
