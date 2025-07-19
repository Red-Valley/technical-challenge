import { useEffect, useRef } from 'react'

export const useAutoRefresh = (callback: () => void, interval: number = 30000) => {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => {
      savedCallback.current()
    }

    const id = setInterval(tick, interval)
    return () => clearInterval(id)
  }, [interval])
} 