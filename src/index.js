import React from 'react';
import State from '~/State';
import Preloader from '~/components/Prealoader';
import Game from '~/components/Game';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default () => {
  return (
    <>
      {/* <StatusBar
        translucent
        backgroundColor="transparent"
      /> */}

      <SafeAreaProvider>
        <State>
          <Preloader>
            <Game />
          </Preloader>
        </State>
      </SafeAreaProvider>
    </>
  );
};
