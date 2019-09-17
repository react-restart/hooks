import React, { useCallback, useEffect, useRef, useState } from 'react'

type Updater<TState> = (state: TState) => TState

export type AsyncSetState<TState> = (
  stateUpdate: React.SetStateAction<TState>,
) => Promise<TState>

export const useAsyncSetState = <TState>(
  initialState: TState,
): [TState, AsyncSetState<TState>] => {
  const [state, setState] = useState(initialState)
  const resolvers = useRef<((state: TState) => void)[]>([])

  useEffect(() => {
    resolvers.current.forEach(resolve => resolve(state))
    resolvers.current = []
  }, [state])

  const setStateAsync = useCallback(
    (update: Updater<TState> | TState) => {
      return new Promise<TState>((resolve, reject) => {
        setState(stateBefore => {
          try {
            let nextState: TState
            if (typeof update === 'function') {
              // @ts-ignore This isn't a Function
              nextState = update(stateBefore)
            } else {
              nextState = update
            }

            // If state does not change, we must resolve the promise because
            // react won't re-render and effect will not resolve
            if (nextState === stateBefore) {
              resolve(nextState)
            } else {
              resolvers.current.push(resolve)
            }
            return nextState
          } catch (e) {
            reject(e)
            throw e
          }
        })
      })
    },
    [setState],
  )
  return [state, setStateAsync]
}
