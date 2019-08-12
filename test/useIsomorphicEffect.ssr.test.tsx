/**
 * @jest-environment node
 */

import React, { useEffect } from 'react'

import { renderToString } from 'react-dom/server'
import useIsomorphicEffect from '../src/useIsomorphicEffect'

describe('useIsomorphicEffect (ssr)', () => {
  it('should not run or warn', () => {
    let spy = jest.fn()

    expect(useIsomorphicEffect).toEqual(useEffect)

    const Wrapper = () => {
      useIsomorphicEffect(spy)
      return null
    }

    renderToString(<Wrapper />)
    expect(spy).not.toBeCalled()
  })
})
