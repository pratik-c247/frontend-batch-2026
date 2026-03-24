'use client'
import { SetupAuthenticator } from '@/features/auth/mfa/setup/AuthenticatorSetup'
import { SetupEmail } from '@/features/auth/mfa/setup/SetupEmail'
import { SetupRecoveryCodes } from '@/features/auth/mfa/setup/SetupRecoveryCodes'
import { SetupSms } from '@/features/auth/mfa/setup/SetUpSms'
import { useParams } from 'next/navigation'

export default function SetupPage() {
  const { method } = useParams()

  const renderComponent = () => {
    switch (method) {
      case 'email':
        return <SetupEmail />
      case 'sms':
        return <SetupSms />
      case 'authenticator':
        return <SetupAuthenticator />
      case 'recovery-codes':
        return <SetupRecoveryCodes />
      default:
        return <div>Invalid method</div>
    }
  }

  return <>{renderComponent()}</>
}





