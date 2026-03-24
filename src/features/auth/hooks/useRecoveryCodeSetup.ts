import { notify } from '@/constant/authMessages'
import type { User } from '@/types/auth.types'
import { generateCodes } from '@/utils/generateCode'
import { getUserByEmail, saveUser } from '@/utils/indexedDB'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const useRecoveryCodeSetup = () => {
  const router = useRouter()
  const [codes, setCodes] = useState<string[]>([])
  const [generated, setGenerated] = useState(false)

  const handleGenerate = async () => {
    const newCodes = generateCodes()
    const email = localStorage.getItem('currentUserEmail') || ''
    const user: User = await getUserByEmail(email)
    if (!user) return

    if (user.mfa.recoveryCodes) {
      notify.error('Recovery codes are already generated.')
      return
    }

    const codesMap = newCodes.map((code) => ({ code, used: false }))
    await saveUser({
      ...user,
      mfa: { ...user.mfa, recoveryCodes: codesMap },
    })

    setCodes(newCodes)
    setGenerated(true)
    notify.success('Recovery codes generated!')
  }

  const handleDownload = () => {
    const text = codes.join('\n')
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'recovery-codes.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(codes.join('\n'))
    notify.success('Codes copied to clipboard!')
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
