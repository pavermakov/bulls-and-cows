import React, { useEffect, useRef } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Screen from '~/components/Screen';
import Keypad from '~/components/Keypad';
import DummyKey from '~/components/DummyKey';
import { Input, InputCell } from '~/components/Input';
import History from '~/components/History';
import useSetState from '~/hooks/useSetState';
import useAnimationSettings from '~/hooks/useAnimationSettings';
import { measure, getSecretValue, compareResults, getEmptyUserInput } from '~/utilities';
import { KEY_MARGIN } from '~/constants/config';

const isInputFull = (values) => values.every((item) => item !== '');

const getInputIndexToDelete = (input, lockedInputs) => {
  for (let i = input.length - 1; i >= 0; i -= 1) {
    if (input[i] !== '' && !lockedInputs[i]) {
      return i;
    }
  }
};

const getInitialState = () => {
  const input = getEmptyUserInput();
  const lockedInputs = input.map(() => false);
  const dummyKeys = input.map(() => null);

  return {
    input,
    lockedInputs,
    dummyKeys,
    history: [],
  };
};

const updateDummyKeys = (dummyKeys, newDummyKey, index) => {
  const nextDummyKeys = dummyKeys.slice();
  nextDummyKeys[index] = newDummyKey;

  return nextDummyKeys;
};

const App = () => {
  const guessedValues = useRef(getSecretValue());
  const { toggleAnimation } = useAnimationSettings();
  const [{ input, dummyKeys, history, lockedInputs }, setState] = useSetState(getInitialState());

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
    setState({ input: nextInput });

    const destination = await measure(cells[`$cell${index + 1}`].current);

    const newDummyKey = {
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
            setState({ history: [...history, newHistoryItem] });
            return;
          }

          alert('You won!');
        }
      },
    };

    setState({ dummyKeys: updateDummyKeys(dummyKeys, newDummyKey, index) });
  };

  const deleteInput = () => {
    const nextInput = input.slice();
    const indexToDelete = getInputIndexToDelete(nextInput, lockedInputs);

    if (indexToDelete === undefined) {
      return;
    }

    const nextDummyKeys = dummyKeys.slice();
    const dummyKeyToDelete = nextDummyKeys[indexToDelete];

    dummyKeyToDelete.shiftBy = { x: 0, y: 0 };
    dummyKeyToDelete.onAnimationComplete = async () => {
      // update input
      nextInput[indexToDelete] = '';
      setState({ input: nextInput });

      // remove last dummy key
      nextDummyKeys[indexToDelete] = null;
      setState({ dummyKeys: nextDummyKeys });
    };

    setState({ dummyKeys: nextDummyKeys });
  };

  const clearInput = () => {
    let nextDummyKeys = dummyKeys.slice();
    let itemsToDelete = nextDummyKeys.filter((item, index) => {
      return item && !lockedInputs[index];
    }).length;

    if (!itemsToDelete) {
      return;
    }

    nextDummyKeys = dummyKeys.map((item, index) => {
      if (!item || lockedInputs[index]) {
        return item;
      }

      return {
        ...item,
        shiftBy: { x: 0, y: 0 },
        onAnimationComplete() {
          itemsToDelete -= 1;

          if (itemsToDelete > 0) {
            return;
          }

          const nextInput = input.map((inputItem, inputIndex) => {
            return lockedInputs[inputIndex] ? inputItem : '';
          });

          nextDummyKeys = nextDummyKeys.map((dummyKeyItem, dummyKeyIndex) => {
            return lockedInputs[dummyKeyIndex] ? dummyKeyItem : null;
          });

          setState({
            input: nextInput,
            dummyKeys: nextDummyKeys,
          });
        },
      };
    });


    setState({ dummyKeys: nextDummyKeys });
  };

  const toggleDummyKeyLock = (index) => {
    const nextLockedInputs = lockedInputs.slice();
    nextLockedInputs[index] = !nextLockedInputs[index];

    setState({ lockedInputs: nextLockedInputs });
  };

  const resetGame = () => {
    guessedValues.current = getSecretValue();
    setState(getInitialState());
  };

  useEffect(() => {
    console.log(lockedInputs);
  }, [lockedInputs]);

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
        onDelete={deleteInput}
        onClear={clearInput}
      />

      <Button
        title="toggle animations"
        onPress={toggleAnimation}
      />

      {dummyKeys.map((item, index) => item && (
        <DummyKey
          key={index}
          isLocked={lockedInputs[index]}
          onToggleLock={() => toggleDummyKeyLock(index)}
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
