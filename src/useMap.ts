import useForceUpdate from './useForceUpdate'
import useStableMemo from './useStableMemo'

export class ObservableMap<K, V> extends Map<K, V> {
  private readonly listener: (map: ObservableMap<K, V>) => void

  constructor(
    listener: (map: ObservableMap<K, V>) => void,
    init?: Iterable<Readonly<[K, V]>>,
  ) {
    super(init as any)

    this.listener = listener
  }

  set(key: K, value: V): this {
    super.set(key, value)
    // When initializing the Map, the base Map calls this.set() before the
    // listener is assigned so it will be undefined
    if (this.listener) this.listener(this)
    return this
  }

  delete(key: K): boolean {
    let result = super.delete(key)
    this.listener(this)
    return result
  }

  clear(): void {
    super.clear()
    this.listener(this)
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
function useMap<K, V>(init?: Iterable<Readonly<[K, V]>>) {
  const forceUpdate = useForceUpdate()

  return useStableMemo(() => new ObservableMap<K, V>(forceUpdate, init), [])
}

export default useMap
