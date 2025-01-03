import { renderHook } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import usePrevious from '../src/usePrevious.js'

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
