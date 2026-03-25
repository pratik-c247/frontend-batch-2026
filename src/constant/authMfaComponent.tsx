import { AuthenticatorIcon } from '@/assets/icons/AuthenticatorIcon'
import { SetupAuthenticator } from '@/features/auth/mfa/setup/AuthenticatorSetup'
import { SetupEmail } from '@/features/auth/mfa/setup/SetupEmail'
import { SetupRecoveryCodes } from '@/features/auth/mfa/setup/SetupRecoveryCodes'
import { SetupSms } from '@/features/auth/mfa/setup/SetUpSms'
import { VerifyAuthenticator } from '@/features/auth/mfa/varify/VerifyAuthenticator'
import { VerifyEmail } from '@/features/auth/mfa/varify/VerifyEmail'
import { VerifySms } from '@/features/auth/mfa/varify/VerifySms'
import { ROUTES } from './routes'
import { EmailIcon } from '@/assets/icons/EmailIcon'
import { SmsIcon } from '@/assets/icons/SmsIcon'

export const MFA_VERIFY_COMPONENTS = {
  email: VerifyEmail,
  sms: VerifySms,
  authenticator: VerifyAuthenticator,
  'recovery-codes': SetupRecoveryCodes,
} as const

export const MFA_SETUP_COMPONENTS = {
  email: SetupEmail,
  sms: SetupSms,
  authenticator: SetupAuthenticator,
  'recovery-codes': SetupRecoveryCodes,
} as const


export const mfaMethods = [
  {
    id: 'authenticator',
    icon: <AuthenticatorIcon />,
    label: 'Authenticator App',
    recommended: true,
    description: 'Use an authenticator app to generate a one-time code.',
    route: ROUTES.MFA.AUTHENTICATOR_SETUP,
  },
  {
    id: 'email',
    icon: <EmailIcon />,
    label: 'Email',
    recommended: false,
    description: 'Use email to generate a one-time code.',
    route: ROUTES.MFA.EMAIL_SETUP,
  },
  {
    id: 'sms',
    icon: <SmsIcon />,
    label: 'SMS/Text Message',
    recommended: false,
    description: 'Use a mobile number to generate a one-time code.',
    route: ROUTES.MFA.SMS_SETUP,
  },
]
