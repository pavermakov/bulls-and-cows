import React, { forwardRef } from 'react';
import { View, StyleSheet } from 'react-native';

const InputCell = forwardRef((props, ref) => {
  return (
    <View
      style={s.cell}
      ref={ref}
    />
  );
});

const Input = ({ children }) => {
  return (
    <View style={s.root}>
      {children}
    </View>
  );
};

const s = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 20,
  },

  cell: {
    height: 50,
    width: 50,
    margin: 5,
    borderRadius: 5,
    backgroundColor: 'black',
    opacity: 0.2,
  },
});

export { Input, InputCell };
