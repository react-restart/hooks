import { useCallback, useMemo, useRef } from 'react'
import useEventCallback from './useEventCallback'
import useMounted from './useMounted'

export interface FocusManagerOptions {
  /**
   * A callback fired when focus shifts. returning `false` will prevent
   * handling the focus event
   */
  willHandle?(focused: boolean, event: React.FocusEvent): boolean | void

  /**
   * A callback fired after focus is handled but before onChange is called
   */
  didHandle?(focused: boolean, event: React.FocusEvent): void

  /**
   * A callback fired after focus has changed
   */
  onChange?(focused: boolean, event: React.FocusEvent): void

  /**
   * When true, the event handlers will not report focus changes
   */
  isDisabled: () => boolean
}

export interface FocusController {
  onBlur: (event: any) => void
  onFocus: (event: any) => void
}
/**
 * useFocusManager provides a way to track and manage focus as it moves around
 * a container element. An `onChange` is fired when focus enters or leaves the
 * element, but not when it moves around inside the element, similar to
 * `pointerenter` and `pointerleave` DOM events.
 *
 * ```tsx
 * const [focused, setFocusState] = useState(false)
 *
 * const { onBlur, onFocus } = useFocusManager({
 *   onChange: nextFocused => setFocusState(nextFocused)
 * })
 *
 * return (
 *   <div tabIndex="-1" onFocus={onFocus} onBlur={onBlur}>
 *     {String(focused)}
 *     <input />
 *     <input />
 *
 *     <button>A button</button>
 *   </div>
 * ```
 *
 * @returns a memoized FocusController containing event handlers
 */
export default function useFocusManager(
  opts: FocusManagerOptions,
): FocusController {
  const isMounted = useMounted()

  const lastFocused = useRef<boolean | undefined>()
  const handle = useRef<number | undefined>()

  const willHandle = useEventCallback(opts.willHandle)
  const didHandle = useEventCallback(opts.didHandle)
  const onChange = useEventCallback(opts.onChange)
  const isDisabled = useEventCallback(opts.isDisabled)

  const handleFocusChange = useCallback(
    (focused: boolean, event: React.FocusEvent) => {
      if (event && event.persist) event.persist()

      if (willHandle && willHandle(focused, event) === false) return

      clearTimeout(handle.current)
      handle.current = window.setTimeout(() => {
        if (focused !== lastFocused.current) {
          if (didHandle) didHandle(focused, event)

          // only fire a change when unmounted if its a blur
          if (isMounted() || !focused) {
            lastFocused.current = focused
            onChange && onChange(focused, event)
          }
        }
      })
    },
    [isMounted, willHandle, didHandle, onChange, lastFocused],
  )

  const handleBlur = useCallback(
    (event: React.FocusEvent) => {
      if (!isDisabled()) handleFocusChange(false, event)
    },
    [handleFocusChange, isDisabled],
  )

  const handleFocus = useCallback(
    (event: React.FocusEvent) => {
      if (!isDisabled()) handleFocusChange(true, event)
    },
    [handleFocusChange, isDisabled],
  )

  return useMemo(
    () => ({
      onBlur: handleBlur,
      onFocus: handleFocus,
    }),
    [handleBlur, handleFocus],
  )
}
