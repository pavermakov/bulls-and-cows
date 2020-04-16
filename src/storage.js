/* eslint-disable no-console */
import AsyncStorage from '@react-native-community/async-storage';

const KEYS = {
  STATE: 'STATE',
};

export const saveStateToStorage = async (value) => {
  try {
    await AsyncStorage.setItem(KEYS.STATE, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
};


export const getStateFromStorage = async () => {
  try {
    const value = await AsyncStorage.getItem(KEYS.STATE);
    return JSON.parse(value);
  } catch (e) {
    console.error(e);
  }
};
