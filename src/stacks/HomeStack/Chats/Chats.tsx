import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import {GiftedChat, Send} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {padding, ScreenHeight, ScreenWidth} from '../../../utils/dimensions';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';
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
  const [loading, setLoading] = useState(true);
  const [tagged, setTagged] = useState('');
  const state = useSelector(state => {
    return state;
  });

  const navigation = useNavigation();

  const getChats = async () => {
    const chats = await firestore()
      .collection(`chatrooms/${route.params.chatRoomId}/messages`)
      .get();
    const q = chats.query.orderBy('createdAt', 'desc');
    const unsubscribe = q.onSnapshot((snapshot: any) => {
      setChats(snapshot?.docs?.map((e: any) => e.data()));
      setLoading(false);
    });

    return unsubscribe;
  };

  console.log(state);

  const sendChat = (data: any) => {
    firestore()
      .collection(`chatrooms/${route.params.chatRoomId}/messages`)
      .add(data);
  };

  const onSend = useCallback((chats = []) => {
    setChats(previousMessage => GiftedChat.append(previousMessage, chats));
    sendChat(chats[0]);
  }, []);

  useLayoutEffect(() => {
    getChats();
  }, []);

  const uploadImage = async (uri: string) => {
    const filename = uri?.substring(uri?.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri?.replace('file://', '') : uri;
    const task = storage().ref(filename).putFile(uploadUri);

    try {
      return await task.then(response => {
        storage()
          .refFromURL(
            `gs://${response.metadata.bucket}/${response.metadata.fullPath}`,
          )
          .getDownloadURL()
          .then(response => {
            const data = {
              _id: uuid.v4(),
              createdAt: new Date(),
              text: '',
              user: state.user,
              image: response,
            };
            onSend([data]);
          });
      });
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
      uploadImage(response.assets[0].uri);
    });
  };

  console.log('tagged', tagged);
  return loading ? (
    <ImageBackground
      source={require('../../../assets/images/images.jpeg')}
      resizeMode="cover"
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size={'large'} color={'#2b9348'} />
    </ImageBackground>
  ) : (
    <ImageBackground
      source={require('../../../assets/images/images.jpeg')}
      resizeMode="cover"
      style={{flex: 1, width: ScreenWidth}}>
      <GiftedChat
        textInputStyle={{
          backgroundColor: '#d3d3d3',
          borderRadius: 15,
          paddingHorizontal: padding.p15,
          marginLeft: 1,
          marginRight: 5,
          color: '#000',
        }}
        textInputProps={{
          placeholderTextColor: '#000',
          cursorColor: '#1e88e5',
        }}
        showAvatarForEveryMessage={false}
        showUserAvatar={false}
        renderMessageImage={({currentMessage}) => {
          return currentMessage?.image ? (
            <View style={{height: 400, width: 200, backgroundColor: 'red'}}>
              <Image source={{uri: currentMessage?.image}} />
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
                backgroundColor: '#1e88e5',
                margin: 5,
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Image
                source={require('../../../assets/images/imageSelect.png')}
                style={{height: 30, width: 30, tintColor: '#fff'}}
              />
            </TouchableOpacity>
          );
        }}
        messagesContainerStyle={{backgroundColor: 'transparent'}}
        user={state.user}
        messages={chats}
        onSend={messages => onSend(messages)}
        renderBubble={({currentMessage, user}) => {
          return (
            <TouchableOpacity
              style={{zIndex: 999}}
              onLongPress={() => {
                setTagged(currentMessage?.text);
              }}>
              <View
                style={{
                  paddingTop: padding.p5,
                  marginBottom: padding.p10,
                  paddingRight:
                    currentMessage?.user._id == user?._id
                      ? padding.p6
                      : padding.p10,
                  paddingLeft:
                    currentMessage?.user._id == user?._id
                      ? padding.p6
                      : padding.p10,
                  backgroundColor:
                    currentMessage?.user._id == user?._id
                      ? '#405DE6'
                      : '#F56040',
                  borderBottomLeftRadius:
                    currentMessage?.user._id == user?._id ? 18 : 2,
                  borderBottomRightRadius:
                    currentMessage?.user._id == user?._id ? 2 : 18,
                  borderTopLeftRadius: 18,
                  borderTopRightRadius: 18,
                  maxWidth: ScreenWidth / 2,
                  marginTop: padding.p10,
                  overflow: 'hidden',
                  elevation: 10,
                }}>
                {currentMessage?.image && (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ImageScreen', {
                        imageSrc: currentMessage?.image,
                      });
                    }}
                    style={{
                      alignSelf: 'flex-start',
                      justifyContent: 'flex-start',
                    }}>
                    <Image
                      source={{uri: currentMessage.image}}
                      style={{
                        height: 200,
                        maxWidth: ScreenWidth / 2,
                        resizeMode: 'cover',
                        borderRadius: 15,
                        marginVertical: padding.p5,
                        width: ScreenWidth * 0.4,
                        backgroundColor: '#000814',
                      }}
                    />
                  </TouchableOpacity>
                )}
                <View>
                  {currentMessage?.text.length > 1 ? (
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '700',
                        color: '#fff',
                        paddingHorizontal: padding.p10,
                      }}>
                      {currentMessage?.text}
                    </Text>
                  ) : (
                    <View />
                  )}
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '900',
                      color: '#fff',
                      marginVertical: 5,
                      alignSelf:
                        currentMessage?.user._id == user?._id
                          ? 'flex-end'
                          : 'flex-start',
                    }}>
                    {moment
                      .unix(currentMessage?.createdAt._seconds)
                      .format('hh:mm')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        renderFooter={data => {
          console.log('footer', data);
          return tagged.length > 1 ? (
            <View
              style={{
                width: ScreenWidth,
                backgroundColor: '#fff',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  margin: padding.p10,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    paddingHorizontal: 3,
                    backgroundColor: 'red',
                    marginHorizontal: 5,
                    minHeight: 30,
                    borderRadius: 10,
                  }}
                />
                <Text style={{includeFontPadding: false}}>{tagged}</Text>
              </View>
            </View>
          ) : (
            <View />
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
            <View
              style={{
                paddingHorizontal: padding.p15,
                paddingVertical: padding.p5,
                backgroundColor: '#d3d3d3',
                alignItems: 'center',
                alignSelf: 'center',
                borderRadius: 5,
              }}>
              <Text style={{fontWeight: '700', color: '#003566'}}>
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
    </ImageBackground>
  );
};

export default Chats;

const styles = StyleSheet.create({});
