import { DependencyList, useRef, EffectCallback } from 'react'
import useStableMemo from './useStableMemo.js'
import useWillUnmount from './useWillUnmount.js'

/**
 * An _immediate_ effect that runs an effect callback when its dependency array
 * changes. This is helpful for updates should must run during render, most
 * commonly state derived from props; a more ergonomic version of https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-getderivedstatefromprops
 *
 * ```ts
 * function Example({ value }) {
 *   const [intermediaryValue, setValue] = useState(value);
 *
 *   useUpdateImmediateEffect(() => {
 *     setValue(value)
 *   }, [value])
 * ```
 *
 * @category effects
 */
function useUpdateImmediateEffect(
  effect: EffectCallback,
  deps: DependencyList,
) {
  const firstRef = useRef(true)
  const tearDown = useRef<ReturnType<EffectCallback>>(undefined)

  useWillUnmount(() => {
    if (tearDown.current) tearDown.current()
  })

  useStableMemo(() => {
    if (firstRef.current) {
      firstRef.current = false
      return
    }

    if (tearDown.current) tearDown.current()
    tearDown.current = effect()
  }, deps)
}

export default useUpdateImmediateEffect
