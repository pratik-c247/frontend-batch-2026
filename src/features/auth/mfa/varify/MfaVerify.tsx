'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getUserByEmail } from '@/utils/indexedDB'
import { ROUTES } from '@/constant/routes'
import type { User } from '@/types/auth.types'
import { LOCAL_VARIABLES } from '@/constant/localVariables'
import { AUTH_TEXTS } from '../../auth.constant'

export default function MfaVerifyRouter() {
  const router = useRouter()

  useEffect(() => {
    const go = async () => {
      const email =
        localStorage.getItem(LOCAL_VARIABLES.CURRENT_USER_EMAIL) || ''
      const user: User = await getUserByEmail(email)
      if (!user) {
        router.push(ROUTES.LOGIN)
        return
      }

      const mfaEnabled: string[] = user?.mfaEnabled || []
      if (mfaEnabled.length === 0) {
        router.push(ROUTES.MFA.MFA_SETUP)
        return
      }

      if (mfaEnabled.includes(AUTH_TEXTS.MFA.SETUP_WAYS.AUTHENTICATOR))
        router.push(ROUTES.VERIFY.APP)
      else if (mfaEnabled.includes(AUTH_TEXTS.MFA.SETUP_WAYS.EMAIL))
        router.push(ROUTES.VERIFY.EMAIL)
      else if (mfaEnabled.includes(AUTH_TEXTS.MFA.SETUP_WAYS.SMS))
        router.push(ROUTES.VERIFY.SMS)
    }
    go()
  }, [])

  return null
}
