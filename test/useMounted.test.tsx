import useMounted from '../src/useMounted.js'
import { renderHook } from '@testing-library/react'

describe('useMounted', () => {
  it('should return a function that returns mount state', () => {
    const { result, unmount } = renderHook(useMounted)

    expect(result.current()).toEqual(true)

    unmount()

    expect(result.current()).toEqual(false)
  })
})
