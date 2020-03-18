import {
  DependencyList,
  EffectCallback,
  useRef,
  useEffect,
  useDebugValue,
} from 'react'
import useWillUnmount from './useWillUnmount'
import useMounted from './useMounted'

export type EffectHook = (effect: EffectCallback, deps?: DependencyList) => void

export type IsEqual<TDeps extends DependencyList> = (
  nextDeps: TDeps,
  prevDeps: TDeps,
) => boolean

export type CustomEffectOptions<TDeps extends DependencyList> = {
  isEqual: IsEqual<TDeps>
  effectHook?: EffectHook
}

type CleanUp = {
  (): void
  cleanup?: ReturnType<EffectCallback>
}

/**
 * a useEffect() hook with customized depedency comparision
 *
 * @param effect The effect callback
 * @param dependencies A list of dependencies
 * @param isEqual A function comparing the next and previous dependencyLists
 */
function useCustomEffect<TDeps extends DependencyList = DependencyList>(
  effect: EffectCallback,
  dependencies: TDeps,
  isEqual: IsEqual<TDeps>,
): void
/**
 * a useEffect() hook with customized depedency comparision
 *
 * @param effect The effect callback
 * @param dependencies A list of dependencies
 * @param options
 * @param options.isEqual A function comparing the next and previous dependencyLists
 * @param options.effectHook the underlying effect hook used, defaults to useEffect
 */
function useCustomEffect<TDeps extends DependencyList = DependencyList>(
  effect: EffectCallback,
  dependencies: TDeps,
  options: CustomEffectOptions<TDeps>,
): void
function useCustomEffect<TDeps extends DependencyList = DependencyList>(
  effect: EffectCallback,
  dependencies: TDeps,
  isEqualOrOptions: IsEqual<TDeps> | CustomEffectOptions<TDeps>,
) {
  const isMounted = useMounted()
  const { isEqual, effectHook = useEffect } =
    typeof isEqualOrOptions === 'function'
      ? { isEqual: isEqualOrOptions }
      : isEqualOrOptions

  const dependenciesRef = useRef<TDeps>()
  dependenciesRef.current = dependencies

  const cleanupRef = useRef<CleanUp | null>(null)

  effectHook(() => {
    // If the ref the is `null` it's either the first effect or the last effect
    // ran and was cleared, meaning _this_ update should run, b/c the equality
    // check failed on in the cleanup of the last effect.
    if (cleanupRef.current === null) {
      const cleanup = effect()

      cleanupRef.current = () => {
        if (isMounted() && isEqual(dependenciesRef.current!, dependencies)) {
          return
        }

        cleanupRef.current = null
        if (cleanup) cleanup()
      }
    }

    return cleanupRef.current
  })

  useDebugValue(effect)
}

export default useCustomEffect
