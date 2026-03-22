import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
