'use client'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import { SmsIcon } from '@/assets/icons/SmsIcon'
import styles from './VerifyShared.module.scss'
import { BUTTON_TYPES } from '@/constant/Input&ButtonTypes'
import { ROUTES } from '@/constant/routes'
import { OtherMethodsBox } from '../OtherMethodsBox/OtherMethodsBox'
import { formatTime, maskPhone } from '@/utils/helpers'
import { useSmsVerifyHook } from '@/auth/hooks/useSmsVerifyHook'
import { VARIANTS } from '@/constant/common'
import { BUTTON_NAMES } from '@/constant/buttonNames'
import { LABELS } from '@/constant/labels'
import { codeValidation } from '@/validations/auth.validations'
import { AUTH_TEXTS } from '@/auth/auth.constant'

export const VerifySms = () => {
  const {
    router,
    handleSubmit,
    register,
    errors,
    otpSent,
    phone,
    sendOtp,
    onSubmit,
    timeLeft,
    onResend,
    user,
    hasRecoveryCodes,
  } = useSmsVerifyHook()

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.icon}>
            <SmsIcon size={48} />
          </span>
          <h4 className={styles.title}>{LABELS.MULTI_FACTOR_AUTHENTICATION}</h4>

          {!otpSent ? (
            <p className={styles.subtitle}>
              {AUTH_TEXTS.VERIFY_SMS.WHEN_YOUR_PHONE_READY}{' '}
              <span className={styles.highlight}>SMS</span> ({maskPhone(phone)})
            </p>
          ) : (
            <p className={styles.subtitle}>
              {AUTH_TEXTS.VERIFY_SMS.YOU_WILL_RECIEVE_ONE_TIME_CODE} (
              {maskPhone(phone)})
            </p>
          )}
        </div>

        <div className={styles.formBox}>
          {!otpSent ? (
            <div className={styles.btnRow}>
              <Button
                type={BUTTON_TYPES.BUTTON}
                variant={VARIANTS.OUTLINE}
                className={styles.cancelBtn}
                onClick={() => router.push(ROUTES.LOGIN)}
              >
                {BUTTON_NAMES.CANCEL}
              </Button>
              <Button
                type={BUTTON_TYPES.BUTTON}
                className={styles.submitBtn}
                onClick={sendOtp}
              >
                {BUTTON_NAMES.SEND_CODE}
              </Button>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <Input
                  label={LABELS.CODE_INPUT_LABEL_SMS}
                  placeholder=""
                  {...register('code', codeValidation)}
                  error={errors.code?.message}
                />
                <div className={styles.btnRow}>
                  <Button
                    type={BUTTON_TYPES.BUTTON}
                    variant={VARIANTS.OUTLINE}
                    className={styles.cancelBtn}
                    onClick={() => router.push(ROUTES.LOGIN)}
                  >
                    {BUTTON_NAMES.CANCEL}
                  </Button>
                  <Button
                    type={BUTTON_TYPES.SUBMIT}
                    className={styles.submitBtn}
                  >
                    {BUTTON_NAMES.SUBMIT}
                  </Button>
                </div>
              </form>

              <div className={styles.timerRow}>
                <span className={styles.timerText}>
                  {LABELS.TIMER_LABEL}
                  <span className={styles.timerValue}>
                    {formatTime(timeLeft)}
                  </span>
                </span>
              </div>
              <div className={styles.resendRow}>
                <span className={styles.resendText}>{LABELS.RESEND_TEXT}</span>
                <Button
                  variant={VARIANTS.OUTLINE}
                  type={BUTTON_TYPES.BUTTON}
                  className={styles.resendLink}
                  onClick={onResend}
                  disabled={timeLeft > 0}
                >
                  {BUTTON_NAMES.RESEND_CODE}
                </Button>
              </div>
            </>
          )}
        </div>

        <OtherMethodsBox
          enabledMethods={user?.mfaEnabled || []}
          currentMethod="sms"
          hasRecoveryCodes={hasRecoveryCodes}
        />
      </div>
    </div>
  )
}
