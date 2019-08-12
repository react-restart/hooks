import useEffect from './useIsomorphicEffect'
import { useState } from 'react'

interface RefCountedMediaQueryList extends MediaQueryList {
  refCount: number
}

const isBool = (a: any): a is boolean => typeof a === 'boolean'

const matchers = new Map<string, RefCountedMediaQueryList>()

const getMatcher = (
  query: string | null,
): RefCountedMediaQueryList | undefined => {
  if (!query || typeof window == 'undefined') return undefined

  let mql = matchers.get(query)
  if (!mql) {
    mql = window.matchMedia(query) as RefCountedMediaQueryList
    mql.refCount = 0
    matchers.set(mql.media, mql)
  }
  return mql
}
/**
 * Match a media query and get updates as the match changes. The media string is
 * passed directly to `window.matchMedia` and run as a Layout Effect, so initial
 * matches are returned before the browser has a chance to paint.
 *
 * ```tsx
 * function Page() {
 *   const isWide = useMediaQuery('min-width: 1000px')
 *
 *   return isWide ? "very wide" : 'not so wide'
 * }
 * ```
 *
 * Media query lists are also reused globally, hook calls for the same query
 * will only create a matcher once under the hood.
 *
 * @param query A media query
 */
export default function useMediaQuery(query: string | null) {
  const mql = getMatcher(query)

  const [matches, setMatches] = useState(() => (mql ? mql.matches : false))

  useEffect(() => {
    let mql = getMatcher(query)
    if (!mql) {
      return setMatches(false)
    }

    const handleChange = () => {
      setMatches(mql!.matches)
    }

    mql.refCount++
    mql.addListener(handleChange)

    handleChange()

    return () => {
      mql!.removeListener(handleChange)
      mql!.refCount--
      if (mql!.refCount <= 0) {
        matchers.delete(mql!.media)
      }
      mql = undefined
    }
  }, [query])

  return matches
}
