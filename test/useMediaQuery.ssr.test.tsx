/**
 * @vitest-environment node
 */

import { describe, it, vi, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import useMediaQuery from '../src/useMediaQuery.js'

describe('useMediaQuery (ssr)', () => {
  it('should match immediately if possible', () => {
    let matches
    const Wrapper = ({ media }) => {
      matches = useMediaQuery(media)
      return null
    }

    renderToString(<Wrapper media="min-width: 100px" />)
    expect(matches).toEqual(false)
  })
})
