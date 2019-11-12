import { act } from 'react-dom/test-utils'
import useForceUpdate from '../src/useForceUpdate'
import { renderHook } from './helpers'

describe('useForceUpdate', () => {
  it('should return a function that returns mount state', () => {
    let count = 0

    const [forceUpdate] = renderHook(() => {
      count++
      return useForceUpdate()
    })

    expect(count).toEqual(1)
    act(() => {
      forceUpdate()
    })

    expect(count).toEqual(2)
  })
})
