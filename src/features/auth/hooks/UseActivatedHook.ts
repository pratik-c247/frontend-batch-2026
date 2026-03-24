import { LOCAL_VARIABLES } from '@/constant/localVariables'
import type { MFAType, User } from '@/types/auth.types'
import { getUserByEmail } from '@/utils/indexedDB'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const useActivatedHook = () => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [lastMethod, setLastMethod] = useState<
    'email' | 'sms' | 'authenticator'
  >('email')

  useEffect(() => {
    const fetchUser = async () => {
      const email = localStorage.getItem(LOCAL_VARIABLES.CURRENT_USER_EMAIL) || ''
      const u: User = await getUserByEmail(email)

      setUser(u)

      const enabled: string[] = u?.mfaEnabled || []
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
