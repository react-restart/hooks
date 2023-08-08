import { useState, DependencyList } from 'react'

/** 
 * Allows user to reset or adjust the state on a prop change.
 * Functions similar to React's `useState`,
 * but re-evaluates the state whenever the dependency array encounters a change.
 * 
 * Source: https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
 *
 * ```js
 * const [state, setState] = useStateFromProps(()=>propCount, [propCount])
 *
 * ```
 *
 * @param reducer The props to state evaluation function
 */
export default function useStateFromProps<TState = unknown>(
  reducer: (state: TState | null) =>  TState,
  deps: DependencyList
): [TState, (state: TState | null) => void] {
  const [state, setState] = useState<TState>(() => reducer(null));
  const [prevDeps, setPrevDeps] = useState<DependencyList>(deps);

  const isDepsLengthChanged = !prevDeps || prevDeps.length !== deps.length;
  const isDepsChanged =
    isDepsLengthChanged || deps.some((prop, pIdx) => prop !== prevDeps[pIdx]);

  if (isDepsChanged) {
    setPrevDeps(deps);
    setState((prevState) => reducer(prevState));
  }

  return [state, setState];
}
