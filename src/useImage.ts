import { useState, useEffect } from 'react'

type State = {
  image: HTMLImageElement | null
  error: unknown | null
}

export default function useImage(
  imageOrUrl: string | HTMLImageElement,
  crossOrigin?: string
) {
  const [state, setState] = useState<State>({
    image: null,
    error: null,
  })

  useEffect(() => {
    if (!imageOrUrl) return undefined

    let image: HTMLImageElement

    if (typeof imageOrUrl === 'string') {
      image = new Image()
      image.src = imageOrUrl
      if (crossOrigin) image.crossOrigin = crossOrigin
    } else {
      image = imageOrUrl

      if (image.complete && image.naturalHeight > 0) {
        setState({ image, error: null })
        return
      }
    }

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
  }, [imageOrUrl, crossOrigin])

  return state
}
