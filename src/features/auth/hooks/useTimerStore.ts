import { useRef, useCallback } from 'react'

export type TimerSubscriber = (timeLeft: number) => void

export interface TimerStore {
  subscribe: (cb: TimerSubscriber) => () => void
  start: (seconds: number) => void
  stop: () => void
  getTimeLeft: () => number
}

export const useTimerStore = (): TimerStore => {
  const timeLeftRef = useRef<number>(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const subscribersRef = useRef<Set<TimerSubscriber>>(new Set())

  const notify = useCallback((value: number) => {
    subscribersRef.current.forEach((cb) => cb(value))
  }, [])

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const start = useCallback(
    (seconds: number) => {
      stop()
      timeLeftRef.current = seconds
      notify(seconds)

      intervalRef.current = setInterval(() => {
        timeLeftRef.current -= 1
        notify(timeLeftRef.current)

        if (timeLeftRef.current <= 0) {
          stop()
        }
      }, 1000)
    },
    [stop, notify],
  )

  const subscribe = useCallback((cb: TimerSubscriber) => {
    subscribersRef.current.add(cb)

    cb(timeLeftRef.current)
    return () => {
      subscribersRef.current.delete(cb)
    }
  }, [])

  const getTimeLeft = useCallback(() => timeLeftRef.current, [])

  return { subscribe, start, stop, getTimeLeft }
}
