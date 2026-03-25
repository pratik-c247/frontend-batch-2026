
'use client'
import { EmailIcon } from '@/assets/icons/EmailIcon'
import { maskEmail } from '@/utils/maskEmail'
import { useEmailVerifyHook } from '@/auth/hooks/useEmailVerifyHook'
import { AUTH_TEXTS } from '@/auth/auth.constant'
import { LABELS } from '@/constant/labels'
import { VerifyBase } from './VerifyBase'

export const VerifyEmail = () => {
  const hook = useEmailVerifyHook()

  return (
    <VerifyBase
      icon={<EmailIcon size={56} />}
      title={LABELS.MULTI_FACTOR_AUTHENTICATION}
      subtitleBefore={AUTH_TEXTS.VERIFY_EMAIL.WHEN_YOU_ARE_READY}
      subtitleAfter={AUTH_TEXTS.VERIFY_EMAIL.YOU_WILL_RECEIVE_ONE_TIME_CODE}
      maskedValue={maskEmail(hook.user?.email || '')}
      onSendOtp={hook.sendOtp}
      {...hook}
      label={LABELS.CODE_INPUT_LABEL_EMAIL}
      enabledMethods={hook.user?.mfaEnabled || []}
      currentMethod="email"
    />
  )
}




