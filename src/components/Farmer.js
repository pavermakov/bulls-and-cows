import React from 'react';
import { Image, StyleSheet } from 'react-native';
import files from '~/constants/files';

const Farmer = () => {
  return (
    <Image
      style={s.root}
      resizeMode="contain"
      source={files.farmer}
    />
  );
};

const s = StyleSheet.create({
  root: {
    height: 210,
  },
});

export default Farmer;
