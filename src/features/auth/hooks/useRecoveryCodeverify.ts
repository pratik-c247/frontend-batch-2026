import { notify } from '@/constant/authMessages'
import { ROUTES } from '@/constant/routes'
import type { RecoveryCode, User } from '@/types/auth.types'
import { getUserByEmail } from '@/utils/indexedDB'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { verifyRecoveryCode } from '@/utils/recoveryCodeHelper'

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
      const email = localStorage.getItem('currentUserEmail') || ''
      const u: User = await getUserByEmail(email)
      if (!u) {
        router.push(ROUTES.LOGIN)
        return
      }

      const hasCodes = (u?.mfa?.recoveryCodes || []).some(
        (c: RecoveryCode) => !c.used,
      )
      if (!hasCodes) {
        notify.error('No recovery codes generated. Please use another method.')
        router.back()
        return
      }
      setUser(u)
    }
    load()
  }, [])

  const onSubmit = async (data: FormData) => {
    const email = localStorage.getItem('currentUserEmail') || ''
    const result = await verifyRecoveryCode(email, data.recoveryCode)

    if (!result.success) {
      notify.error(result.message)
      return
    }
    notify.success('Recovery code accepted! Login successful.')
    router.push('/dashboard')
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
