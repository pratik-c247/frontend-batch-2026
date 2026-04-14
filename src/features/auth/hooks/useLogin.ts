import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getUserByEmail } from '@/utils/indexedDB'
import { AUTH_MESSAGES, notify } from '@/constant/authMessages'
import { ROUTES } from '@/constant/routes'
import { LOCAL_VARIABLES } from '@/constant/localVariables'
import { useForm } from 'react-hook-form'
import type { LoginFormData, User } from '@/types/auth.types'
import { isAuthenticated } from '@/utils/auth'
import { COUNTDOWN_START_KEY, EVENT_LISTENER_STORAGE, LAST_ACTIVITY_KEY, LOGIN_KEY, LOGOUT_KEY, STAY_LOGGED_IN_KEY } from '@/constant/common'

export const useLogin = () => {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const togglePassword = () => {
    setShowPassword((prev) => !prev)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>()

  const login = async (email: string, password: string) => {
    const user: User = await getUserByEmail(email)

    if (!user) {
      notify.error(AUTH_MESSAGES.USER_NOT_FOUND)
      return
    }
    if (user.password !== password) {
      notify.error(AUTH_MESSAGES.SOMETHING_WENT_WRONG)
      return
    }
    localStorage.setItem(LOCAL_VARIABLES.CURRENT_USER_EMAIL, email)
      localStorage.removeItem(LAST_ACTIVITY_KEY)
      localStorage.removeItem(COUNTDOWN_START_KEY)
      localStorage.removeItem(STAY_LOGGED_IN_KEY)
      localStorage.removeItem(LOGOUT_KEY)
    notify.success(AUTH_MESSAGES.LOGIN_SUCCESS)
    const mfaEnabled: string[] = user?.mfaEnabled || []

    if (mfaEnabled.length === 0) {
      router.push(ROUTES.MFA.MFA_SETUP)
      return
    }

    router.push(ROUTES.VERIFY.ROOT)
  }

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace(ROUTES.DASHBOARD.ROOT)
      return
    }
    const handleStorage = (event: StorageEvent) => {
      if (event.key === LOGIN_KEY && event.newValue) {
        router.push(ROUTES.DASHBOARD.ROOT)
      }
    }
    window.addEventListener(EVENT_LISTENER_STORAGE, handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [router])
  return {
    showPassword,
    togglePassword,
    login,
    register,
    handleSubmit,
    errors,
    reset,
  }
}
