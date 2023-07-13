import useMutationObserver from '../src/useMutationObserver'
import useCallbackRef from '../src/useCallbackRef'
import React from 'react'
import { act, render } from '@testing-library/react'

describe('useMutationObserver', () => {
  it('should add a mutation observer', async () => {
    const teardown = jest.fn()
    const spy = jest.fn(() => teardown)

    function Wrapper(props) {
      const [el, attachRef] = useCallbackRef<HTMLElement>()

      useMutationObserver(el, { attributes: true }, spy)

      return <div ref={attachRef} {...props} />
    }

    const wrapper = render(<Wrapper />)

    expect(spy).toHaveBeenCalledTimes(0)

    act(() => {
      wrapper.rerender(<Wrapper role="button" />)
    })

    await Promise.resolve()

    expect(spy).toHaveBeenCalledTimes(1)

    expect(spy).toHaveBeenCalledWith(
      [
        expect.objectContaining({
          type: 'attributes',
          attributeName: 'role',
        }),
      ],
      expect.anything(),
    )
    // coverage on the teardown
    wrapper.unmount()
  })

  let disconnentSpy: jest.SpyInstance<void, []>
  afterEach(() => {
    disconnentSpy?.mockRestore()
  })

  it('should update config', async () => {
    const teardown = jest.fn()
    const spy = jest.fn(() => teardown)

    disconnentSpy = jest.spyOn(MutationObserver.prototype, 'disconnect')

    function Wrapper({ attributeFilter, ...props }: any) {
      const [el, attachRef] = useCallbackRef<HTMLElement>()

      useMutationObserver(el, { attributes: true, attributeFilter }, spy)

      return <div ref={attachRef} {...props} />
    }

    const wrapper = render(<Wrapper attributeFilter={['data-name']} />)

    wrapper.rerender(
      <Wrapper attributeFilter={['data-name']} role="presentation" />,
    )

    await Promise.resolve()

    expect(spy).toHaveBeenCalledTimes(0)

    wrapper.rerender(<Wrapper role="button" />)

    await Promise.resolve()

    expect(spy).toHaveBeenCalledTimes(1)

    expect(spy).toHaveBeenCalledWith(
      [
        expect.objectContaining({
          type: 'attributes',
          attributeName: 'role',
        }),
      ],
      expect.anything(),
    )
    expect(disconnentSpy).toBeCalledTimes(1)

    wrapper.unmount()

    expect(disconnentSpy).toBeCalledTimes(2)
  })
})
