import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
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
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const state = useSelector(state => {
    return state;
  });
  console.log(state);

  const getChatRooms = async () => {
    const chatrooms = await firestore().collection('chatrooms').get();
    const q = chatrooms.query.orderBy('name', 'asc');
    const unsubscribe = q.onSnapshot(snapshot => {
      setRooms(
        snapshot?.docs?.map(e => {
          return e.data();
        }),
      );
    });
    setLoading(false);
    return unsubscribe;
  };

  console.log(rooms);
  useEffect(() => {
    getChatRooms();
  }, []);
  useEffect(() => {
    animatedValue.value = withTiming(1, {duration: 1000});
  }, []);

  const animatedValue = useSharedValue(0);

  useLayoutEffect(() => {
    StatusBar.setBarStyle('dark-content');
  }, []);

  return loading ? (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator />
    </View>
  ) : (
    <ParentWrapper
      colors={['#fff', '#fff']}
      parentStyle={{
        flex: 1,
        paddingTop:
          Platform.OS === 'android' ? StatusBar.currentHeight * 2 : 45,

        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,

        marginHorizontal: 2,
      }}>
      <View style={{paddingHorizontal: padding.p10}}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',

            paddingBottom: padding.p10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={{height: ScreenHeight * 0.06, width: ScreenHeight * 0.06}}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddChatRoom');
            }}
            style={{
              padding: padding.p8,
              backgroundColor: '#242423',
              borderRadius: 10,
              elevation: 1,
            }}>
            <Image
              source={require('../../../assets/images/plus.png')}
              style={{height: 30, width: 30, tintColor: '#fff'}}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 36,
            fontWeight: '700',
            color: '#000',
            marginLeft: padding.p6,
          }}>
          Chatrooms
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        fadingEdgeLength={200}
        contentContainerStyle={{
          justifyContent: 'center',
        }}>
        {rooms &&
          rooms.map((value, index) => {
            const currentUser = value.users.filter(
              item => item.id !== state.user._id,
            );

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
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 70,
                      width: 70,
                      borderRadius: 100,
                      backgroundColor: '#141b41',
                      elevation: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontWeight: '900',
                        fontSize: 20,
                        color: '#fff',
                      }}>
                      {currentUser[0]?.name[0].toUpperCase()}
                    </Text>
                  </View>
                  <View style={{padding: padding.p10}}>
                    <Text
                      style={{fontWeight: '700', fontSize: 16, color: '#000'}}>
                      {currentUser[0]?.name.toUpperCase()}
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
