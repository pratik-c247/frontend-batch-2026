import { AUTH_MESSAGES, notify } from '@/constant/authMessages'
import { LOCAL_VARIABLES } from '@/constant/localVariables'
import { ROUTES } from '@/constant/routes'
import type { User } from '@/types/auth.types'
import { getUserByEmail, saveUser } from '@/utils/indexedDB'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AUTH_TEXTS } from '../auth.constant'

const OTP_EXPIRY_SECONDS = Number(
  process.env.NEXT_PUBLIC_OTP_EXPIRY_SECONDS ?? 60,
)

type OtpFormData = {
  code: string
}

export const useEmailSetupHook = () => {
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState(OTP_EXPIRY_SECONDS)
  const [userEmail, setUserEmail] = useState('')
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const expiresAtRef = useRef<number>(0)
  const [isVerified, setIsVerified] = useState(false)
  const [otpSent, setOtpSent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormData>()

  const startTimer = () => {
    setTimeLeft(OTP_EXPIRY_SECONDS)
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const onResend = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    const otp = Math.floor(100000 + Math.random() * 900000)
    const expiry = Date.now() + OTP_EXPIRY_SECONDS * 1000
    expiresAtRef.current = expiry
    sessionStorage.setItem(AUTH_TEXTS.SESSION_VARIABLES.EMAIL_OTP, otp.toString())
    sessionStorage.setItem(AUTH_TEXTS.SESSION_VARIABLES.EMAIL_OTP_EXPIRES, expiry.toString())
    startTimer()
    notify.success(AUTH_MESSAGES.NEW_CODE_SENT)
  }

  const onSubmit = async (data: OtpFormData) => {
    const storedOtp = sessionStorage.getItem(
      AUTH_TEXTS.SESSION_VARIABLES.EMAIL_OTP,
    )
    if (timeLeft <= 0) {
      notify.error(AUTH_MESSAGES.CODE_EXPIRED)
      return
    }
    if (data.code !== storedOtp) {
      notify.error(AUTH_MESSAGES.INVALID_CODE)
      return
    }
    try {
      const user: User = await getUserByEmail(userEmail)
      if (!user) return
      await saveUser({
        ...user,
        mfaEnabled: [...(user.mfaEnabled || []), 'email'],
        mfa: {
          ...user.mfa,
          email: { otp: null, expiresAt: null, verified: true },
        },
      })
      sessionStorage.removeItem(AUTH_TEXTS.SESSION_VARIABLES.EMAIL_OTP)
      sessionStorage.removeItem(AUTH_TEXTS.SESSION_VARIABLES.EMAIL_OTP_EXPIRES)
      notify.success(AUTH_MESSAGES.EMAIL_SETUP_CONFIGURED)
      router.push(ROUTES.MFA.ACTIVATED)
    } catch {
      notify.error(AUTH_MESSAGES.SOMETHING_WENT_WRONG)
    }
  }

  const sendOtp = () => {
    const email = localStorage.getItem(LOCAL_VARIABLES.CURRENT_USER_EMAIL) || ''
    setUserEmail(email)
    const otp = Math.floor(100000 + Math.random() * 900000)
    const expiry = Date.now() + OTP_EXPIRY_SECONDS * 1000
    expiresAtRef.current = expiry
    sessionStorage.setItem(
      AUTH_TEXTS.SESSION_VARIABLES.EMAIL_OTP,
      otp.toString(),
    )
    sessionStorage.setItem(
      AUTH_TEXTS.SESSION_VARIABLES.EMAIL_OTP_EXPIRES,
      expiry.toString(),
    )
    notify.success(`Verification code sent to ${email}`)
    startTimer()
    setOtpSent(true)
  }

  return {
    router,
    timeLeft,
    userEmail,
    timerRef,
    expiresAtRef,
    isVerified,
    setIsVerified,
    otpSent,
    setOtpSent,
    //form
    register,
    handleSubmit,
    errors,
    onResend,
    sendOtp,
    onSubmit,
  }
}
