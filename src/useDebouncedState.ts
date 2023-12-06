import { useState, Dispatch, SetStateAction } from 'react'
import useDebouncedCallback, {
  UseDebouncedCallbackOptions,
} from './useDebouncedCallback'

/**
 * Similar to `useState`, except the setter function is debounced by
 * the specified delay.
 *
 * ```ts
 * const [value, setValue] = useDebouncedState('test', 500)
 *
 * setValue('test2')
 * ```
 *
 * @param initialState initial state value
 * @param delayOrOptions The milliseconds delay before a new value is set, or options object
 */
export default function useDebouncedState<T>(
  initialState: T,
  delayOrOptions: number | UseDebouncedCallbackOptions,
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState(initialState)
  const debouncedSetState = useDebouncedCallback<Dispatch<SetStateAction<T>>>(
    setState,
    delayOrOptions,
  )
  return [state, debouncedSetState]
}
