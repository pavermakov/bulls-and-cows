import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CloseButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={s.root}
      onPress={onPress}
    >
      <Text style={s.text}>
        close
      </Text>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  root: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 30,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'white',
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
});

export default CloseButton;
