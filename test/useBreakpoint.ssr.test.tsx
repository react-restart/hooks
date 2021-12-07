/**
 * @jest-environment node
 */

import React from 'react'
import { renderToString } from 'react-dom/server'
import useBreakpoint from '../src/useBreakpoint'

describe('useBreakpoint (ssr)', () => {
  it('should match immediately if possible', () => {
    let matches
    const Wrapper = () => {
      matches = useBreakpoint('md')
      return null
    }

    renderToString(<Wrapper />)
    expect(matches).toEqual(false)
  })
})
