import { notify } from '@/constant/authMessages'
import { ROUTES } from '@/constant/routes'
import type { User } from '@/types/auth.types'
import { generateOtp, getExpiry } from '@/utils/helpers'
import { getUserByEmail, saveUser } from '@/utils/indexedDB'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

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
    const { expiry } = storeOtp('sms_otp')
    expiresAtRef.current = expiry
    setPhone(`+1 ${data.phone}`)
    setStep('verify')
    startTimer()
    notify.success(`Code sent to +1 ${data.phone}`)
  }

  const onVerify = async (data: OtpFormData) => {
    const storedOtp = sessionStorage.getItem('sms_otp')
    if (timeLeft <= 0) {
      notify.error('Code expired. Please resend.')
      return
    }
    if (data.code !== storedOtp) {
      notify.error('Invalid code. Please try again.')
      return
    }
    try {
      const email = localStorage.getItem('currentUserEmail') || ''
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
      sessionStorage.removeItem('sms_otp')
      sessionStorage.removeItem('sms_otp_expires')
      notify.success('SMS authentication configured!')
      router.push(ROUTES.MFA.ACTIVATED)
    } catch {
      notify.error('Something went wrong.')
    }
  }

  const onResend = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    const { expiry } = storeOtp('sms_otp')
    expiresAtRef.current = expiry
    startTimer()
    notify.success('New code sent!')
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
