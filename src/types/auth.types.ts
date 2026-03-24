export type LoginFormData = {
  email: string
  password: string
}
export interface RecoveryCode {
  code: string
  used: boolean
}

export interface AuthenticatorMFA {
  secret: string | null
  verified: boolean
}

export interface EmailMFA {
  otp: string | null
  expiresAt: number | null
  verified: boolean
}

export interface SmsMFA {
  otp: string | null
  expiresAt: number | null
  verified: boolean
  phone?: string 
}

export interface MFA {
  authenticator: AuthenticatorMFA
  email: EmailMFA
  sms: SmsMFA
  recoveryCodes?: RecoveryCode[]
}

export type MFAType = 'sms' | 'email' | 'authenticator'

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string

  confirmPassword?: string

  mfaEnabled: MFAType[]
  mfa: MFA

  createdAt: number
}
