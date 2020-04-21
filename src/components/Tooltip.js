import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '~/constants/colors';

const Tooltip = ({ style, children }) => {
  return (
    <View style={[s.root, style]}>
      <View style={s.arrow} />

      <View style={s.wrapper}>
        {children}
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  root: {
    position: 'relative',
    width: '100%',
    borderColor: 'grey',
    borderWidth: 5,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  wrapper: {
    backgroundColor: colors.white,
    borderRadius: 12,
    minHeight: 50,
  },
  arrow: {
    position: 'absolute',
    left: 50,
    transform: [{ rotate: '45deg' }, { translateY: -20 }],
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 5,
  },
});

export default Tooltip;
