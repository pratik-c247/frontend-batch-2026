import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  activityEvents,
  COUNTDOWN_DURATION,
  COUNTDOWN_START_KEY,
  EVENT_LISTENER_STORAGE,
  INACTIVITY_TIMEOUT,
  LAST_ACTIVITY_KEY,
  LOGOUT_KEY,
  ONE_THOUSAND,
  STAY_LOGGED_IN_KEY,
} from '@/constant/common'
import { ROUTES } from '@/constant/routes'
import { clearAuthStorage } from '@/utils/localRemoveKeys'

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

  const logoutCleanup = useCallback(() => {
    clearTimeoutSafe(inactivityTimerRef.current)
    clearIntervalSafe(countdownTimerRef.current)
    isWarningVisibleRef.current = false
    setShowWarning(false)
    clearAuthStorage()
    sessionStorage.clear()

    router.push(ROUTES.LOGIN)
  }, [router])

  const logout = useCallback(() => {
    logoutCleanup()
    localStorage.setItem(LOGOUT_KEY, Date.now().toString())
  }, [logoutCleanup])

  const resetWarningState = useCallback(() => {
    clearIntervalSafe(countdownTimerRef.current)
    isWarningVisibleRef.current = false
    setShowWarning(false)
    setCountdown(COUNTDOWN_DURATION)
  }, [])

  const scheduleInactivityTimer = useCallback(
    (delay: number) => {
      clearTimeoutSafe(inactivityTimerRef.current)
      inactivityTimerRef.current = setTimeout(() => {
        localStorage.setItem(COUNTDOWN_START_KEY, Date.now().toString())
        startCountdownFromStorage()
      }, delay)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const startCountdownFromStorage = useCallback(() => {
    const startedAt = Number(localStorage.getItem(COUNTDOWN_START_KEY))
    if (!startedAt) return

    const elapsed = Math.floor((Date.now() - startedAt) / ONE_THOUSAND)
    const remaining = COUNTDOWN_DURATION - elapsed

    if (remaining <= 0) return logout()

    clearTimeoutSafe(inactivityTimerRef.current)
    clearIntervalSafe(countdownTimerRef.current)

    setCountdown(remaining)
    setShowWarning(true)
    isWarningVisibleRef.current = true

    countdownTimerRef.current = setInterval(() => {
      const storedStart = Number(localStorage.getItem(COUNTDOWN_START_KEY))
      if (!storedStart) return clearIntervalSafe(countdownTimerRef.current)

      const now = Date.now()
      const newRemaining =
        COUNTDOWN_DURATION - Math.floor((now - storedStart) / ONE_THOUSAND)

      if (newRemaining <= 0) {
        clearIntervalSafe(countdownTimerRef.current)
        setCountdown(0)
        logout()
        return
      }

      setCountdown(newRemaining)
    }, 1000)
  }, [logout])

  const stayLoggedIn = useCallback(() => {
    localStorage.removeItem(COUNTDOWN_START_KEY)
    localStorage.setItem(STAY_LOGGED_IN_KEY, Date.now().toString())
    resetWarningState()
    localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString())
    scheduleInactivityTimer(INACTIVITY_TIMEOUT)
  }, [resetWarningState, scheduleInactivityTimer])

  useEffect(() => {
    const handleActivity = () => {
      if (isWarningVisibleRef.current) return

      const now = Date.now()
      localStorage.setItem(LAST_ACTIVITY_KEY, now.toString())
      scheduleInactivityTimer(INACTIVITY_TIMEOUT)
    }

    activityEvents.forEach((e) => window.addEventListener(e, handleActivity))

    const now = Date.now()
    const existingCountdownStart = Number(
      localStorage.getItem(COUNTDOWN_START_KEY),
    )

    if (existingCountdownStart) {
      const elapsed = Math.floor((now - existingCountdownStart) / ONE_THOUSAND)

      if (elapsed >= COUNTDOWN_DURATION) {
        logout()
        return cleanup
      }

      startCountdownFromStorage()
      return cleanup
    }

    const lastActivity = Number(localStorage.getItem(LAST_ACTIVITY_KEY))

    if (!lastActivity) {
      scheduleInactivityTimer(INACTIVITY_TIMEOUT)
      return cleanup
    }

    const timeLeft = INACTIVITY_TIMEOUT - (now - lastActivity)

    if (timeLeft <= 0) {
      localStorage.setItem(COUNTDOWN_START_KEY, now.toString())
      startCountdownFromStorage()
      return cleanup
    }

    scheduleInactivityTimer(timeLeft)

    function cleanup() {
      activityEvents.forEach((e) =>
        window.removeEventListener(e, handleActivity),
      )
      clearTimeoutSafe(inactivityTimerRef.current)
      clearIntervalSafe(countdownTimerRef.current)
    }

    return cleanup
  }, [])
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === LAST_ACTIVITY_KEY && event.newValue) {
        if (!isWarningVisibleRef.current) {
          const lastActivity = Number(event.newValue)
          const timeLeft = INACTIVITY_TIMEOUT - (Date.now() - lastActivity)

          if (timeLeft <= 0) {
            localStorage.setItem(COUNTDOWN_START_KEY, Date.now().toString())
            startCountdownFromStorage()
          } else {
            scheduleInactivityTimer(timeLeft)
          }
        }
      }

      if (event.key === COUNTDOWN_START_KEY && event.newValue) {
        startCountdownFromStorage()
      }

      if (event.key === STAY_LOGGED_IN_KEY && event.newValue) {
        resetWarningState()
        scheduleInactivityTimer(INACTIVITY_TIMEOUT)
      }

      if (event.key === LOGOUT_KEY && event.newValue) {
        logoutCleanup()
      }
    }

    window.addEventListener(EVENT_LISTENER_STORAGE, handleStorage)
    return () =>
      window.removeEventListener(EVENT_LISTENER_STORAGE, handleStorage)
  }, [
    logoutCleanup,
    startCountdownFromStorage,
    resetWarningState,
    scheduleInactivityTimer,
    router,
  ])

  return { showWarning, countdown, logout, stayLoggedIn }
}
