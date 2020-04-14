import React from 'react';
import { Image, Dimensions, StyleSheet } from 'react-native';
import files from '~/constants/files';

const Grass = ({ style }) => {
  return (
    <Image
      style={[s.root, style]}
      resizeMode="cover"
      source={files.grass}
    />
  );
};

const s = StyleSheet.create({
  root: {
    width: Dimensions.get('window').width,
    height: 200,
  },
});

export default Grass;
