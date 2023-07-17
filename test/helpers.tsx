import { renderHook as baseRenderHook } from '@testing-library/react'

type ReactWrapper<P> = {
  setProps(props: Partial<P>): void
  unmount(): void
}

export function renderHook<T extends (props: P) => any, P = any>(
  fn: T,
  initialProps?: P,
): [ReturnType<T>, ReactWrapper<P>] {
  const { rerender, result, unmount } = baseRenderHook(fn, { initialProps })

  return [
    result.current,
    {
      unmount,
      setProps(props: P) {
        rerender({ ...initialProps, ...props })
      },
    },
  ]
}
