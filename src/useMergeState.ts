import { useState } from 'react'

type Updater<TState> = (state: TState) => Partial<TState> | null

export type MergeStateSetter<TState> = (
  update: Updater<TState> | Partial<TState> | null
) => void

export default function useMergeState<TState extends {}>(
  initialState: TState
): [TState, MergeStateSetter<TState>] {
  const [state, setState] = useState<TState>(initialState)

  const updater = (update: Updater<TState> | Partial<TState> | null) => {
    if (update === null) return
    if (typeof update === 'function')
      setState(state => {
        const nextState = update(state)
        return nextState == null ? state : { ...state, ...nextState }
      })

    setState(state => ({ ...state, ...update }))
  }

  return [state, updater]
}
