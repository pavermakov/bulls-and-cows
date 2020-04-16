import React, { createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import useSetState from '~/hooks/useSetState';
import useInitialRender from '~/hooks/useInitialRender';
import { saveStateToStorage } from '~/storage';

export const Context = createContext();

const State = ({ children }) => {
  const [state, setState] = useSetState({ isAnimationOn: true });
  const isInitialRender = useInitialRender();

  useEffect(() => {
    if (isInitialRender) return;

    saveStateToStorage(state);
  }, [state]);

  const toggleAnimation = () => {
    setState({ isAnimationOn: !state.isAnimationOn });
  };

  const refreshState = (nextState = {}) => {
    setState(nextState);
  };

  const value = {
    ...state,
    toggleAnimation,
    refreshState,
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

State.propTypes = {
  children: PropTypes.node.isRequired,
}

export default State;
