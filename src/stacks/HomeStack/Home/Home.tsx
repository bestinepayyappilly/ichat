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
import {padding, ScreenHeight, ScreenWidth} from '../../../utils/dimensions';
import {useSelector} from 'react-redux';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const navigation = useNavigation();
  const state = useSelector(state => {
    return state;
  });

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
  useEffect(() => {
    animatedValue.value = withTiming(1, {duration: 1000});
  }, []);

  const animatedValue = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            animatedValue.value,
            [0, 0.5, 1],
            [50, -10, 0],
            Extrapolate.CLAMP,
          ),
        },
        {
          scale: interpolate(
            animatedValue.value,
            [0, 1],
            [1.3, 1],
            Extrapolate.CLAMP,
          ),
        },
      ],
      opacity: animatedValue.value,
    };
  }, []);

  return (
    <ParentWrapper
      colors={['#fff', '#fff']}
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
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: padding.p10,
          paddingBottom: padding.p10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={{height: ScreenHeight * 0.06, width: ScreenHeight * 0.06}}
          />
          <Text style={{fontSize: 26, fontWeight: '700', color: '#000'}}>
            ChatRooms
          </Text>
        </View>
        <TouchableOpacity
          style={{
            padding: padding.p8,
            backgroundColor: '#d3d3d3',
            borderRadius: 8,
            elevation: 3,
          }}>
          <Image
            source={require('../../../assets/images/plus.png')}
            style={{height: 30, width: 30}}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        fadingEdgeLength={200}
        contentContainerStyle={{
          justifyContent: 'center',
        }}>
        {rooms &&
          rooms.map((value, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate('Chats', {
                    chatRoomName: value.name,
                    chatRoomId: value.id,
                  });
                }}>
                <View
                  style={{
                    padding: padding.p20,
                    overflow: 'hidden',
                    flexDirection: 'row',
                    borderBottomWidth: index + 1 == rooms.length ? 0 : 0.5,
                  }}>
                  <View
                    style={{
                      height: 60,
                      width: 60,
                      borderRadius: 100,
                      backgroundColor: '#d3d3d3',
                      elevation: 2,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontWeight: '900', fontSize: 20}}>
                      {value.name[0].toUpperCase()}
                    </Text>
                  </View>
                  <View style={{padding: padding.p10}}>
                    <Text style={{fontWeight: '700', fontSize: 15}}>
                      {value.name.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </ParentWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});
