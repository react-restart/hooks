/**
 * @vitest-environment node
 */

import { useEffect } from 'react'
import { describe, it, vi, expect } from 'vitest'

import { renderToString } from 'react-dom/server'
import useIsomorphicEffect from '../src/useIsomorphicEffect.js'

describe('useIsomorphicEffect (ssr)', () => {
  it('should not run or warn', () => {
    let spy = vi.fn()

    expect(useIsomorphicEffect).toEqual(useEffect)

    const Wrapper = () => {
      useIsomorphicEffect(spy)
      return null
    }

    renderToString(<Wrapper />)
    expect(spy).not.toBeCalled()
  })
})
