import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Screen from '~/components/Screen';
import Keypad from '~/components/Keypad';
import AnimatedKey from '~/components/AnimatedKey';
import { Input, InputCell } from '~/components/Input';
import History from '~/components/History';
import { measure, getSecretValue, compareResults, getGefaultUserInput } from '~/utilities';
import { KEY_MARGIN } from '~/constants/config';

const isInputFull = (values) => values.every((item) => item !== '');

const App = () => {
  const guessedValues = useRef(getSecretValue());
  const [input, setInput] = useState(getGefaultUserInput());
  const [dummyKeys, setDummyKeys] = useState([]);
  const [history, setHistory] = useState([]);

  const $cell1 = useRef();
  const $cell2 = useRef();
  const $cell3 = useRef();
  const $cell4 = useRef();

  const cells = { $cell1, $cell2, $cell3, $cell4 };

  const updateInput = async (key) => {
    if (isInputFull(input)) {
      return;
    }

    // get available cell
    const index = input.findIndex((item) => !item);

    // update input
    const nextInput = input.slice();
    nextInput[index] = key.value;
    setInput(nextInput);

    const destination = await measure(cells[`$cell${index + 1}`].current);

    const newDummmyKey = {
      value: key.value,
      shiftBy: {
        x: destination.x - key.x,
        y: destination.y - key.y,
      },
      style: {
        position: 'absolute',
        top: key.y - KEY_MARGIN,
        left: key.x - KEY_MARGIN,
      },
      onAnimationComplete() {
        if (isInputFull(nextInput)) {
          // compare user input with guessed values
          const results = compareResults(nextInput, guessedValues.current);
          const newHistoryItem = {
            bulls: results.bulls,
            cows: results.cows,
            value: nextInput.join(''),
          };

          if (!results.isMatched) {
            setHistory((prevHistory) => [...prevHistory, newHistoryItem]);
            return;
          }

          alert('You won!');
        }
      },
    };

    setDummyKeys((prevDummyKeys) => [...prevDummyKeys, newDummmyKey]);
  };

  const deleteLastNumber = () => {
    let nextDummyKeys = dummyKeys.slice();
    const dummyKeyToDelete = nextDummyKeys[nextDummyKeys.length - 1];

    if (!dummyKeyToDelete) {
      return;
    }

    dummyKeyToDelete.shiftBy = { x: 0, y: 0 };
    dummyKeyToDelete.onAnimationComplete = async () => {
      // update input
      const nextInput = input.slice();
      let index = nextInput.indexOf('') - 1;
      index = index >= 0 ? index : nextInput.length - 1;
      nextInput[index] = '';
      setInput(nextInput);

      // remove last dummy key
      nextDummyKeys = dummyKeys.slice();
      nextDummyKeys.pop();
      setDummyKeys(nextDummyKeys);
    };

    setDummyKeys(nextDummyKeys);
  };

  const clearInput = () => {
    let dummiesLeft = dummyKeys.length;

    if (!dummiesLeft) {
      return;
    }

    const nextDummyKeys = dummyKeys.slice().map((item) => ({
      ...item,
      shiftBy: { x: 0, y: 0 },
      onAnimationComplete() {
        dummiesLeft -= 1;

        if (dummiesLeft > 0) {
          return;
        }

        setInput(getGefaultUserInput());
        setDummyKeys([]);
      },
    }));


    setDummyKeys(nextDummyKeys);
  };

  const resetGame = () => {
    guessedValues.current = getSecretValue();
    setInput(getGefaultUserInput());
    setDummyKeys([]);
    setHistory([]);
  };

  useEffect(() => {
    console.log(input);
  }, [input]);

  return (
    <Screen>
      <View style={s.zone}>
        <History items={history} />
      </View>

      <Input>
        <InputCell ref={$cell1} />
        <InputCell ref={$cell2} />
        <InputCell ref={$cell3} />
        <InputCell ref={$cell4} />
      </Input>

      <Keypad
        disabledKeys={input}
        onPress={updateInput}
        onDelete={deleteLastNumber}
        onClear={clearInput}
      />


      {dummyKeys.map((item, index) => (
        <AnimatedKey
          key={index}
          {...item}
        />
      ))}
    </Screen>
  );
};

const s = StyleSheet.create({
  zone: {
    flex: 1,
    padding: 5,
    paddingBottom: 70,
  },

});

export default App;
