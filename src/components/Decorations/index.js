import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import Windmill from '~/components/Decorations/Windmill';
import Grass from '~/components/Decorations/Grass';
import Sun from '~/components/Decorations/Sun';
import Clouds from '~/components/Decorations/Clouds';
import colors from '~/constants/colors';

const Decorations = () => {
  return (
    <View style={s.root}>
      <Sun style={s.sun} />
      <Windmill style={s.windmill} />
      <Grass style={s.grass} />
      <Clouds />
    </View>
  );
};

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.sky,
    position: 'relative',
  },
  grass: {
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  windmill: {
    position: 'absolute',
    bottom: 105,
    right: -20,
  },
  sun: {
    position: 'absolute',
    top: 25,
    left: 25,
  },
});

export default memo(Decorations);
