import React from 'react'
import usePrevious from '../src/usePrevious'
import { renderHook } from '@testing-library/react'

describe('usePrevious', () => {
  it('should return a function that returns mount state', () => {
    const wrapper = renderHook(({ foo }) => usePrevious(foo), {
      initialProps: { foo: true },
    })

    expect(wrapper.result.current).toEqual(null)

    wrapper.rerender({ foo: false })

    expect(wrapper.result.current).toEqual(true)
  })
})
