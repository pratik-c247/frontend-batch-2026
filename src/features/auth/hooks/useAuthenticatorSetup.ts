import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as OTPAuth from 'otpauth'
import { notify } from '@/constant/authMessages'
import type { User } from '@/types/auth.types'
import { getUserByEmail, saveUser } from '@/utils/indexedDB'
import { ROUTES } from '@/constant/routes'
type FormData = {
  code: string
}
export const useAuthenticatorSetup = () => {
  const router = useRouter()
  const [showSecret, setShowSecret] = useState(false)

  const [{ secret, otpUri }] = useState(() => {
    const email =
      typeof window !== 'undefined'
        ? localStorage.getItem('currentUserEmail') || ''
        : ''

    const totp = new OTPAuth.TOTP({
      issuer: 'Auth-MFA',
      label: email,
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
    })

    return {
      secret: totp.secret.base32,
      otpUri: totp.toString(),
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      const totp = new OTPAuth.TOTP({
        issuer: 'Auth-MFA',
        secret: OTPAuth.Secret.fromBase32(secret),
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
      })

      const delta = totp.validate({ token: data.code.trim(), window: 1 })
      if (delta === null) {
        notify.error('Invalid code. Please try again.')
        return
      }

      const email = localStorage.getItem('currentUserEmail') || ''
      const user: User = await getUserByEmail(email)
      if (!user) return

      await saveUser({
        ...user,
        mfaEnabled: Array.from(
          new Set([...(user.mfaEnabled || []), 'authenticator']),
        ),
        mfa: {
          ...user.mfa,
          authenticator: { secret, verified: true },
        },
      })

      notify.success('Authenticator app configured!')
      router.push(ROUTES.MFA.ACTIVATED)
    } catch (error) {
      console.error('TOTP verify error:', error)
      notify.error('Something went wrong.')
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    showSecret,
    setShowSecret,
    otpUri,
    router,
    secret,
  }
}
