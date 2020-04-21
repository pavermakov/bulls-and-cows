import React, { useRef, useEffect } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Key from '~/components/Key';
import Lock from './Lock';

const getElasticDirection = (value) => {
  const direction = Math.random() > 0.5 ? -1 : 1;

  return value * direction;
};

const DummyKey = (props) => {
  const {
    style,
    shiftBy,
    isLocked,
    onToggleLock,
    onAnimationComplete,
    ...rest
  } = props;

  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const rootStyles = [
    s.root,
    style,
    { transform: [{ translateX }, { translateY }] },
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
      <Lock isHandleVisible={isLocked} />

      <Key
        {...rest}
        activeOpacity={1}
        onLongPress={onToggleLock}
      />
    </Animated.View>
  );
};

DummyKey.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.number,
  ]),

  shiftBy: PropTypes.exact({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),

  isLocked: PropTypes.bool,
  onAnimationComplete: PropTypes.func,
  onToggleLock: PropTypes.func,
};

DummyKey.defaultProps = {
  style: null,
  shiftBy: { x: 0, y: 0 },
  isLocked: false,
  onAnimationComplete: Function.prototype,
  onToggleLock: Function.prototype,
};

const s = StyleSheet.create({
  root: {
    // just for extra safety
    position: 'absolute',
    left: -500,
  },
});

export default DummyKey;
