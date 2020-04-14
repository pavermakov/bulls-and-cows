import { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';

const useRotation = ({ duration = 1000, isClockWise = false } = {}) => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
  }, []);

  const outputRange = isClockWise ? ['0deg', '360deg'] : ['360deg', '0deg'];

  return rotation.interpolate({
    inputRange: [0, 1],
    outputRange,
  });
};

export default useRotation;
