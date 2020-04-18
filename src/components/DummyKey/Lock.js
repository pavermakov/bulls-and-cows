import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';

const Lock = ({ isHandleVisible }) => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: isHandleVisible ? -25 : 0,
      easing: Easing.elastic(1.5),
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isHandleVisible]);

  const handleStyles = [
    s.handle,
    { transform: [{ translateY }] },
  ];

  return (
    <View style={s.root}>
      <Animated.View style={handleStyles} />
    </View>
  );
};

const s = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  handle: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: 'grey',
    borderWidth: 8,
  },
});

export default Lock;
