import type { AUTH_TEXTS } from '@/features/auth/auth.constant'

const OTP_EXPIRY_SECONDS = Number(
  process.env.NEXT_PUBLIC_OTP_EXPIRY_SECONDS ?? 60,
)

export function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000))
}

export function getExpiry(): number {
  return Date.now() + OTP_EXPIRY_SECONDS * 1000
}

export const formatTime = (s: number) => {
  const m = Math.floor(s / 60)
    .toString()
    .padStart(2, '0')
  const sec = (s % 60).toString().padStart(2, '0')
  return `${m}:${sec}`
}

export const maskPhone = (phone: string) => {
  if (!phone) return ''

  return (
    phone.slice(0, 2) +
    '*'.repeat(Math.max(phone.length - 4, 4)) +
    phone.slice(-2)
  )
}

type OtpKey =
  | typeof AUTH_TEXTS.SESSION_VARIABLES.SMS_OTP
  | typeof AUTH_TEXTS.SESSION_VARIABLES.EMAIL_OTP
export const storeOtp = (key: OtpKey) => {
  if (typeof window === 'undefined') {
    return { otp: '', expiry: 0 }
  }

  const otp = generateOtp()
  const expiry = getExpiry()

  sessionStorage.setItem(key, otp)
  sessionStorage.setItem(`${key}_expires`, expiry.toString())

  return { otp, expiry }
}


export const downloadTextFile = (filename: string, content: string) => {
  if (typeof window === 'undefined') return

  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()

  URL.revokeObjectURL(url)
}


export const copyToClipboard = async (text: string) => {
  if (typeof window === 'undefined') return false

  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Copy failed', error)
    return false
  }
}

