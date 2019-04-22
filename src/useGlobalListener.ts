import useEventListener from './useEventListener'

type DocumentEventHandler<K extends keyof DocumentEventMap> = (
  this: Document,
  ev: DocumentEventMap[K]
) => any

/**
 * Attaches an event handler outside directly to the `document`,
 * bypassing the react synthetic event system.
 *
 * ```ts
 * useGlobalListener('keydown', (event) => {
 *  console.log(event.key)
 * })
 * ```
 *
 * @param event The DOM event name
 * @param handler An event handler
 * @param capture Whether or not to listen during the capture event phase
 */
export default function useGlobalListener<K extends keyof DocumentEventMap>(
  event: K,
  handler: DocumentEventHandler<K>,
  capture: boolean = false
) {
  return useEventListener(document, event, handler, capture)
}
