import useMediaQuery from './useMediaQuery'
import { useMemo } from 'react'

export type BreakpointDirection = 'up' | 'down' | true

export type BreakpointMap<TKey extends string> = Partial<
  Record<TKey, BreakpointDirection>
>

/**
 * Create a responsive hook we a set of breakpoint names and widths.
 * You can use any valid css units as well as a numbers (for pixels).
 *
 * **NOTE:** The object key order is important! it's assumed to be in order from smallest to largest
 *
 * ```ts
 * const useBreakpoint = createBreakpointHook({
 *  xs: 0,
 *  sm: 576,
 *  md: 768,
 *  lg: 992,
 *  xl: 1200,
 * })
 * ```
 *
 * **Watch out!** using string values will sometimes construct media queries using css `calc()` which
 * is NOT supported in media queries by all browsers at the moment. use numbers for
 * the widest range of browser support.
 *
 * @param breakpointValues A object hash of names to breakpoint dimensions
 */
export function createBreakpointHook<TKey extends string>(
  breakpointValues: Record<TKey, string | number>,
) {
  const names = Object.keys(breakpointValues) as TKey[]

  function and(query: string, next: string) {
    if (query === next) {
      return next
    }
    return query ? `${query} and ${next}` : next
  }

  function getNext(breakpoint: TKey) {
    return names[Math.min(names.indexOf(breakpoint) + 1, names.length - 1)]
  }

  function getMaxQuery(breakpoint: TKey) {
    const next = getNext(breakpoint)
    let value = breakpointValues[next]

    if (typeof value === 'number') value = `${value - 0.2}px`
    else value = `calc(${value} - 0.2px)`

    return `(max-width: ${value})`
  }

  function getMinQuery(breakpoint: TKey) {
    let value = breakpointValues[breakpoint]
    if (typeof value === 'number') {
      value = `${value}px`
    }
    return `(min-width: ${value})`
  }

  /**
   * Match a set of breakpoints
   *
   * ```tsx
   * const MidSizeOnly = () => {
   *   const isMid = useBreakpoint({ lg: 'down', sm: 'up' });
   *
   *   if (isMid) return <div>On a Reasonable sized Screen!</div>
   *   return null;
   * }
   * ```
   * @param breakpointMap An object map of breakpoints and directions, queries are constructed using "and" to join
   * breakpoints together
   */
  function useBreakpoint(breakpointMap: BreakpointMap<TKey>): boolean
  /**
   * Match a single breakpoint exactly, up, or down.
   *
   * ```tsx
   * const PhoneOnly = () => {
   *   const isSmall = useBreakpoint('sm', 'down');
   *
   *   if (isSmall) return <div>On a Small Screen!</div>
   *   return null;
   * }
   * ```
   *
   * @param breakpoint The breakpoint key
   * @param direction A direction 'up' for a max, 'down' for min, true to match only the breakpoint
   */
  function useBreakpoint(
    breakpoint: TKey,
    direction?: BreakpointDirection,
  ): boolean
  function useBreakpoint(
    breakpointOrMap: TKey | BreakpointMap<TKey>,
    direction: BreakpointDirection = true,
  ): boolean {
    let breakpointMap: BreakpointMap<TKey>

    if (typeof breakpointOrMap === 'object') {
      breakpointMap = breakpointOrMap
    } else {
      breakpointMap = { [breakpointOrMap]: direction } as Record<
        TKey,
        BreakpointDirection
      >
    }

    let query = useMemo(
      () =>
        Object.entries(breakpointMap).reduce(
          (query, [key, direction]: [TKey, BreakpointDirection]) => {
            if (direction === 'up' || direction === true) {
              query = and(query, getMinQuery(key))
            }
            if (direction === 'down' || direction === true) {
              query = and(query, getMaxQuery(key))
            }

            return query
          },
          '',
        ),
      [JSON.stringify(breakpointMap)],
    )

    return useMediaQuery(query)
  }

  return useBreakpoint
}

export type DefaultBreakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type DefaultBreakpointMap = BreakpointMap<DefaultBreakpoints>

const useBreakpoint = createBreakpointHook<DefaultBreakpoints>({
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
})

export default useBreakpoint
