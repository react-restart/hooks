import { delay } from 'lodash'
import { useEffect, useDebugValue } from 'react'
import useDebouncedState from './useDebouncedState'

/**
 * Debounce a value change by a specified number of milliseconds. Useful
 * when you want need to trigger a change based on a value change, but want
 * to defer changes until the changes reach some level of infrequency.
 *
 * @param value
 * @param delayMs
 * @returns
 */
function useDebouncedValue<TValue>(value: TValue, delayMs = 500): TValue {
  const [debouncedValue, setDebouncedValue] = useDebouncedState(value, delayMs)

  useDebugValue(debouncedValue)

  useEffect(() => {
    setDebouncedValue(value)
  }, [value, delayMs])

  return debouncedValue
}

export default useDebouncedValue
