import { notify, AUTH_MESSAGES } from '@/constant/authMessages'
import { ROUTES } from '@/constant/routes'
import type { User } from '@/types/auth.types'
import { saveUser } from '@/utils/indexedDB'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

export const useSignupHook = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>()

  const onSubmit = async (data: User) => {
    await saveUser({
      ...data,
      id: uuidv4(),
      mfaEnabled: [],

      mfa: {
        authenticator: {
          secret: null,
          verified: false,
        },
        email: {
          otp: null,
          expiresAt: null,
          verified: false,
        },
        sms: {
          otp: null,
          expiresAt: null,
          verified: false,
        },
      },
      createdAt: Date.now(),
    })

    notify.success(AUTH_MESSAGES.ACCOUNT_CREATED_SUCCESSFULLY)
    router.push(ROUTES.LOGIN)
  }

  const password = watch('password')

  return {

    form: {
      onSubmit,
      register,
      handleSubmit,
      errors,
      password,
    },
    state: {
      showPassword,
      setShowPassword,
      showConfirmPassword,
      setShowConfirmPassword,
    }
  }
}
