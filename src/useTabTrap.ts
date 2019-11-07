import { useMemo, useRef } from 'react'
import useEventListener from './useEventListener'

const defaultSelector = [
  'input',
  'textarea',
  'select',
  'button:not([tabindex="-1"])',
  '[tabindex="0"]',
].join(',')

const getDocument = () => document

/**
 * Create's a tab trap for a given container element, that contains and cycles focus
 * inside the element. Use for for creating modals, or simpler dialogs. Focus
 * is determined by DOM order, meaning elemetns rendered to portals outside the
 * element will be excluded from the container.
 *
 * @param ref A ref to the tab trap container
 * @param selector A CSS selector targeting all focusable items. By default inputs, selects, buttons, textareas, and elements with tabIndex=0 are selected
 */
export default function useTabTrap(
  ref: React.RefObject<Element>,
  selector: string = defaultSelector,
) {
  const startedRef = useRef(false)

  useEventListener(getDocument, 'keydown', (event: KeyboardEvent) => {
    if (!startedRef.current || !ref.current || event.key !== 'Tab') {
      return
    }

    const tabbables = ref.current.querySelectorAll<HTMLElement | SVGElement>(
      selector,
    )

    if (event.shiftKey && event.target === tabbables[0]) {
      tabbables[tabbables.length - 1].focus()
      event.preventDefault()
    } else if (
      (!event.shiftKey && event.target === tabbables[tabbables.length - 1]) ||
      !ref.current.contains(event.target as Element)
    ) {
      tabbables[0].focus()
      event.preventDefault()
    }
  })

  return useMemo(
    () => ({
      /**
       * Moves focus to the first focusable element in the container
       */
      focus() {
        const tabbables = ref.current!.querySelectorAll<
          HTMLElement | SVGElement
        >(selector)
        const first = tabbables[0]
        if (first) first.focus()
      },
      /** Enables the tab trap */
      start() {
        startedRef.current = true
      },

      /** Disables the tab trap; allows focus to move outside the container element */
      stop() {
        startedRef.current = false
      },
    }),
    [selector],
  )
}
