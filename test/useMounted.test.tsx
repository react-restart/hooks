import { describe, it, vi, expect } from 'vitest'
import { renderHook } from '@testing-library/react'

import useMounted from '../src/useMounted.js'

describe('useMounted', () => {
  it('should return a function that returns mount state', () => {
    const { result, unmount } = renderHook(useMounted)

    expect(result.current()).toEqual(true)

    unmount()

    expect(result.current()).toEqual(false)
  })
})
