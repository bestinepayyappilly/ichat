import {
  ActivityIndicator,
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
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  onPress,
  buttonText = 'button text',
  buttonStyle = {
    backgroundColor: '#405DE6',
    height: ScreenHeight * 0.06,
    width: ScreenWidth * 0.7,
    marginVertical: padding.p20,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle = {
    fontSize: fontSize.f3,
    color: '#fff',
    fontWeight: '700',
  },
  loading,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      {loading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <Text style={textStyle}>{buttonText}</Text>
      )}
    </TouchableOpacity>
  );
};

export default AuthButton;

const styles = StyleSheet.create({});
