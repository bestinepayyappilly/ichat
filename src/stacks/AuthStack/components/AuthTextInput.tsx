import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {fontSize, padding, ScreenHeight} from '../../../utils/dimensions';

interface AuthTextInputProps {
  containerStyle: ViewStyle;
  title: string;
  placeholder: string;
  onChangeText: (text: string) => void;

  inputStyle?: TextStyle;
  titleStyle?: TextStyle;
  textInputProps: TextInputProps;
}

const AuthTextInput: React.FC<AuthTextInputProps> = ({
  containerStyle = {
    backgroundColor: 'rgba(251,251,251,0.5)',
  },
  onChangeText,
  title,
  placeholder = 'place-holder',

  inputStyle = {
    backgroundColor: '#000',
    height: ScreenHeight * 0.05,
    borderRadius: 5,
    fontSize: fontSize.f2,
    paddingHorizontal: padding.p8,
    color: '#fff',
  },
  titleStyle = {
    fontSize: fontSize.f3,
    marginBottom: padding.p10,
  },
  textInputProps,
}) => {
  return (
    <View style={containerStyle}>
      {title ? <Text style={titleStyle}>{title}</Text> : <View />}
      <TextInput
        placeholderTextColor={'#fff'}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={inputStyle}
        {...textInputProps}
      />
    </View>
  );
};

export default AuthTextInput;

const styles = StyleSheet.create({});
