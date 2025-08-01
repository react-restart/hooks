import { RefCallback, useMemo, version } from 'react'

const isReact19 = parseInt(version.split('.')[0]!, 10) >= 19

type CallbackRef<T> = (ref: T | null) => void
type Ref<T> = React.MutableRefObject<T> | CallbackRef<T>

function toFnRef<T>(ref?: Ref<T> | null) {
  if (!ref || typeof ref === 'function') {
    return ref
  }

  return (value: T | null) => {
    ref.current = value as T
  }
}

function cleanUp<T>(cleanup: unknown, ref: RefCallback<T> | null | undefined) {
  if (typeof cleanup === 'function') {
    cleanup()
  } else if (ref) {
    ref(null)
  }
}

export function mergeRefs<T>(refA?: Ref<T> | null, refB?: Ref<T> | null) {
  const refASetter = toFnRef(refA)
  const refBSetter = toFnRef(refB)

  return (value: T | null) => {
    const cleanupA = refASetter?.(value)
    const cleanupB = refBSetter?.(value)

    if (isReact19) {
      return () => {
        cleanUp(cleanupA, refASetter)
        cleanUp(cleanupB, refBSetter)
      }
    }
  }
}

/**
 * Create and returns a single callback ref composed from two other Refs.
 *
 * ```tsx
 * const Button = React.forwardRef((props, ref) => {
 *   const [element, attachRef] = useCallbackRef<HTMLButtonElement>();
 *   const mergedRef = useMergedRefs(ref, attachRef);
 *
 *   return <button ref={mergedRef} {...props}/>
 * })
 * ```
 *
 * @param refA A Callback or mutable Ref
 * @param refB A Callback or mutable Ref
 * @category refs
 */
function useMergedRefs<T>(
  refA?: Ref<T | null> | null,
  refB?: Ref<T | null> | null,
) {
  return useMemo(() => mergeRefs(refA, refB), [refA, refB])
}

export default useMergedRefs
