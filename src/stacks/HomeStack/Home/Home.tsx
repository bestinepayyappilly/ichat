import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ParentWrapper from '../../../components/ParentWrapper';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {padding, ScreenHeight} from '../../../utils/dimensions';
import {useSelector, useDispatch} from 'react-redux';

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const navigation = useNavigation();
  const state = useSelector(state => {
    return state;
  });
  console.log(state);
  const getChatRooms = async () => {
    const chatrooms = await firestore().collection('chatrooms').get();
    const q = chatrooms.query.orderBy('name', 'desc');
    const unsubscribe = q.onSnapshot(snapshot => {
      setRooms(
        snapshot?.docs?.map(e => {
          return e.data();
        }),
      );
    });
    return unsubscribe;
  };

  const createNewChatRooms = (name, image) => {
    console.log(rooms);
    firestore().collection('chatrooms').add({name: 'Party'});
  };
  useEffect(() => {
    getChatRooms();
  }, []);
  return (
    <ParentWrapper
      statusBarProps={{
        barStyle: 'light-content',
        translucent: true,
        backgroundColor: 'transparent',
      }}
      parentStyle={{
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 45,
        borderRadius: 15,
        marginTop: padding.p25,
        marginHorizontal: padding.p6,
      }}>
      <View
        style={{
          marginHorizontal: padding.p10,
          padding: padding.p5,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}></View>
      <ScrollView
        fadingEdgeLength={200}
        contentContainerStyle={{
          flexDirection: 'row',
          flex: 1,
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {rooms &&
          rooms.map((value, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Chats', {
                    chatRoomName: value.name,
                    chatRoomId: value.id,
                  });
                }}
                style={{alignItems: 'center'}}>
                <View
                  style={{
                    height: ScreenHeight * 0.15,
                    width: ScreenHeight * 0.15,
                    marginHorizontal: 20,
                    marginVertical: 10,
                    backgroundColor: '#FDE12D',
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}></View>
                <Text style={{fontWeight: '700', fontSize: 15}}>
                  {value.name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </ParentWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});
