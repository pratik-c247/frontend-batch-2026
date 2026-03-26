import { AUTH_MESSAGES, notify } from '@/constant/authMessages'
import { LOCAL_VARIABLES } from '@/constant/localVariables'
import type { User } from '@/types/auth.types'
import { generateCodes } from '@/utils/generateCode'
import { copyToClipboard, downloadTextFile } from '@/utils/helpers'
import { getUserByEmail, saveUser } from '@/utils/indexedDB'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const useRecoveryCodeSetup = () => {
  const router = useRouter()
  const [codes, setCodes] = useState<string[]>([])
  const [generated, setGenerated] = useState(false)

  const handleGenerate = async () => {
    const newCodes = generateCodes()
    const email = localStorage.getItem(LOCAL_VARIABLES.CURRENT_USER_EMAIL) || ''
    const user: User = await getUserByEmail(email)
    if (!user) return

    if (user.mfa.recoveryCodes) {
      notify.error(AUTH_MESSAGES.CODE_ALREADY_GENERATED)
      return
    }

    const codesMap = newCodes.map((code) => ({ code, used: false }))
    await saveUser({
      ...user,
      mfa: { ...user.mfa, recoveryCodes: codesMap },
    })

    setCodes(newCodes)
    setGenerated(true)
    notify.success(AUTH_MESSAGES.RECOVERY_CODE_GENERATED)
  }

  const handleDownload = () => {
    downloadTextFile('recovery-codes.txt', codes.join('\n'))
  }

  const handleCopy = async () => {
    const success = await copyToClipboard(codes.join('\n'))

    if (success) {
      notify.success(AUTH_MESSAGES.CODE_COPY_TO_CLIPBOARD)
    } else {
      notify.error(AUTH_MESSAGES.FAILED_TO_COPY)
    }
  }

  const leftCodes = codes.slice(0, 5)
  const rightCodes = codes.slice(5, 10)

  return {
    router,
    generated,
    handleGenerate,
    handleCopy,
    leftCodes,
    rightCodes,
    handleDownload,
  }
}
