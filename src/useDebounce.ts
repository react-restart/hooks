import { useState, useEffect } from "react";
import useTimeout from "./useTimeout";

/**
 * This hook allows you to debounce any fast changing value. The debounced
 * value will only reflect the latest value when the useDebounce hook has not
 * been called for the specified time period.
 *
 * @param value a value to debounce
 * @param ms The milliseconds duration duration to debounce the value
 */
export default function useDebounce<V extends any>(value: V, delay: number): V {
  const [debouncedValue, setDebouncedValue] = useState(value);

  const timeout = useTimeout();

  useEffect(() => {
    timeout.set(() => {
      setDebouncedValue(value);
    }, delay);
  }, [value, delay]);

  return debouncedValue;
}
