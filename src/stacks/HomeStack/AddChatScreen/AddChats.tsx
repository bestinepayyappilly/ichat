import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {padding, ScreenHeight} from '../../../utils/dimensions';
import {useNavigation} from '@react-navigation/native';

interface usersData {
  _id: string;
  email: string;
  displayName: string;
  createdAt: string;
}

const AddChats = () => {
  const [users, setUsers] = useState<usersData[]>();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const getUsers = async () => {
    const users = await firestore().collection('users').get();
    const q = users.query.orderBy('createdAt', 'desc');
    const unsubscribe = q.onSnapshot(snapshot => {
      setUsers(
        snapshot?.docs?.map(e => {
          setLoading(false);
          return e.data();
        }),
      );
    });
    return unsubscribe;
  };
  console.log(users);

  const createChatRoom = (displayName: string, _id: string) => {
    firestore()
      .collection('chatrooms')
      .doc(_id)
      .set({id: _id, name: displayName})
      .then(data => {
        navigation.navigate('Chats', {
          chatRoomName: displayName,
          chatRoomId: _id,
        });
      });
  };

  useEffect(() => {
    getUsers();
  }, []);
  return loading ? (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator />
    </View>
  ) : (
    <View style={{flex: 1}}>
      {users &&
        users.map(({_id, email, createdAt, displayName}) => {
          return (
            <View
              style={{
                backgroundColor: '#d3d3d3',
                margin: padding.p10,

                justifyContent: 'space-between',
                padding: padding.p15,
                borderRadius: 6,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View>
                <Text style={{fontWeight: '700', fontSize: 20}}>
                  {displayName ? displayName : ''}
                </Text>
                <Text style={{fontWeight: '700'}}>{email ? email : ''}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  createChatRoom(displayName, _id);
                }}
                style={{padding: 10}}>
                <Image
                  source={require('../../../assets/images/arrow-right.png')}
                  style={{height: 30, width: 30}}
                />
              </TouchableOpacity>
            </View>
          );
        })}
    </View>
  );
};

export default AddChats;

const styles = StyleSheet.create({});
