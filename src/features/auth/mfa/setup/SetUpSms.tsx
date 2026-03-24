'use client'
import { Controller } from 'react-hook-form'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import styles from './SetupSms.module.scss'
import ReCAPTCHA from 'react-google-recaptcha'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { SmsIcon } from '@/assets/icons/SmsIcon'
import { BUTTON_TYPES } from '@/constant/Input&ButtonTypes'
import { SetupOtherMethodsBox } from '../setupOtherMethodsBox/SetupOtherMethodBox'
import router from 'next/router'
import { useSmsSetupHook } from '../../hooks/useSmsSetupHook'
import { formatTime } from '@/utils/helpers'
import { VARIANTS } from '@/constant/common'
import { AUTH_TEXTS } from '../../auth.constant'
import { BUTTON_NAMES } from '@/constant/buttonNames'
import { codeValidation } from '@/validations/auth.validations'
import { LABELS } from '@/constant/labels'

export const SetupSms = () => {
  const {
    phone,
    timeLeft,
    step,
    phoneForm,
    otpForm,
    onResend,
    onVerify,

    onSendCode,
  } = useSmsSetupHook()
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.icon}>
            <SmsIcon size={48} />
          </span>
          <h4 className={styles.title}>{AUTH_TEXTS.SETUP_SMS.TITLE}</h4>
          <p className={styles.subtitle}>{AUTH_TEXTS.SETUP_SMS.SUBTITLE}</p>
        </div>

        {step === 'phone' && (
          <div className={styles.formBox}>
            <form
              onSubmit={phoneForm.handleSubmit(onSendCode)}
              className={styles.form}
            >
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>
                  {AUTH_TEXTS.SETUP_SMS.PHONE_LABEL}
                </label>
                <Controller
                  name="phone"
                  control={phoneForm.control}
                  rules={{
                    required: AUTH_TEXTS.SETUP_SMS.PHONE_VALIDATION.REQUIRED,
                  }}
                  render={({ field }) => (
                    <PhoneInput
                      country={'in'}
                      value={field.value}
                      onChange={(value) => field.onChange('+' + value)}
                      inputStyle={{ width: '100%' }}
                    />
                  )}
                />
                {phoneForm.formState.errors.phone && (
                  <span className={styles.errorText}>
                    {phoneForm.formState.errors.phone.message}
                  </span>
                )}
              </div>
              <div className={styles.captchaBox}>
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
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
                <Button type={BUTTON_TYPES.SUBMIT} className={styles.submitBtn}>
         {BUTTON_NAMES.SEND_CODE}
                </Button>
              </div>
            </form>
          </div>
        )}

        {step === 'verify' && (
          <div className={styles.formBox}>
            <p className={styles.otpNote}>{AUTH_TEXTS.SETUP_SMS.OTP_NOTE}</p>
            <p className={styles.otpPhone}>{phone}</p>
            <form
              onSubmit={otpForm.handleSubmit(onVerify)}
              className={styles.form}
            >
              <Input
                label={AUTH_TEXTS.SETUP_SMS.CODE_INPUT_LABEL}
                placeholder=""
                {...otpForm.register('code', codeValidation)}
                error={otpForm.formState.errors.code?.message}
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
                <Button type={BUTTON_TYPES.SUBMIT} className={styles.submitBtn}>
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
              <Button
                variant={VARIANTS.GHOST}
                type={BUTTON_TYPES.BUTTON}
                className={styles.resendLink}
                onClick={onResend}
                disabled={timeLeft > 0}
              >
                {BUTTON_NAMES.RESEND_CODE}
              </Button>
            </div>
          </div>
        )}

        <SetupOtherMethodsBox currentMethod="sms" showRecovery={false} />
      </div>
    </div>
  )
}
