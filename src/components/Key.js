import React, { useRef } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import colors from '~/constants/colors';
import { measure } from '~/utilities';
import { KEY_MARGIN } from '~/constants/config';

const getPosition = async (el, cache) => {
  let position = cache;

  if (!position) {
    const { x, y } = await measure(el);
    position = { x, y };
  }

  return position;
};

const Key = (props) => {
  const { style, value, isDisabled, isHidden, onPress, onLongPress } = props;
  const $el = useRef();
  const cachedPosition = useRef(null);

  const onPressHandler = async () => {
    const position = await getPosition($el.current, cachedPosition.current);
    onPress({ value, ...position });

    if (!cachedPosition.current) {
      cachedPosition.current = position;
    }
  };

  return (
    <TouchableOpacity
      ref={$el}
      style={[s.root, isHidden && s.hidden, style]}
      disabled={isDisabled || isHidden}
      onPress={onPressHandler}
      onLongPress={onLongPress}
    >
      <Text style={s.text}>
        {value}
      </Text>
    </TouchableOpacity>
  );
};

Key.propTypes = {
  value: PropTypes.string.isRequired,

  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.number,
  ]),

  isDisabled: PropTypes.bool,
  isHidden: PropTypes.bool,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
};

Key.defaultProps = {
  style: null,
  isDisabled: false,
  isHidden: false,
  onPress: Function.prototype,
  onLongPress: Function.prototype,
};

const s = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.crimson,
    width: 50,
    height: 50,
    borderRadius: 5,
    margin: KEY_MARGIN,
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
