import React, { useRef, useEffect } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import colors from '~/constants/colors';
import useAnimationSettings from '~/hooks/useAnimationSettings';

const MAX_SCALE = 1.7;
const MIN_SCALE = 0.9;

const Ray = ({ rotate, isOdd }) => {
  const scaleX = useRef(new Animated.Value(isOdd ? MIN_SCALE : MAX_SCALE)).current;
  const { isAnimationOn } = useAnimationSettings();

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleX, {
          toValue: isOdd ? MAX_SCALE : MIN_SCALE,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scaleX, {
          toValue: isOdd ? MIN_SCALE : MAX_SCALE,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const toggleAnimation = () => {
    if (!isAnimationOn) {
      return void scaleX.stopAnimation();
    }

    startAnimation();
  };

  useEffect(() => {
    if (isAnimationOn) {
      startAnimation();
    }
  }, []);

  useEffect(() => {
    toggleAnimation();
  }, [isAnimationOn]);

  return (
    <View style={[s.root, { transform: [{ rotate }] }]}>
      <Animated.View style={[s.content, { transform: [{ scaleX }] }]} />
    </View>
  );
};

const s = StyleSheet.create({
  root: {
    position: 'absolute',
    width: 180,
    height: 10,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    width: 30,
    borderRadius: 25,
    backgroundColor: colors.sun,
  },
});

export default Ray;
