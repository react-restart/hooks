import { DependencyList, EffectCallback, useRef, useEffect } from 'react'

export type EffectHook = (effect: EffectCallback, deps?: DependencyList) => void

export type IsEqual<TDeps> = (nextDeps: TDeps, prev: TDeps) => boolean

export type CustomEffectOptions<TDeps> = {
  isEqual: IsEqual<TDeps>
  effectHook?: EffectHook
}

/**
 * a useEffect() hook with customized depedency comparision
 *
 * @param effect THe effect callback
 * @param dependencies A list of dependencies
 * @param isEqual A function comparing the next and previous dependencyLists
 */
function useCustomEffect<TDeps extends DependencyList = DependencyList>(
  effect: EffectCallback,
  dependencies: DependencyList,
  isEqual: IsEqual<TDeps>,
): void
/**
 * a useEffect() hook with customized depedency comparision
 *
 * @param effect THe effect callback
 * @param dependencies A list of dependencies
 * @param options
 * @param options.isEqual A function comparing the next and previous dependencyLists
 * @param options.effectHook the underlying effect hook used, defaults to useEffect
 */
function useCustomEffect<TDeps extends DependencyList = DependencyList>(
  effect: EffectCallback,
  dependencies: DependencyList,
  options: CustomEffectOptions<TDeps>,
): void
function useCustomEffect<TDeps extends DependencyList = DependencyList>(
  effect: EffectCallback,
  dependencies: TDeps,
  isEqualOrOptions: IsEqual<TDeps> | CustomEffectOptions<TDeps>,
) {
  const { isEqual, effectHook = useEffect } =
    typeof isEqualOrOptions === 'function'
      ? { isEqual: isEqualOrOptions }
      : isEqualOrOptions

  const depsRef = useRef<TDeps | undefined>()
  effectHook(() => {
    const prev = depsRef.current
    depsRef.current = dependencies

    if (!prev || !isEqual(dependencies, prev)) {
      return effect()
    }
  })
}

export default useCustomEffect
