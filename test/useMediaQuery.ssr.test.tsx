/**
 * @jest-environment node
 */

import React from 'react'
import { renderToString } from 'react-dom/server'
import useMediaQuery from '../src/useMediaQuery'

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
