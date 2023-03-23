import {
  Platform,
  StatusBar,
  StatusBarProps,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {ReactNode} from 'react';
import LinearGradient from 'react-native-linear-gradient';
interface ParentWrapperProps {
  children: ReactNode;
  parentStyle?: ViewStyle;
  statusBarProps?: StatusBarProps;
}

const ParentWrapper: React.FC<ParentWrapperProps> = ({
  children,
  parentStyle = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 45,
  },
  statusBarProps = {
    barStyle: 'dark-content',
    backgroundColor: 'transparent',
    translucent: true,
  },
}) => {
  return (
    <LinearGradient colors={['#4e54c8', '#8f94fb']} style={parentStyle}>
      <StatusBar {...statusBarProps} />
      {children}
    </LinearGradient>
  );
};

export default ParentWrapper;

const styles = StyleSheet.create({});
