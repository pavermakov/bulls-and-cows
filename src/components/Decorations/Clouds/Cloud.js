import React, { useState, useEffect, useRef } from 'react';
import { Animated, Easing, Dimensions, StyleSheet } from 'react-native';
import { getRandomItemFromList, getRandomNumberFromRange } from '~/utilities';
import files from '~/constants/files';

const { width, height } = Dimensions.get('window');

const DIRECTIONS = {
  TO_EAST: 'TO_EAST',
  TO_WEST: 'TO_WEST',
};

// hand-picked values
const startPoints = {
  [DIRECTIONS.TO_EAST]: 0,
  [DIRECTIONS.TO_WEST]: width - 100,
};

const endPoints = {
  [DIRECTIONS.TO_EAST]: width,
  [DIRECTIONS.TO_WEST]: width,
};

const getDefaultPosition = (direction) => {
  return startPoints[direction];
};

const generateCloudData = () => {
  const id = Math.random();
  const source = getRandomItemFromList(files.clouds);
  const scale = getRandomNumberFromRange({ min: 0.5, max: 1.5 });
  const scaleX = id > 0.5 ? 1 : -1;
  const speed = getRandomNumberFromRange({ min: 4000, max: 5000, isInt: true });

  const direction = id > 0.5 ? DIRECTIONS.TO_EAST : DIRECTIONS.TO_WEST;
  const x = startPoints[direction];
  const y = getRandomNumberFromRange({ min: 0, max: Math.round(height * 0.7), isInt: true });
  const shiftBy = endPoints[direction];

  return {
    id,
    source,
    scale,
    scaleX,
    direction,
    speed,
    x,
    y,
    shiftBy,
  };
};

const initialState = generateCloudData();

const Cloud = () => {
  // const [data, resetData] = useState(initialState);
  // console.log(data)
  // const { id, source, scale, scaleX, x, y, speed, shiftBy } = data;
  const [id, setId] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log('running useEffect');

    Animated.sequence([
      Animated.timing(translateX, {
        toValue: width,
        easing: Easing.linear,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: 0,
        easing: Easing.linear,
        duration: 1000,
        useNativeDriver: true,
      }),
    ])
      .start(({ finished }) => {
        console.log('animation completed', finished);
        // resetData({ id: Math.random() });
        setId(Math.random());
      });
  }, [id]);

  const rootStyles = [
    s.root,
    { top: 0, left: 0, transform: [{ translateX }] },
  ];

  return (
    <Animated.Image
      style={rootStyles}
      source={files.clouds[0]}
    />
  );
};

const s = StyleSheet.create({
  root: {
    position: 'absolute',
  },
});

export default Cloud;
