'use client'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import { EmailIcon } from '@/assets/icons/EmailIcon'
import styles from './VerifyShared.module.scss'
import { BUTTON_TYPES } from '@/constant/Input&ButtonTypes'
import { ROUTES } from '@/constant/routes'
import { OtherMethodsBox } from '../OtherMethodsBox/OtherMethodsBox'
import { formatTime } from '@/utils/helpers'
import { maskEmail } from '@/utils/maskEmail'
import { useEmailVerifyHook } from '../../hooks/useEmailVerifyHook'
import { VARIANTS } from '@/constant/common'
import { BUTTON_NAMES } from '@/constant/buttonNames'
import { AUTH_TEXTS } from '../../auth.constant'
import { LABELS } from '@/constant/labels'
import { codeValidation } from '@/validations/auth.validations'

export const VerifyEmail = () => {
  const {
    onResend,
    timeLeft,
    hasRecoveryCodes,
    router,
    otpSent,
    user,
    sendOtp,
    handleSubmit,
    onSubmit,
    register,
    errors,
  } = useEmailVerifyHook()

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.icon}>
            <EmailIcon size={56} />
          </span>
          <h4 className={styles.title}>
            {LABELS.MULTI_FACTOR_AUTHENTICATION}
          </h4>

          {!otpSent ? (
            <p className={styles.subtitle}>
              {AUTH_TEXTS.VERIFY_EMAIL.WHEN_YOU_ARE_READY}
              <span className={styles.highlight}>Email</span> (
              {maskEmail(user?.email || '')})
            </p>
          ) : (
            <p className={styles.subtitle}>
              {AUTH_TEXTS.VERIFY_EMAIL.YOU_WILL_RECEIVE_ONE_TIME_CODE}(
              {maskEmail(user?.email || '')})
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
                  label={LABELS.CODE_INPUT_LABEL_EMAIL}
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
                <button
                  type={BUTTON_TYPES.BUTTON}
                  className={styles.resendLink}
                  onClick={onResend}
                  disabled={timeLeft > 0}
                >
                  {BUTTON_NAMES.RESEND_CODE}
                </button>
              </div>
            </>
          )}
        </div>

        <OtherMethodsBox
          enabledMethods={user?.mfaEnabled || []}
          currentMethod="email"
          hasRecoveryCodes={hasRecoveryCodes}
        />
      </div>
    </div>
  )
}
