import {StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

export interface user {
  displayName: string;
  email: string;
  emailVerified: string;
  isAnonymous: boolean;
  metadata: {
    creationTime: undefined | string;
    lastSignInTime: undefined | string;
  };
  photoURL: string | null;
  uid: string;
}

export const getAuthState = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<user>();

  const onAuthStateChanged = (user: user) => {
    console.log(user);
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  if (initializing) return {state: 'initializing'};
  if (!user) {
    return {state: 'unauthenticated'};
  } else {
    return {
      state: 'authenticated',
      email: user.email,
      name: user.displayName,
      uuid: user.uid,
      metadata: user.metadata,
    };
  }
};

const styles = StyleSheet.create({});
