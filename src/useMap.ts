import useForceUpdate from './useForceUpdate'
import { useRef } from 'react'
import useWillUnmount from './useWillUnmount'

export class ObservableMap<K, V> extends Map<K, V> {
  private readonly listeners = new Set<Function>()

  observe(listener: (map: this) => void): () => void {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  unobserve() {
    this.listeners.clear()
  }

  private emit() {
    // the ctor init will call set() so the listener Set isn't set up yet
    if (!this.listeners) return

    this.listeners.forEach(fn => fn(this))
  }

  set(key: K, value: V): this {
    super.set(key, value)
    this.emit()
    return this
  }

  delete(key: K): boolean {
    let result = super.delete(key)
    this.emit()
    return result
  }

  clear(): void {
    super.clear()
    this.emit()
  }
}

/**
 * Create and return a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) that triggers rerenders when it's updated.
 *
 * ```tsx
 * const customerAges = useMap<number>([
 *  ['john', 24],
 *  ['betsy', 25]
 * ]);
 *
 * return (
 *  <>
 *    {Array.from(ids, ([name, age]) => (
 *      <div>
 *        {name}: {age}. <button onClick={() => ids.delete(name)}>X</button>
 *      </div>
 *    )}
 *  </>
 * )
 * ```
 *
 * @param init initial Map entries
 */
function useMap<K, V>(init?: Iterable<readonly [K, V]>) {
  const forceUpdate = useForceUpdate()
  const set = useRef<ObservableMap<K, V>>()
  if (!set.current) {
    set.current = new ObservableMap<K, V>(init as any)
    set.current.observe(forceUpdate)
  }

  useWillUnmount(() => {
    if (set.current) {
      set.current.unobserve()
    }
  })

  return set.current
}

export default useMap
