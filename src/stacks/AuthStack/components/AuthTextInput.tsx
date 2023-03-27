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
    backgroundColor: '#d3d3d3',
    height: ScreenHeight * 0.06,
    borderRadius: 5,
    fontSize: fontSize.f2,
    paddingHorizontal: padding.p9,
    color: '#000',
  },
  titleStyle = {
    fontSize: fontSize.f3,
    marginBottom: padding.p10,
    color: '#D3D3D3',
  },
  textInputProps,
}) => {
  return (
    <View style={containerStyle}>
      {title ? <Text style={titleStyle}>{title}</Text> : <View />}
      <TextInput
        placeholderTextColor={'#000'}
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
