import React from 'react';
import { View, StyleSheet } from 'react-native';
import Key from '~/components/Key';

const DELETE_KEY = '<';
const NUMS = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['', '0', DELETE_KEY]];

const Keypad = ({ disabledKeys, onPress, onDelete }) => {
  return (
    <View style={s.root}>
      {NUMS.map((row, index) => (
        <View
          key={index}
          style={s.row}
        >
          {row.map((item) => (
            <Key
              key={item}
              isHidden={item === '' || disabledKeys.includes(item)}
              value={item}
              onPress={item === DELETE_KEY ? onDelete : onPress}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const s = StyleSheet.create({
  root: {
    paddingBottom: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Keypad;
