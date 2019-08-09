import useMergeState, { MergeStateSetter } from './useMergeState'

type Mapper<TProps, TState> = (
  props: TProps,
  state: TState,
) => null | Partial<TState>

export default function useMergeStateFromProps<TProps, TState>(
  props: TProps,
  gDSFP: Mapper<TProps, TState>,
  initialState: TState,
): [TState, MergeStateSetter<TState>] {
  const [state, setState] = useMergeState<TState>(initialState)

  const nextState = gDSFP(props, state)

  if (nextState !== null) setState(nextState)

  return [state, setState]
}
