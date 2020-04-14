import React from 'react';
import { View, StyleSheet } from 'react-native';
import Cloud from './Cloud';
import { renderTimes } from '~/utilities';

const CLOUDS_COUNT = 1;

const Clouds = () => {
  return (
    <View style={s.root}>
      <View style={s.wrapper}>
        {renderTimes(CLOUDS_COUNT, (item, index) => (
          <Cloud key={index} />
        ))}
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFill,
  },
  wrapper: {
    flex: 1,
    position: 'relative',
  },
});

export default Clouds;
