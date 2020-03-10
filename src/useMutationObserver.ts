import useEffect from './useIsomorphicEffect'

/**
 * Efficiently observe size changes on an element. Depends on the `ResizeObserver` api,
 * and polyfills are needed in older browsers.
 *
 * ```ts
 * const [element, attachRef] = useCallbackRef(null);
 *
 * useMutationObserver(element, { subtree: true }, (records) => {
 *
 * });
 *
 * return (
 *   <div ref={attachRef} />
 * )
 * ```
 *
 * @param element The DOM element to observe
 * @param config The observer configuration
 * @param callback A callback fired when a mutation occurs
 */
function useMutationObserver(
  element: Element | null | undefined,
  config: MutationObserverInit,
  callback: MutationCallback,
): void {
  const {
    attributeFilter,
    attributeOldValue,
    attributes,
    characterData,
    characterDataOldValue,
    childList,
    subtree,
  } = config

  useEffect(() => {
    if (!element) return

    const observer = new MutationObserver(callback)

    observer.observe(element, {
      attributeFilter,
      attributeOldValue,
      attributes,
      characterData,
      characterDataOldValue,
      childList,
      subtree,
    })

    return () => {
      observer.disconnect()
    }
  }, [
    element,
    callback,
    attributeFilter?.join(','),
    attributeOldValue,
    attributes,
    characterData,
    characterDataOldValue,
    childList,
    subtree,
  ])
}

export default useMutationObserver
