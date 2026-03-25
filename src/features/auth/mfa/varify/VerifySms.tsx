'use client'
import { SmsIcon } from '@/assets/icons/SmsIcon'
import { maskPhone } from '@/utils/helpers'
import { useSmsVerifyHook } from '@/auth/hooks/useSmsVerifyHook'
import { LABELS } from '@/constant/labels'
import { AUTH_TEXTS } from '@/auth/auth.constant'
import { VerifyBase } from './VerifyBase'
import { useMemo } from 'react'

export const VerifySms = () => {
  const hook = useSmsVerifyHook()
   const icon = useMemo(() => <SmsIcon size={48} />, [])
  return (
    <VerifyBase
      icon={icon}
      title={LABELS.MULTI_FACTOR_AUTHENTICATION}
      subtitleBefore={AUTH_TEXTS.VERIFY_SMS.WHEN_YOUR_PHONE_READY}
      subtitleAfter={AUTH_TEXTS.VERIFY_SMS.YOU_WILL_RECIEVE_ONE_TIME_CODE}
      maskedValue={maskPhone(hook.phone)}
      onSendOtp={hook.sendOtp}
      {...hook}
      label={LABELS.CODE_INPUT_LABEL_SMS}
      enabledMethods={hook.user?.mfaEnabled || []}
      currentMethod="sms"
    />
  )
}
