import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Cloud from './Cloud';
import { getRandomItemFromList, getRandomNumberFromRange, renderTimes } from '~/utilities';
import files from '~/constants/files';
import device from '~/constants/device';
import { CLOUDS_COUNT } from '~/constants/config';

const DIRECTIONS = {
  TO_EAST: 'TO_EAST',
  TO_WEST: 'TO_WEST',
};

const DURATION = {
  MIN: 40000,
  MAX: 90000,
};

const DELAY = {
  MIN: 2000,
  MAX: 4000,
};

const WIDTH = {
  MIN: 90,
  MAX: 140,
};

const TOP = {
  MIN: 0,
  MAX: Math.round(device.height * 0.7),
};

const getStartingPoint = (direction, width) => {
  return ({
    [DIRECTIONS.TO_EAST]: -width,
    [DIRECTIONS.TO_WEST]: device.width + width,
  })[direction];
};

const getShiftValue = (direction, width) => {
  return ({
    [DIRECTIONS.TO_EAST]: device.width + width,
    [DIRECTIONS.TO_WEST]: -device.width - width * 2,
  })[direction];
};

const getCloudTemplate = () => {
  const id = Math.random();
  const source = getRandomItemFromList(files.clouds);
  const duration = getRandomNumberFromRange({ min: DURATION.MIN, max: DURATION.MAX, isInt: true });
  const delay = getRandomNumberFromRange({ min: DELAY.MIN, max: DELAY.MAX, isInt: true });
  const width = getRandomNumberFromRange({ min: WIDTH.MIN, max: WIDTH.MAX, isInt: true });

  const direction = id > 0.5 ? DIRECTIONS.TO_WEST : DIRECTIONS.TO_EAST;
  const left = getStartingPoint(direction, width);
  const top = getRandomNumberFromRange({ min: TOP.MIN, max: TOP.MAX, isInt: true });
  const shiftBy = getShiftValue(direction, width);

  return {
    id,
    width,
    source,
    duration,
    delay,
    top,
    left,
    shiftBy,
  };
};

const generateClouds = (count) => {
  return renderTimes(count, getCloudTemplate);
};

const Clouds = () => {
  const [clouds, setClouds] = useState(generateClouds(CLOUDS_COUNT));

  const recreateCloud = (id) => {
    setClouds((prevClouds) => {
      return [
        ...prevClouds.filter((item) => item.id !== id),
        getCloudTemplate(),
      ];
    });
  };

  return (
    <View style={s.root}>
      <View style={s.wrapper}>
        {clouds.map((item) => (
          <Cloud
            key={item.id}
            {...item}
            onAnimationComplete={() => recreateCloud(item.id)}
          />
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
