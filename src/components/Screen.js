import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import colors from '~/constants/colors';

const Screen = ({ children }) => {
  return (
    <SafeAreaView style={s.root}>
      {children}
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  root: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.green,
  },
});

export default Screen;
