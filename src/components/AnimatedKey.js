import React, { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';
import Key from '~/components/Key';

const getElasticDirection = (value) => {
  const direction = Math.random() > 0.5 ? -1 : 1;

  return value * direction;
};

const AnimatedKey = (props) => {
  const {
    style,
    shiftBy = { x: 0, y: 0 },
    onAnimationComplete,
    ...rest
  } = props;

  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const rootStyles = [
    style,
    {
      transform: [{ translateX }, { translateY }],
    },
  ];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: shiftBy.x,
        easing: Easing.elastic(getElasticDirection(1.5)),
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: shiftBy.y,
        easing: Easing.elastic(1),
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(onAnimationComplete);
  }, [shiftBy]);

  return (
    <Animated.View style={rootStyles}>
      <Key
        {...rest}
        isDisabled
      />
    </Animated.View>
  );
};

export default AnimatedKey;
