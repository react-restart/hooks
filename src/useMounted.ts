import { useRef, useEffect } from 'react';

export default function useMounted() {
  const mounted = useRef(true);
  useEffect(
    () => () => {
      mounted.current = false;
    },
    [],
  );
  return () => mounted.current;
}
