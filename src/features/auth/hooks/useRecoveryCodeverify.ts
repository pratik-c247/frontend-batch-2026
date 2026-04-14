import { AUTH_MESSAGES, notify } from '@/constant/authMessages'
import { ROUTES } from '@/constant/routes'
import type { RecoveryCode, User } from '@/types/auth.types'
import { getUserByEmail } from '@/utils/indexedDB'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { verifyRecoveryCode } from '@/utils/recoveryCodeHelper'
import { LOCAL_VARIABLES } from '@/constant/localVariables'
import { LOGIN_KEY } from '@/constant/common'
import { getSecureItem } from '@/utils/encryptAndDecrypt'

type FormData = { recoveryCode: string }
export const useRecoveryCodeVerify = () => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  useEffect(() => {
    const load = async () => {
      const email = getSecureItem(LOCAL_VARIABLES.CURRENT_USER_EMAIL) || ''
      const u: User = await getUserByEmail(email)
      if (!u) {
        router.push(ROUTES.LOGIN)
        return
      }

      const hasCodes = (u?.mfa?.recoveryCodes || []).some(
        (c: RecoveryCode) => !c.used,
      )
      if (!hasCodes) {
        notify.error(AUTH_MESSAGES.NO_RECOVERY_CODES_GENERATED)
        router.back()
        return
      }
      setUser(u)
    }
    load()
  }, [])

  const onSubmit = async (data: FormData) => {
    const email = getSecureItem(LOCAL_VARIABLES.CURRENT_USER_EMAIL) || ''
    const result = await verifyRecoveryCode(email, data.recoveryCode)

    if (!result.success) {
      notify.error(result.message)
      return
    }
    notify.success(AUTH_MESSAGES.RECOVERY_CODE_ACCEPTED)
      localStorage.setItem(LOGIN_KEY, Date.now().toString())
    router.push(ROUTES.DASHBOARD.ROOT)
  }

  return {
    register,
    handleSubmit,
    onSubmit,
    router,
    errors,
    user,
  }
}
