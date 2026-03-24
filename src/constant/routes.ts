export const ROUTES = {
  LOGIN: '/login',
  SIGNUP: '/sign-up',
  MFA: {
    MFA_SETUP: '/mfa/setup',
    ACTIVATED: '/mfa/activated',
    AUTHENTICATOR_SETUP: '/mfa/authenticator/setup',
    EMAIL_SETUP: '/mfa/email/setup',
    SMS_SETUP: '/mfa/sms/setup',
    RECOVERY_CODES: '/mfa/recovery-codes/setup',
  },
  VERIFY: {
    ROOT: '/mfa/verify',
    APP: '/mfa/authenticator/verify',
    EMAIL: '/mfa/email/verify',
    SMS: '/mfa/sms/verify',
    RECOVERY: '/mfa/recovery-codes/verify',
  },
  DASHBOARD: {
   ROOT:'/dashboard'
 }
}
