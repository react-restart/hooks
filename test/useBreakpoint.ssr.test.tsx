/**
 * @vitest-environment node
 */

import { renderToString } from 'react-dom/server'
import useBreakpoint from '../src/useBreakpoint.js'
import { describe, it, expect } from 'vitest'

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
