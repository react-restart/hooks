import useForceUpdate from './useForceUpdate'
import { useRef } from 'react'
import useWillUnmount from './useWillUnmount'

export class ObservableSet<V> extends Set<V> {
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

  add(value: V): this {
    super.add(value)
    this.emit()
    return this
  }

  delete(value: V): boolean {
    const result = super.delete(value)
    this.emit()
    return result
  }

  clear(): void {
    super.clear()
    this.emit()
  }
}

/**
 * Create and return a [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) that triggers rerenders when it's updated.
 *
 * ```tsx
 * const ids = useSet<number>([1,2,3,4]);
 *
 * return (
 *  <>
 *    {Array.from(ids, id => (
 *      <div>
 *        id: {id}. <button onClick={() => ids.delete(id)}>X</button>
 *      </div>
 *    )}
 *  </>
 * )
 * ```
 *
 * @param init initial Set values
 */
function useSet<V>(init?: Iterable<V>) {
  const forceUpdate = useForceUpdate()
  const set = useRef<ObservableSet<V>>()
  if (!set.current) {
    set.current = new ObservableSet<V>(init)
    set.current.observe(forceUpdate)
  }
  useWillUnmount(() => {
    if (set.current) {
      set.current.unobserve()
    }
  })

  return set.current
}

export default useSet
