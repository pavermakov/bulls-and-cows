import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Screen from '~/components/Screen';
import Keypad from '~/components/Keypad';
import AnimatedKey from '~/components/AnimatedKey';
import { Input, InputCell } from '~/components/Input';
import { measure, delay } from '~/utilities';

const MAX_NUM = 4;

const App = () => {
  const [input, setInput] = useState(['', '', '', '']);
  const [dummyKeys, setDummyKeys] = useState([]);

  const $cell1 = useRef();
  const $cell2 = useRef();
  const $cell3 = useRef();
  const $cell4 = useRef();

  const cells = { $cell1, $cell2, $cell3, $cell4 };
  const isMax = input.every((item) => item !== '');

  const updateInput = async (key) => {
    if (isMax) {
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
        top: key.y - 5,
        left: key.x - 5,
      },
    };

    setDummyKeys([...dummyKeys, newDummmyKey]);
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

  useEffect(() => {
    console.log(input);
  }, [input]);

  return (
    <Screen>
      <View style={s.zone} />

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
  },

});

export default App;
