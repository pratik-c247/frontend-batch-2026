import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getUserByEmail } from '@/utils/indexedDB'
import { AUTH_MESSAGES, notify } from '@/constant/authMessages'
import { ROUTES } from '@/constant/routes'
import { LOCAL_VARIABLES } from '@/constant/localVariables'
import { useForm } from 'react-hook-form'
import type { LoginFormData, User } from '@/types/auth.types'

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
    const user:User  = await getUserByEmail(email)

    if (!user) {
      notify.error(AUTH_MESSAGES.USER_NOT_FOUND)
      return
    }

    if (user.password !== password) {
      notify.error(AUTH_MESSAGES.SOMETHING_WENT_WRONG)
      return
    }

    localStorage.setItem(LOCAL_VARIABLES.CURRENT_USER_EMAIL, email)

    notify.success(AUTH_MESSAGES.LOGIN_SUCCESS)

    const mfaEnabled: string[] = user?.mfaEnabled || []

    if (mfaEnabled.length === 0) {
      router.push(ROUTES.MFA.MFA_SETUP)
      return
    }

    router.push(ROUTES.VERIFY.ROOT)
  }

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
