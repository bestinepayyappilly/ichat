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
  colors: string[];
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
  colors = ['#000', '#000'],
}) => {
  return (
    <View style={{flex: 1}}>
      <LinearGradient colors={colors} style={parentStyle}>
        <StatusBar {...statusBarProps} />
        {children}
      </LinearGradient>
    </View>
  );
};

export default ParentWrapper;

const styles = StyleSheet.create({});
