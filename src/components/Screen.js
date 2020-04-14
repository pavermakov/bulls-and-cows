import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Decorations from '~/components/Decorations';

const Screen = ({ children }) => {
  return (
    <>
      <Decorations />

      <SafeAreaView style={s.wrapper}>
          {children}
      </SafeAreaView>
    </>
  );
};

const s = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFill,
  },
});

export default Screen;
