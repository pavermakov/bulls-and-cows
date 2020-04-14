import React, { useRef, useEffect } from 'react';
import { View, Text, Animated, Image, StyleSheet } from 'react-native';
import files from '~/constants/files';

const HistoryItem = ({ value, bulls, cows }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const rootStyles = [
    s.root,
    {
      opacity,
      transform: [{ translateY }],
    },
  ];

  return (
    <Animated.View style={rootStyles}>
      <Text style={[s.text, s.textSpaced]}>
        {value}
      </Text>

      <View style={s.counter}>
        <Image
          style={s.icon}
          source={files.bull}
        />

        <Text style={s.text}>
          {`× ${bulls}`}
        </Text>
      </View>

      <View style={s.counter}>
        <Image
          style={s.icon}
          source={files.cow}
        />

        <Text style={s.text}>
          {`× ${cows}`}
        </Text>
      </View>
    </Animated.View>
  );
};

const s = StyleSheet.create({
  root: {
    paddingVertical: 5,
    flexDirection: 'row',
    borderBottomColor: 'rgba(0, 0, 0, 0.7)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textSpaced: {
    letterSpacing: 2,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default HistoryItem;
