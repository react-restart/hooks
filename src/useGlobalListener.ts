import useEventListener from './useEventListener'

type DocumentEventHandler<K extends keyof DocumentEventMap> = (
  this: Document,
  ev: DocumentEventMap[K]
) => any

export default function useGlobalListener<K extends keyof DocumentEventMap>(
  event: K,
  listener: DocumentEventHandler<K>,
  capture: boolean = false
) {
  return useEventListener(document, event, listener, capture)
}
