import { useRef } from 'react'

const dft: any = Symbol('default value sigil')

/**
 * Exactly the same as `useRef` except that the initial value is set via a
 * factroy function. Useful when the default is relatively costly to construct.
 *
 *  ```ts
 *  const ref = useRefWithInitialValueFactory<ExpensiveValue>(() => constructExpensiveValue())
 *
 *  ```
 *
 * @param initialValueFactory A factory function returning the ref's default value
 * @category refs
 */
export default function useRefWithInitialValueFactory<T>(
  initialValueFactory: () => T,
) {
  const ref = useRef<T>(dft)
  if (ref.current === dft) {
    ref.current = initialValueFactory()
  }
  return ref
}
