import React from 'react';
import State from '~/State';
import Preloader from '~/components/Prealoader';
import Game from '~/components/Game';

export default () => {
  return (
    <>
      {/* <StatusBar
        translucent
        backgroundColor="transparent"
      /> */}

      <State>
        <Preloader>
          <Game />
        </Preloader>
      </State>
    </>
  );
};
