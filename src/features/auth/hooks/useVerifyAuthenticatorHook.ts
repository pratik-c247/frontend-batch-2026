import { AUTH_MESSAGES, notify } from '@/constant/authMessages'
import { ROUTES } from '@/constant/routes'
import type { RecoveryCode, User } from '@/types/auth.types'
import { getUserByEmail } from '@/utils/indexedDB'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as OTPAuth from 'otpauth'
import { LOCAL_VARIABLES } from '@/constant/localVariables'

type FormData = { code: string }

export const useVerifyAuthenticatorHook = () => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  useEffect(() => {
    const load = async () => {
      const email = localStorage.getItem(LOCAL_VARIABLES.CURRENT_USER_EMAIL) || ''
      const u: User = await getUserByEmail(email)
      if (!u) {
        router.push(ROUTES.LOGIN)
        return
      }
      setUser(u)
    }
    load()
  }, [])

  const onSubmit = async (data: FormData) => {
    if (!user) return
    if (!user.mfa?.authenticator?.secret) {
      notify.error(AUTH_MESSAGES.AUTHENTICATOR_NOT_SET_PROPERLY)
      return
    }
    const totp = new OTPAuth.TOTP({
      issuer: 'Auth-MFA',
      secret: OTPAuth.Secret.fromBase32(user.mfa.authenticator.secret),
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
    })

    const delta = totp.validate({ token: data.code.trim(), window: 1 })
    if (delta === null) {
      notify.error(AUTH_MESSAGES.INVALID_CODE)
      return
    }

    notify.success(AUTH_MESSAGES.LOGIN_SUCCESS)
    router.push(ROUTES.DASHBOARD.ROOT)
  }

  const hasRecoveryCodes = (user?.mfa?.recoveryCodes || []).some(
    (c: RecoveryCode) => !c.used,
  )

  return {
    router,
    form: {
      register,
      onSubmit,
      errors,
      handleSubmit,
    },
    hasRecoveryCodes,
    user,
  }
}
