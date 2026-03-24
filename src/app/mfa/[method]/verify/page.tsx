'use client'

import { SetupRecoveryCodes } from '@/features/auth/mfa/setup/SetupRecoveryCodes'
import { VerifyAuthenticator } from '@/features/auth/mfa/varify/VerifyAuthenticator'
import { VerifyEmail } from '@/features/auth/mfa/varify/VerifyEmail'
import { VerifySms } from '@/features/auth/mfa/varify/VerifySms'
import { useParams } from 'next/navigation'

export default function VerifyPage() {
  const { method } = useParams()

  const renderComponent = () => {
    switch (method) {
      case 'email':
        return <VerifyEmail />
      case 'sms':
        return <VerifySms />
      case 'authenticator':
        return <VerifyAuthenticator />
      case 'recovery-codes':
        return <SetupRecoveryCodes/>
    }
  }

  return <>{renderComponent()}</>
}
