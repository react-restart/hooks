import { Dispatch, SetStateAction, useCallback } from 'react'
import useMounted from './useMounted'
import { AsyncSetState } from './useStateAsync'

type StateSetter<TState> = Dispatch<SetStateAction<TState>>

/**
 * `useSafeState` takes the return value of a `useState` hook and wraps the
 * setter to prevent updates onces the component has unmounted. Can used
 * with `useMergeState` and `useStateAsync` as well
 *
 * @param state The return value of a useStateHook
 *
 * ```ts
 * const [show, setShow] = useSafeState(useState(true));
 * ```
 */
function useSafeState<TState>(
  state: [TState, AsyncSetState<TState>],
): [TState, (stateUpdate: React.SetStateAction<TState>) => Promise<void>]
function useSafeState<TState>(
  state: [TState, StateSetter<TState>],
): [TState, StateSetter<TState>]
function useSafeState<TState>(
  state: [TState, StateSetter<TState> | AsyncSetState<TState>],
): [TState, StateSetter<TState> | AsyncSetState<TState>] {
  const isMounted = useMounted()

  return [
    state[0],
    useCallback(
      (nextState: SetStateAction<TState>) => {
        if (!isMounted()) return
        return state[1](nextState)
      },
      [isMounted, state[1]],
    ),
  ]
}

export default useSafeState
