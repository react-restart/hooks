import { useEffect, useRef } from 'react'

export default function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    console.log('update!')
    ref.current = value
  })
  return ref.current
}
