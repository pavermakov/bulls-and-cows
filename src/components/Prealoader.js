import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import useGlobalState from '~/hooks/useGlobalState';
import { getStateFromStorage } from '~/storage';

const Preloader = ({ children }) => {
  const { refreshState } = useGlobalState();

  const init = async () => {
    const state = await getStateFromStorage();

    refreshState(state);
    SplashScreen.hide();
  };

  useEffect(() => {
    init();
  }, []);

  return children;
};

export default Preloader;
