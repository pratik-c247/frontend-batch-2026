'use client'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import styles from './SetupEmail.module.scss'
import ReCAPTCHA from 'react-google-recaptcha'
import { EmailIcon } from '@/assets/icons/EmailIcon'
import { BUTTON_TYPES } from '@/constant/Input&ButtonTypes'
import { SetupOtherMethodsBox } from '../setupOtherMethodsBox/SetupOtherMethodBox'
import { useEmailSetupHook } from '../../hooks/useEmailSetupHook'
import { maskEmail } from '@/utils/maskEmail'
import { formatTime } from '@/utils/helpers'
import { VARIANTS } from '@/constant/common'
import { AUTH_TEXTS } from '../../auth.constant'
import { codeValidation } from '@/validations/auth.validations'
import { BUTTON_NAMES } from '@/constant/buttonNames'
import { LABELS } from '@/constant/labels'


export const SetupEmail = () => {
  const {
    timeLeft,
    router,
    setIsVerified,
    userEmail,
    onResend,
    otpSent,
    handleSubmit,
    register,
    onSubmit,
    errors,

    sendOtp,
    isVerified,
  } = useEmailSetupHook()

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.icon}>
            <EmailIcon size={56} />
          </span>
          <h4 className={styles.title}>{AUTH_TEXTS.SETUP_EMAIL.TITLE}</h4>
          <p className={styles.subtitle}>{AUTH_TEXTS.SETUP_EMAIL.SUBTITLE}</p>
        </div>

        <div className={styles.formBox}>
          <p className={styles.otpNote}>{AUTH_TEXTS.SETUP_EMAIL.OTP_NOTE}</p>
          {userEmail && (
            <p className={styles.otpEmail}>{maskEmail(userEmail)}</p>
          )}
          {otpSent && (
            <>
              <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <Input
                  label={AUTH_TEXTS.SETUP_EMAIL.CODE_INPUT_LABEL}
                  placeholder=""
                  {...register('code',codeValidation)}
                  error={errors.code?.message}
                />
                <div className={styles.btnRow}>
                  <Button
                    type={BUTTON_TYPES.BUTTON}
                    variant={VARIANTS.OUTLINE}
                    className={styles.cancelBtn}
                    onClick={() => router.back()}
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
                <span className={styles.resendText}>
                {LABELS.RESEND_TEXT}
                </span>
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
          {!otpSent && (
            <>
              <div className={styles.captchaBox}>
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                  onChange={() => setIsVerified(true)}
                />
              </div>
              <div className={styles.btnRow}>
                <Button
                  type={BUTTON_TYPES.BUTTON}
                  variant={VARIANTS.OUTLINE}
                  className={styles.cancelBtn}
                  onClick={() => router.back()}
                >
                   {BUTTON_NAMES.CANCEL}
                </Button>
                <Button
                  type={BUTTON_TYPES.BUTTON}
                  className={styles.submitBtn}
                  disabled={!isVerified}
                  onClick={sendOtp}
                >
                  {BUTTON_NAMES.SEND_CODE}
                </Button>
              </div>
            </>
          )}
        </div>

        <SetupOtherMethodsBox currentMethod="email" showRecovery={false} />
      </div>
    </div>
  )
}
