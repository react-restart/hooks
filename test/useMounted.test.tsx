import useMounted from '../src/useMounted'
import { renderHook } from '@testing-library/react-hooks'

describe('useMounted', () => {
  it('should return a function that returns mount state', () => {
    const { result, unmount } = renderHook(useMounted)

    expect(result.current()).toEqual(true)

    unmount()

    expect(result.current()).toEqual(false)
  })
})
