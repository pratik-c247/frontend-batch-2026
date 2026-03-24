
const OTP_EXPIRY_SECONDS = Number(process.env.NEXT_PUBLIC_OTP_EXPIRY_SECONDS ?? 60)

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
