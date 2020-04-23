import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Overlay from '~/components/Overlay';
import Tooltip from '~/components/Tooltip';
import Farmer from '~/components/Farmer';
import CloseButton from '~/components/CloseButton';

const Finish = ({ value, onRestart }) => {
  return (
    <Overlay>
      <View style={s.wrapper}>
        <Farmer />

        <View style={s.information}>
          <Tooltip style={s.tooltip}>
            <ScrollView contentContainerStyle={s.area}>
              <Text style={s.title}>
                You have guessed <Text style={s.number}>{value}</Text>!
              </Text>
            </ScrollView>
          </Tooltip>
        </View>

        <View style={s.controls}>
          <CloseButton
            title="play again"
            onPress={onRestart}
          />
        </View>
      </View>
    </Overlay>
  );
};

const s = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltip: {
    marginTop: 15,
    minWidth: '100%',
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  area: {
    padding: 15,
  },
  information: {
    flex: 1,
  },
  number: {
    color: '#0074D9',
    fontWeight: 'bold',
  },
  controls: {
    marginTop: 15,
  },
});

export default Finish;
