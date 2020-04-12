import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Key from '~/components/Key';
import { MAX_INPUT_VALUE } from '~/constants/config';

const DELETE_KEY = '«';
const CLEAR_KEY = '×';
const NUMS = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], [CLEAR_KEY, '0', DELETE_KEY]];

const Keypad = ({ disabledKeys, onPress, onDelete, onClear }) => {
  const handleKeyPress = (data) => {
    switch (data.value) {
      case DELETE_KEY:
        onDelete();
        break;

      case CLEAR_KEY:
        onClear();
        break;

      default:
        onPress(data);
    }
  };

  const isKeyDisabled = (key) => {
    if ([DELETE_KEY, CLEAR_KEY].includes(key)) {
      return false;
    }

    return disabledKeys.filter((item) => item).length === MAX_INPUT_VALUE;
  };

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
              isDisabled={isKeyDisabled(item)}
              isHidden={item === '' || disabledKeys.includes(item)}
              value={item}
              onPress={handleKeyPress}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

Keypad.propTypes = {
  disabledKeys: PropTypes.arrayOf(PropTypes.string),
  onPress: PropTypes.func,
  onDelete: PropTypes.func,
  onClear: PropTypes.func,
};

Keypad.defaultProps = {
  disabledKeys: [],
  onPress: Function.prototype,
  onDelete: Function.prototype,
  onClear: Function.prototype,
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
