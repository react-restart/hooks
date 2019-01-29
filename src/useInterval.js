import { useEffect } from 'react';
import useCommittedRef from './useCommittedRef';

function useInterval(fn, paused, ms) {
  let handle;
  const fnRef = useCommittedRef(fn);
  // this ref is necessary b/c useEffect will sometimes miss a paused toggle
  // orphaning a setTimeout chain in the aether, so relying on it's refresh logic is not reliable.
  const pausedRef = useCommittedRef(paused);
  const tick = () => {
    if (pausedRef.current) return;
    fnRef.current();
    schedule(); // eslint-disable-line no-use-before-define
  };

  const schedule = () => {
    clearTimeout(handle);
    handle = setTimeout(tick, ms);
  };

  useEffect(
    () => {
      tick();
      return () => clearTimeout(handle);
    },
    [paused],
  );
}

export default useInterval;
