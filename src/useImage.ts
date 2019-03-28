import { useState, useEffect } from 'react'

type State = {
  image: HTMLImageElement | null
  error: unknown | null
}

export default function useImage(url: string, crossOrigin: string) {
  const [state, setState] = useState<State>({
    image: null,
    error: null,
  })

  useEffect(
    () => {
      if (!url) return undefined

      const image = new Image()
      image.src = url
      if (crossOrigin) image.crossOrigin = crossOrigin

      function onLoad() {
        setState({ image, error: null })
      }

      function onError(error: ErrorEvent) {
        setState({ image, error })
      }

      image.addEventListener('load', onLoad)
      image.addEventListener('error', onError)

      return () => {
        image.removeEventListener('load', onLoad)
        image.removeEventListener('error', onError)
      }
    },
    [url, crossOrigin]
  )

  return state
}
