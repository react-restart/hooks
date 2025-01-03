import { useCallback, useMemo, useRef } from 'react'
import useEventCallback from './useEventCallback.js'
import useMounted from './useMounted.js'

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

  const lastFocused = useRef<boolean | undefined>(undefined)
  const handle = useRef<number | undefined>(undefined)

  const willHandle = useEventCallback(opts.willHandle)
  const didHandle = useEventCallback(opts.didHandle)
  const onChange = useEventCallback(opts.onChange)
  const isDisabled = useEventCallback(opts.isDisabled)

  const handleChange = useCallback(
    (focused: boolean, event: React.FocusEvent) => {
      if (focused !== lastFocused.current) {
        didHandle?.(focused, event)

        // only fire a change when unmounted if its a blur
        if (isMounted() || !focused) {
          lastFocused.current = focused
          onChange?.(focused, event)
        }
      }
    },
    [isMounted, didHandle, onChange, lastFocused],
  )

  const handleFocusChange = useCallback(
    (focused: boolean, event: React.FocusEvent) => {
      if (isDisabled()) return
      if (event && event.persist) event.persist()

      if (willHandle?.(focused, event) === false) {
        return
      }
      clearTimeout(handle.current)

      if (focused) {
        handleChange(focused, event)
      } else {
        handle.current = window.setTimeout(() => handleChange(focused, event))
      }
    },
    [willHandle, handleChange],
  )

  return useMemo(
    () => ({
      onBlur: (event: React.FocusEvent) => {
        handleFocusChange(false, event)
      },
      onFocus: (event: React.FocusEvent) => {
        handleFocusChange(true, event)
      },
    }),
    [handleFocusChange],
  )
}
