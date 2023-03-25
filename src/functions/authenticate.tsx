import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';

import {updateDetails} from '../redux/actions/updateUserDetails';
import {getAuthState} from '../utils/getAuthState';

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
  const {state, email, uuid, name} = getAuthState();
  const dispatch = useDispatch();
  const data = {email: email, _id: uuid, name: name, avatar: ''};
  state == 'authenticated' ? dispatch(updateDetails(data)) : null;
  if (state == 'authenticated') {
    return {route_name: 'HOME_STACK'};
  } else if (state == 'unauthenticated') {
    return {route_name: 'AUTH_STACK'};
  } else {
    return {route_name: 'LOADING'};
  }
};
