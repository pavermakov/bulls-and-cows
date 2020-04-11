import React, { useRef } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '~/constants/colors';
import { measure } from '~/utilities';

const Key = ({ style, value, isDisabled, isHidden, onPress }) => {
  const ref = useRef();

  const handler = async () => {
    const { x, y } = await measure(ref.current);
    onPress({ value, x, y });
  };

  return (
    <TouchableOpacity
      ref={ref}
      style={[s.root, isHidden && s.hidden, style]}
      disabled={isDisabled || isHidden}
      onPress={handler}
    >
      <Text style={s.text}>
        {value}
      </Text>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.crimson,
    width: 50,
    height: 50,
    borderRadius: 5,
    margin: 5,
  },
  hidden: {
    transform: [{ scale: 0 }],
  },
  text: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Key;
