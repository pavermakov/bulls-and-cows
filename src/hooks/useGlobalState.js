import { useContext } from 'react';
import { Context } from '~/State';

const useGlobalState = () => {
  const state = useContext(Context);

  return state;
};

export default useGlobalState;
