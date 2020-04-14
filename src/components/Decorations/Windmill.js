import React from 'react';
import { View, Animated, Image, StyleSheet } from 'react-native';
import useRotation from '~/hooks/useRotation';
import files from '~/constants/files';

const Windmill = ({ style }) => {
  const rotate = useRotation({ duration: 3000 });
  const wingsStyles = [s.wings, { transform: [{ rotate }] }];

  return (
    <View style={style}>
      <Image
        style={s.barn}
        resizeMode="contain"
        source={files.barn}
      />

      <Animated.Image
        style={wingsStyles}
        source={files.wings}
      />
    </View>
  );
};

const s = StyleSheet.create({
  barn: {
    width: 120,
    height: 120,
  },

  wings: {
    position: 'absolute',
    left: -6,
    width: 70,
    height: 70,
  },
});

export default Windmill;
