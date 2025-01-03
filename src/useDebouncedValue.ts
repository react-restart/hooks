import { useEffect, useDebugValue, useRef } from 'react'
import useDebouncedState from './useDebouncedState.js'
import { UseDebouncedCallbackOptions } from './useDebouncedCallback.js'

const defaultIsEqual = (a: any, b: any) => a === b

export type UseDebouncedValueOptions = UseDebouncedCallbackOptions & {
  isEqual?: (a: any, b: any) => boolean
}

/**
 * Debounce a value change by a specified number of milliseconds. Useful
 * when you want need to trigger a change based on a value change, but want
 * to defer changes until the changes reach some level of infrequency.
 *
 * @param value
 * @param waitOrOptions
 * @returns
 */
function useDebouncedValue<TValue>(
  value: TValue,
  waitOrOptions: number | UseDebouncedValueOptions = 500,
): TValue {
  const previousValueRef = useRef<TValue | null>(value)

  const isEqual =
    typeof waitOrOptions === 'object'
      ? waitOrOptions.isEqual || defaultIsEqual
      : defaultIsEqual

  const [debouncedValue, setDebouncedValue] = useDebouncedState(
    value,
    waitOrOptions,
  )

  useDebugValue(debouncedValue)

  useEffect(() => {
    if (!isEqual || !isEqual(previousValueRef.current, value)) {
      previousValueRef.current = value
      setDebouncedValue(value)
    }
  })

  return debouncedValue
}

export default useDebouncedValue
