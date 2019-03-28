import { useState } from 'react'

type Updater<TState> = (state: TState) => Partial<TState>

export type MergeStateSetter<TState> = (
  update: Updater<TState> | Partial<TState> | null
) => void

export default function useMergeState<TState>(
  initialState: TState
): [TState, MergeStateSetter<TState>] {
  const [state, setState] = useState<TState>(initialState)

  const updater = (update: Updater<TState> | Partial<TState> | null) => {
    if (update === null) return
    if (typeof update === 'function')
      setState(state => ({ ...state, ...update(state) }))

    setState(state => ({ ...state, ...update }))
  }

  return [state, updater]
}
