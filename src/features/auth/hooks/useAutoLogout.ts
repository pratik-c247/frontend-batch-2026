import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { COUNTDOWN_DURATION, INACTIVITY_TIMEOUT } from '@/constant/common'



const clearTimeoutSafe = (timer: ReturnType<typeof setTimeout> | null) => {
  if (timer) clearTimeout(timer)
}
const clearIntervalSafe = (timer: ReturnType<typeof setInterval> | null) => {
  if (timer) clearInterval(timer)
}

export const useAutoLogout = () => {
  const router = useRouter()
  const [showWarning, setShowWarning] = useState(false)
  const [countdown, setCountdown] = useState(COUNTDOWN_DURATION)
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const countdownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isWarningVisibleRef = useRef<boolean>(false)

  const logout = useCallback(() => {
    clearTimeoutSafe(inactivityTimerRef.current)
    clearIntervalSafe(countdownTimerRef.current)

    isWarningVisibleRef.current = false
    setShowWarning(false)
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    sessionStorage.clear()

    router.push('/login')
  }, [router])

  const startCountdown = useCallback(() => {
    setCountdown(COUNTDOWN_DURATION)
    setShowWarning(true)
    isWarningVisibleRef.current = true

    countdownTimerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1 && countdownTimerRef.current) {
          clearInterval(countdownTimerRef.current)
          logout()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [logout])

  const resetInactivityTimer = useCallback(() => {
    clearTimeoutSafe(inactivityTimerRef.current)
    inactivityTimerRef.current = setTimeout(startCountdown, INACTIVITY_TIMEOUT)
  }, [startCountdown])

  const stayLoggedIn = useCallback(() => {
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current)
    setShowWarning(false)
    isWarningVisibleRef.current = false
    setCountdown(COUNTDOWN_DURATION)
    resetInactivityTimer()
  }, [resetInactivityTimer])

  useEffect(() => {
    const activityEvents = [
      'mousemove',
      'mousedown',
      'keypress',
      'scroll',
      'click',
    ]

    const handleActivity = () => {
      if (!isWarningVisibleRef.current) {
        resetInactivityTimer()
      }
    }

    activityEvents.forEach((e) => window.addEventListener(e, handleActivity))
    resetInactivityTimer()

    return () => {
      activityEvents.forEach((e) =>
        window.removeEventListener(e, handleActivity),
      )

      clearTimeoutSafe(inactivityTimerRef.current)
      clearIntervalSafe(countdownTimerRef.current)
    }
  }, [resetInactivityTimer])

  return { showWarning, countdown, logout, stayLoggedIn }
}
