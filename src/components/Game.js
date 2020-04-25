import React, { useRef } from 'react';
import { View, StyleSheet, Vibration } from 'react-native';

import Screen from '~/components/Screen';
import Keypad from '~/components/Keypad';
import DummyKey from '~/components/DummyKey';
import { Input, InputCell } from '~/components/Input';
import History from '~/components/History';
import SupportButton from '~/components/SupportButton';
import Info from '~/components/Info';
import Finish from '~/components/Finish';

import useSetState from '~/hooks/useSetState';
import useAnimationSettings from '~/hooks/useAnimationSettings';
import { delay, measure, getSecretValue, compareResults, getEmptyUserInput } from '~/utilities';
import { KEY_MARGIN } from '~/constants/config';

const isInputFull = (values) => values.every((item) => item !== '');

const getInputIndexToDelete = (input, lockedInputs) => {
  for (let i = input.length - 1; i >= 0; i -= 1) {
    if (input[i] !== '' && !lockedInputs[i]) {
      return i;
    }
  }
};

const updateDummyKeys = (dummyKeys, newDummyKey, index) => {
  const nextDummyKeys = dummyKeys.slice();
  nextDummyKeys[index] = newDummyKey;

  return nextDummyKeys;
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
    isInfoVisible: true,
    isFinishVisible: false,
    startTime: Date.now(),
    endTime: null,
  };
};

const App = () => {
  const guessedValues = useRef(getSecretValue());
  const { toggleAnimation } = useAnimationSettings();
  const [state, setState] = useSetState(getInitialState());
  const {
    input,
    dummyKeys,
    history,
    lockedInputs,
    isInfoVisible,
    isFinishVisible,
    startTime,
    endTime,
  } = state;

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
    const nextInput = input.slice();
    nextInput[index] = key.value;

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
      async onAnimationComplete() {
        if (isInputFull(nextInput)) {
          // compare user input with guessed values
          const results = compareResults(nextInput, guessedValues.current);
          const newHistoryItem = {
            bulls: results.bulls,
            cows: results.cows,
            value: nextInput.join(''),
          };

          setState({ history: [...history, newHistoryItem] });

          // if (!results.isMatched) {
          //   return;
          // }

          await delay(1000);
          setState({
            isFinishVisible: true,
            endTime: Date.now(),
          });
        }
      },
    };

    // this should go first
    setState({ dummyKeys: updateDummyKeys(dummyKeys, newDummyKey, index) });
    setState({ input: nextInput });
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
    Vibration.vibrate(100);
  };

  const resetGame = () => {
    guessedValues.current = getSecretValue();
    setState({
      ...getInitialState(),
      isInfoVisible: false,
    });
  };

  const showInfo = () => setState({ isInfoVisible: true });
  const hideInfo = () => setState({ isInfoVisible: false });

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

      <View style={s.controls}>
        <SupportButton
          title="A"
          onPress={toggleAnimation}
        />

        <SupportButton
          title="?"
          onPress={showInfo}
        />
      </View>

      {dummyKeys.map((item, index) => item && (
        <DummyKey
          key={index}
          isLocked={lockedInputs[index]}
          onToggleLock={() => toggleDummyKeyLock(index)}
          {...item}
        />
      ))}

      {isInfoVisible && <Info onClose={hideInfo} />}

      {true && isFinishVisible &&
        <Finish
          value={guessedValues.current.join('')}
          attempts={history.length}
          startTime={startTime}
          endTime={endTime}
          onRestart={resetGame}
        />
      }
    </Screen>
  );
};

const s = StyleSheet.create({
  zone: {
    flex: 1,
    padding: 5,
    paddingBottom: 70,
  },
  controls: {
    position: 'absolute',
    bottom: 0,
  },
});

export default App;
