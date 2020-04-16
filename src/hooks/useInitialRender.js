import { useRef, useEffect } from 'react';

const useInitialRender = () => {
  const isInitialRender = useRef(true);

  useEffect(() => {
    isInitialRender.current = false;
  }, []);

  return isInitialRender.current;
};

export default useInitialRender;
