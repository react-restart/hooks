import { useEffect, useState } from 'react'

export default function useMergeState(initialState) {
  const [state, setState] = useState(initialState || {})

  const updater = update => {
    if (update === null) return
    if (typeof update === 'function')
      setState(state => ({ ...state, ...update(state) }))

    return setState(state => ({ ...state, ...update }))
  }

  return [state, updater]
}
