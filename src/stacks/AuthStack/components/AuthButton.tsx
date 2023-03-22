import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {
  fontSize,
  padding,
  ScreenHeight,
  ScreenWidth,
} from '../../../utils/dimensions';

interface AuthButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  buttonText: string;
  buttonStyle: ViewStyle;
  textStyle: TextStyle;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  onPress,
  buttonText = 'button text',
  buttonStyle = {
    backgroundColor: '#000',
    height: ScreenHeight * 0.06,
    width: ScreenWidth * 0.7,
    marginVertical: padding.p16,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle = {
    fontSize: fontSize.f3,
    color: '#fff',
    fontWeight: '700',
  },
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default AuthButton;

const styles = StyleSheet.create({});
