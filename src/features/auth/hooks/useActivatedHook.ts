import { LOCAL_VARIABLES } from '@/constant/localVariables'
import type { MFAType, User } from '@/types/auth.types'
import { getUserByEmail } from '@/utils/indexedDB'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AUTH_TEXTS } from '@/auth/auth.constant'

export const useActivatedHook = () => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [lastMethod, setLastMethod] = useState<MFAType>(AUTH_TEXTS.MFA.SETUP_WAYS.EMAIL)

  useEffect(() => {
    const fetchUser = async () => {
      const email = localStorage.getItem(LOCAL_VARIABLES.CURRENT_USER_EMAIL) || ''
      const localUser: User = await getUserByEmail(email)

      setUser(localUser)

      const enabled: string[] = localUser?.mfaEnabled || []
      if (enabled.length > 0) {
        setLastMethod(enabled[enabled.length - 1] as MFAType)
      }
    }

    fetchUser()
  }, [])

  return {
    user,
    lastMethod,
    router,
    enabledMethods: user?.mfaEnabled || [],
  }
}
