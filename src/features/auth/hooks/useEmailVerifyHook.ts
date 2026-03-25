import { AUTH_MESSAGES, notify } from '@/constant/authMessages'
import { LOCAL_VARIABLES } from '@/constant/localVariables'
import { ROUTES } from '@/constant/routes'
import type { RecoveryCode, User } from '@/types/auth.types'
import { getUserByEmail } from '@/utils/indexedDB'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AUTH_TEXTS } from '@/auth/auth.constant'
import { useTimerStore } from '@/auth/hooks/useTimerStore'

const OTP_EXPIRY_SECONDS = Number(
  process.env.NEXT_PUBLIC_OTP_EXPIRY_SECONDS ?? 60,
)

type FormData = { code: string }

export const useEmailVerifyHook = () => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [otpSent, setOtpSent] = useState(false)
  const timerStore = useTimerStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  useEffect(() => {
    const load = async () => {
      const email =
        localStorage.getItem(LOCAL_VARIABLES.CURRENT_USER_EMAIL) || ''
      const u: User = await getUserByEmail(email)
      if (!u) {
        router.push(ROUTES.LOGIN)
        return
      }
      setUser(u)
    }
    load()

    return () => timerStore.stop()
  }, [])

  const sendOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000)
    const expiresAt = Date.now() + OTP_EXPIRY_SECONDS * 1000

    sessionStorage.setItem(
      AUTH_TEXTS.SESSION_VARIABLES.EMAIL_OTP,
      otp.toString(),
    )
    sessionStorage.setItem(
      AUTH_TEXTS.SESSION_VARIABLES.EMAIL_OTP_EXPIRES,
      expiresAt.toString(),
    )

    notify.success(`Code sent to ${user?.email}`)
    timerStore.start(OTP_EXPIRY_SECONDS)
    setOtpSent(true)
  }

  const onResend = () => {
    sendOtp()
    notify.success(AUTH_MESSAGES.NEW_CODE_SENT)
  }

  const onSubmit = async (data: FormData) => {
    const storedOtp = sessionStorage.getItem(
      AUTH_TEXTS.SESSION_VARIABLES.EMAIL_OTP,
    )
    const expiresAt = Number(
      sessionStorage.getItem(AUTH_TEXTS.SESSION_VARIABLES.EMAIL_OTP_EXPIRES),
    )

    if (Date.now() > expiresAt) {
      notify.error(AUTH_MESSAGES.CODE_EXPIRED)
      return
    }
    if (data.code.trim() !== storedOtp) {
      notify.error(AUTH_MESSAGES.INVALID_CODE)
      return
    }

    sessionStorage.removeItem(AUTH_TEXTS.SESSION_VARIABLES.EMAIL_OTP)
    sessionStorage.removeItem(AUTH_TEXTS.SESSION_VARIABLES.EMAIL_OTP_EXPIRES)
    notify.success(AUTH_MESSAGES.LOGIN_SUCCESS)
    router.push(ROUTES.DASHBOARD.ROOT)
  }

  const hasRecoveryCodes = (user?.mfa?.recoveryCodes || []).some(
    (c: RecoveryCode) => !c.used,
  )

  return {
    router,
    //form
    onSubmit,
    register,
    handleSubmit,
    errors,
    //timer
    sendOtp,
    timerStore,
    onResend,
    otpSent,
    hasRecoveryCodes,
    user,
  }
}
