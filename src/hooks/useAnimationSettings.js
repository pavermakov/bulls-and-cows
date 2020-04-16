import useGlobalState from '~/hooks/useGlobalState';

const useAnimationSettings = () => {
  const { isAnimationOn, toggleAnimation } = useGlobalState();

  return { isAnimationOn, toggleAnimation };
};

export default useAnimationSettings;
