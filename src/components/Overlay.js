import React from 'react';
import { View, StyleSheet } from 'react-native';

const Overlay = ({ children }) => {
  return (
    <View style={s.root}>
      {children}
    </View>
  );
};

const s = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
});

export default Overlay;
