import { useEffect } from 'react'
import { renderHook } from '@testing-library/react'
import useCommittedRef from '../src/useCommittedRef.js'
import { describe, it, vi, expect } from 'vitest'

describe('useCommittedRef', () => {
  it('should use fresh value', () => {
    const spyA = vi.fn()
    const spyB = vi.fn()

    const { rerender } = renderHook(
      (fn) => {
        const fnRef = useCommittedRef<any>(fn)

        useEffect(() => {
          fnRef.current()
        })
      },
      { initialProps: spyA },
    )

    rerender(spyB)

    expect(spyA).toHaveBeenCalledTimes(1)
    expect(spyB).toHaveBeenCalledTimes(1)
  })
})
