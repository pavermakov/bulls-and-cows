import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Overlay from '~/components/Overlay';
import Tooltip from '~/components/Tooltip';
import Farmer from '~/components/Farmer';
import CloseButton from '~/components/CloseButton';

const Info = ({ onClose }) => {
  return (
    <Overlay>
      <View style={s.wrapper}>
        <Farmer />

        <View style={s.information}>
          <Tooltip style={s.tooltip}>
            <ScrollView contentContainerStyle={s.area}>
              <Text style={s.title}>Thank you for playing!</Text>

              <Text style={s.description}>
                In the classic game, I've guess a 4-digit secret number, and you need to find
                it. After each guess, I will tells you how many "bulls" and how many "cows" are in
                your guess, interpreted as:

                {'\n\n'}

                - Each bull indicates a digit in your guess that exactly matches the value and
                position of a digit in my secret number.

                {'\n\n'}

                - Each cow indicates a digit in your guess that matches the value of a digit in
                my secret number, but is in the wrong position.

                {'\n\n'}

                So for example, if the secret number is
                <Text style={s.number}> 1234 </Text>
                and you guess
                <Text style={s.number}> 5678</Text>
                , your guess has
                <Text style={s.number}> 0 </Text>
                bulls and
                <Text style={s.number}> 0 </Text>
                cows. However, if you guess
                <Text style={s.number}> 2354 </Text>
                then your guess has
                <Text style={s.number}> 1 </Text>
                bull (the
                <Text style={s.number}> 4</Text>
                ) and
                <Text style={s.number}> 2 </Text>
                cows (the
                <Text style={s.number}> 2 </Text>
                and
                <Text style={s.number}> 3</Text>
                ).

                {'\n\n'}

                You will be given a series of guesses along with the number of bulls and cows in
                each guess. Your job is to determine the secret number based on the given
                information.
              </Text>
            </ScrollView>
          </Tooltip>
        </View>

        <View style={s.controls}>
          <CloseButton
            title="close"
            onPress={onClose}
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
  information: {
    flex: 1,
  },
  area: {
    padding: 15,
  },
  description: {
    fontSize: 18,
    lineHeight: 25,
  },
  number: {
    fontSize: 20,
    color: '#0074D9',
    fontWeight: 'bold',
  },
  controls: {
    marginTop: 15,
  },
});

export default Info;
