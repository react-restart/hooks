import { useEffect } from 'react'
import { renderHook } from '@testing-library/react-hooks'
import useCommittedRef from '../src/useCommittedRef'

describe('useCommittedRef', () => {
  it('should use fresh value', () => {
    function Foo({ fn }) {
      const fnRef = useCommittedRef(fn)

      useEffect(() => {
        fnRef.current()
      })

      return null
    }

    const spyA = jest.fn()
    const spyB = jest.fn()

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
