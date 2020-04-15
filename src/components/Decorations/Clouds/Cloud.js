import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const Cloud = (props) => {
  const {
    source,
    delay,
    top,
    left,
    width,
    duration,
    shiftBy,
    onAnimationComplete
  } = props;

  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: shiftBy,
      easing: Easing.linear,
      duration,
      delay,
      useNativeDriver: true,
    }).start(onAnimationComplete);
  }, []);

  const rootStyles = [
    s.root,
    { top, left, width, transform: [{ translateX }] },
  ];

  return (
    <Animated.Image
      style={rootStyles}
      resizeMode="contain"
      source={source}
    />
  );
};

Cloud.propTypes = {
  source: PropTypes.number,
  delay: PropTypes.number,
  top: PropTypes.number,
  left: PropTypes.number,
  width: PropTypes.number,
  duration: PropTypes.number,
  shiftBy: PropTypes.number,
  onAnimationComplete: PropTypes.func,
};

Cloud.defaultProps = {
  source: null,
  delay: 0,
  top: 0,
  left: 0,
  width: 0,
  duration: 0,
  shiftBy: 0,
  onAnimationComplete: Function.prototype,
};

const s = StyleSheet.create({
  root: {
    position: 'absolute',
  },
});

export default Cloud;
