import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {padding, ScreenWidth} from '../../../utils/dimensions';
import storage from '@react-native-firebase/storage';
const ImagePicker = require('react-native-image-picker');
interface chatBody {
  _id: string | number;
  text: string;
  createdAt: Date | number;
  user: {
    _id: number;
    name: string;
    avatar: string;
  };
  image?: string;
  video?: string;
  audio?: string;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
}
const Chats = ({route}) => {
  const [chats, setChats] = useState([
    {_id: String, createdAt: String, text: String, user: String},
  ]);
  const state = useSelector(state => {
    return state;
  });
  console.log(state);

  const getChats = async () => {
    const chats = await firestore()
      .collection(`chatrooms/${route.params.chatRoomId}/messages`)
      .get();
    const q = chats.query.orderBy('createdAt', 'desc');
    const unsubscribe = q.onSnapshot((snapshot: any) => {
      setChats(snapshot?.docs?.map((e: any) => e.data()));
    });

    return unsubscribe;
  };
  const navigation = useNavigation();

  const sendChat = (data: any) => {
    firestore()
      .collection(`chatrooms/${route.params.chatRoomId}/messages`)
      .add(data);
  };

  const onSend = useCallback((chats = []) => {
    sendChat(chats[0]);
  }, []);

  useLayoutEffect(() => {
    getChats();
  }, []);

  const uploadImage = async (fileName: string, uri: string) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const task = storage().ref(fileName).putFile(uploadUri);
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
  };

  const selectImage = () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        Alert.alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        Alert.alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        Alert.alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        Alert.alert(response.errorMessage);
        return;
      }

      const {base64, uri, width, height, fileSize, type, fileName} = response;

      uploadImage(fileName, uri);
      const data = {
        _id: String,
        createdAt: new Date(),
        text: 'fdsfsd',
        user: {_id: '', avatar: '', email: '', name: ''},
      };
      // onSend({
      //   _id
      // })
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      console.log(response);
    });
  };

  console.log(route.params);
  return (
    <GiftedChat
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
      renderMessageImage={({currentMessage}) => {
        return currentMessage?.image ? (
          <View style={{height: 200, width: 200, backgroundColor: 'red'}}>
            <Image source={require('../../../assets/images/logo.png')} />
          </View>
        ) : (
          <View />
        );
      }}
      renderActions={() => {
        return (
          <TouchableOpacity
            onPress={() => {
              selectImage();
            }}
            style={{
              height: 40,
              width: 40,
              backgroundColor: 'rgba(242,242,242,1)',
              margin: 5,
              borderRadius: 100,

              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../../../assets/images/imageSelect.png')}
              style={{height: 30, width: 30}}
            />
          </TouchableOpacity>
        );
      }}
      messagesContainerStyle={{backgroundColor: '#d3d3d3'}}
      user={state.user}
      messages={chats}
      onSend={messages => onSend(messages)}
      renderBubble={({currentMessage, user}) => {
        return (
          <View
            style={{
              paddingVertical: padding.p10,
              paddingRight:
                currentMessage?.user._id == user?._id
                  ? padding.p15
                  : padding.p10,
              paddingLeft:
                currentMessage?.user._id == user?._id
                  ? padding.p10
                  : padding.p15,
              backgroundColor:
                currentMessage?.user._id == user?._id ? 'green' : '#696969',
              borderTopLeftRadius:
                currentMessage?.user._id == user?._id ? 8 : 2,
              borderTopRightRadius:
                currentMessage?.user._id == user?._id ? 2 : 8,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              maxWidth: ScreenWidth / 2,
              margin: padding.p10,
              overflow: 'hidden',
            }}>
            {currentMessage?.image && (
              <Image
                source={{uri: currentMessage.image}}
                style={{
                  height: 150,
                  maxWidth: ScreenWidth / 2,
                  resizeMode: 'cover',
                  borderRadius: 8,
                  marginVertical: padding.p5,
                }}
              />
            )}
            <Text style={{fontSize: 15, fontWeight: '700', color: '#fff'}}>
              {currentMessage?.text}
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontWeight: '600',
                color: '#fff',
                marginVertical: 1,
              }}>
              {moment.unix(currentMessage?.createdAt._seconds).format('LLLL')}
            </Text>
          </View>
        );
      }}
      renderDay={({currentMessage, previousMessage}) => {
        const prevDate = moment
          .unix(previousMessage?.createdAt?.seconds)
          .format('DD');
        const currentDate = moment
          .unix(currentMessage?.createdAt.seconds)
          .format('DD');

        return +currentDate - +prevDate > 0 ? (
          <View style={{alignItems: 'center'}}>
            <Text>
              {moment.unix(previousMessage?.createdAt?.seconds).format('LL')}
            </Text>
          </View>
        ) : (
          <View />
        );
      }}
      renderTime={({currentMessage}) => {
        return (
          <Text
            style={{
              fontSize: 8,
              color: '#fff',
            }}>
            {moment(currentMessage?.createdAt?.seconds).format('h:mm A')}
          </Text>
        );
      }}
    />
  );
};

export default Chats;

const styles = StyleSheet.create({});
