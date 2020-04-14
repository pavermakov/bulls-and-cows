import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import Ray from '~/components/Decorations/Ray';
import useRotation from '~/hooks/useRotation';
import { renderTimes } from '~/utilities';
import colors from '~/constants/colors';
import { RAYS_COUNT } from '~/constants/config';

const getAngle = (value) => {
  return (360 / RAYS_COUNT) * value;
};

const Sun = ({ style }) => {
  const rotate = useRotation({ duration: 70000, isClockWise: true });
  const rootStyles = [s.root, style, { transform: [{ rotate }] }];

  return (
    <Animated.View style={rootStyles}>
      <View style={s.base} />

      <View style={s.rays}>
        {renderTimes(RAYS_COUNT, (item, index) => (
          <Ray
            key={index}
            isOdd={index % 2 !== 0}
            rotate={`${getAngle(index)}deg`}
          />
        ))}
      </View>
    </Animated.View>
  );
};

const s = StyleSheet.create({
  root: {
    position: 'relative',
  },
  base: {
    width: 80,
    height: 80,
    backgroundColor: colors.sun,
    borderRadius: 50,
  },
  rays: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Sun;
