import { AUTH_MESSAGES, notify } from '@/constant/authMessages'
import { LOCAL_VARIABLES } from '@/constant/localVariables'
import { ROUTES } from '@/constant/routes'
import type { User } from '@/types/auth.types'
import { generateOtp, getExpiry } from '@/utils/helpers'
import { getUserByEmail, saveUser } from '@/utils/indexedDB'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AUTH_TEXTS } from '../auth.constant'

const OTP_EXPIRY_SECONDS = Number(
  process.env.NEXT_PUBLIC_OTP_EXPIRY_SECONDS ?? 60,
)
type PhoneFormData = { phone: string }
type OtpFormData = { code: string }

export const useSmsSetupHook = () => {
  const router = useRouter()
  const [step, setStep] = useState<'phone' | 'verify'>('phone')
  const [phone, setPhone] = useState('')
  const [timeLeft, setTimeLeft] = useState(OTP_EXPIRY_SECONDS)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const expiresAtRef = useRef<number>(0)
  const phoneForm = useForm<PhoneFormData>()
  const otpForm = useForm<OtpFormData>()

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

  function storeOtp(key: 'sms_otp' | 'email_otp') {
    const otp = generateOtp()
    const expiry = getExpiry()
    sessionStorage.setItem(key, otp)
    sessionStorage.setItem(`${key}_expires`, expiry.toString())
    return { otp, expiry }
  }


  const onSendCode = (data: PhoneFormData) => {
    const { expiry } = storeOtp(AUTH_TEXTS.SESSION_VARIABLES.SMS_OTP)
    expiresAtRef.current = expiry
    setPhone(`+1 ${data.phone}`)
    setStep('verify')
    startTimer()
    notify.success(`Code sent to +1 ${data.phone}`)
  }

  const onVerify = async (data: OtpFormData) => {
    const storedOtp = sessionStorage.getItem(
      AUTH_TEXTS.SESSION_VARIABLES.SMS_OTP,
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
      const email = localStorage.getItem(LOCAL_VARIABLES.CURRENT_USER_EMAIL) || ''
      const user: User = await getUserByEmail(email)
      if (!user) return
      await saveUser({
        ...user,
        mfaEnabled: [...(user.mfaEnabled || []), 'sms'],
        mfa: {
          ...user.mfa,
          sms: { otp: null, expiresAt: null, verified: true, phone },
        },
      })
      sessionStorage.removeItem(AUTH_TEXTS.SESSION_VARIABLES.SMS_OTP)
      sessionStorage.removeItem(AUTH_TEXTS.SESSION_VARIABLES.SMS_OTP_EXPIRES)
      notify.success(AUTH_MESSAGES.SMS_SETUP_CONFIGURED)
      router.push(ROUTES.MFA.ACTIVATED)
    } catch {
      notify.error(AUTH_MESSAGES.SOMETHING_WENT_WRONG)
    }
  }

  const onResend = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    const { expiry } = storeOtp(AUTH_TEXTS.SESSION_VARIABLES.SMS_OTP)
    expiresAtRef.current = expiry
    startTimer()
    notify.success(AUTH_MESSAGES.NEW_CODE_SENT)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  return {
    phone,
    timeLeft,
    otpForm,
    phoneForm,
    step,
    onResend,
    onVerify,
    onSendCode,
  }
}
