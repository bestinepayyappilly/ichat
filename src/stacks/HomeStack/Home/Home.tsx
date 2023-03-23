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

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const navigation = useNavigation();
  const getChatRooms = async () => {
    const chatrooms = await firestore().collection('users').get();
    const q = chatrooms.query.orderBy('createdAt', 'desc');
    const unsubscribe = q.onSnapshot(snapshot => {
      snapshot.docs.map(e => {
        console.log(e.data());
      });
    });
    return unsubscribe;
  };

  const createNewChatRooms = (name, image) => {
    console.log(rooms);
    firestore()
      .collection('users')
      .add({...rooms, image: image, name: name});
  };
  useEffect(() => {
    getChatRooms();
  }, []);
  return (
    <ParentWrapper
      parentStyle={{
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 45,
      }}>
      <ScrollView contentContainerStyle={{flexDirection: 'row'}} horizontal>
        {rooms &&
          rooms.map((value, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Chats');
                }}
                style={{alignItems: 'center'}}>
                <View
                  style={{
                    height: 100,
                    width: 100,
                    margin: 20,
                    backgroundColor: 'red',
                    borderRadius: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}>
                  <Image
                    source={{uri: value.image}}
                    style={{height: 100, width: 100}}
                  />
                </View>
                <Text>{value.name}</Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
      <TouchableOpacity
        style={{height: 100, width: 100, backgroundColor: 'red'}}
        onPress={() => {
          createNewChatRooms('name1', 'imag1e');
        }}></TouchableOpacity>
    </ParentWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});
