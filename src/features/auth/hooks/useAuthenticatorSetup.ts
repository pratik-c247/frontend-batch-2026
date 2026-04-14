import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as OTPAuth from 'otpauth'
import { AUTH_MESSAGES, notify } from '@/constant/authMessages'
import type { User } from '@/types/auth.types'
import { getUserByEmail, saveUser } from '@/utils/indexedDB'
import { ROUTES } from '@/constant/routes'
import { LOCAL_VARIABLES } from '@/constant/localVariables'
import { getSecureItem } from '@/utils/encryptAndDecrypt'
type FormData = {
  code: string
}
export const useAuthenticatorSetup = () => {
  const router = useRouter()

  const [{ secret, otpUri }] = useState(() => {
    const email =
      typeof window !== 'undefined'
        ? getSecureItem(LOCAL_VARIABLES.CURRENT_USER_EMAIL) || ''
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
        notify.error(AUTH_MESSAGES.INVALID_CODE)
        return
      }

      const email = getSecureItem(LOCAL_VARIABLES.CURRENT_USER_EMAIL) || ''
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

      notify.success(AUTH_MESSAGES.AUTHENTICATOR_APP_CONFIGURED)
      router.push(ROUTES.MFA.ACTIVATED)
    } catch (error) {
      notify.error(AUTH_MESSAGES.SOMETHING_WENT_WRONG)
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    otpUri,
    router,
    secret,
  }
}
