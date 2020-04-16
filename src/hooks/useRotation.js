import { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';
import useAnimationSettings from '~/hooks/useAnimationSettings';

const useRotation = ({ duration = 1000, isClockWise = false } = {}) => {
  const rotation = useRef(new Animated.Value(0)).current;
  const { isAnimationOn } = useAnimationSettings();

  const startAnimation = () => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };

  const toggleRotation = () => {
    if (!isAnimationOn) {
      return void rotation.stopAnimation();
    }

    rotation.setValue(0);
    startAnimation();
  };

  useEffect(() => {
    if (isAnimationOn) {
      startAnimation();
    }
  }, []);

  useEffect(() => {
    toggleRotation();
  }, [isAnimationOn]);

  const outputRange = isClockWise ? ['0deg', '360deg'] : ['360deg', '0deg'];

  return rotation.interpolate({
    inputRange: [0, 1],
    outputRange,
  });
};

export default useRotation;
