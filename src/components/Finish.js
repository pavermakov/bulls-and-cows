import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Overlay from '~/components/Overlay';
import Tooltip from '~/components/Tooltip';
import Farmer from '~/components/Farmer';
import CloseButton from '~/components/CloseButton';

const formatTime = (startTime, endTime) => {
  const duration = endTime - startTime;
  const minutes = Math.floor(duration / 60000);
  const seconds = ((duration % 60000) / 1000).toFixed(0);

  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const Finish = ({ value, startTime, endTime, attempts, onRestart }) => {

  return (
    <Overlay>
      <View style={s.wrapper}>
        <Farmer />

        <View style={s.information}>
          <Tooltip style={s.tooltip}>
            <ScrollView contentContainerStyle={s.area}>
              <Text style={s.title}>
                You have guessed <Text style={s.number}>{value}</Text> in:
              </Text>

              <Text style={s.subtitle}>
                {attempts} attempts
              </Text>

              <Text style={s.subtitle}>
                {formatTime(startTime, endTime)}
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

Finish.propTypes = {
  value: PropTypes.string.isRequired,
  attempts: PropTypes.number.isRequired,
  startTime: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired,
  onRestart: PropTypes.func.isRequired,
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
    fontSize: 22,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 22,
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
