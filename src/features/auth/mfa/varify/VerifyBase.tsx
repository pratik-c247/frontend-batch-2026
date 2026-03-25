import { BUTTON_TYPES } from '@/constant/Input&ButtonTypes'
import styles from './VerifyShared.module.scss'
import { VARIANTS } from '@/constant/common'
import { ROUTES } from '@/constant/routes'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import { BUTTON_NAMES } from '@/constant/buttonNames'
import { codeValidation } from '@/validations/auth.validations'
import { TimerDisplay } from '../../TimerDisplay'
import { OtherMethodsBox } from '../OtherMethodsBox/OtherMethodsBox'
import { useEmailVerifyHook } from '@/auth/hooks/useEmailVerifyHook'

type VerifyHookReturn = ReturnType<typeof useEmailVerifyHook>

type VerifyBaseProps = VerifyHookReturn & {
  icon: React.ReactNode
  title: string
  subtitleBefore: string
  subtitleAfter: string
  onSendOtp: () => void
  maskedValue: string
  label: string
  currentMethod: string
  enabledMethods: string[]
}

export const VerifyBase = ({
  icon,
  title,
  subtitleBefore,
  subtitleAfter,
  maskedValue,
  otpSent,
  onSendOtp,
  onSubmit,
  handleSubmit,
  register,
  errors,
  router,
  timerStore,
  onResend,
  label,
  enabledMethods,
  currentMethod,
  hasRecoveryCodes,
}: VerifyBaseProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.icon}>{icon}</span>
        <h4 className={styles.title}>{title}</h4>

        <p className={styles.subtitle}>
          {!otpSent ? subtitleBefore : subtitleAfter} ({maskedValue})
        </p>
      </div>

      <div className={styles.formBox}>
        {!otpSent ? (
          <div className={styles.btnRow}>
            <Button
              type={BUTTON_TYPES.BUTTON}
              variant={VARIANTS.OUTLINE}
              onClick={() => router.push(ROUTES.LOGIN)}
            >
              {BUTTON_NAMES.CANCEL}
            </Button>
            <Button onClick={onSendOtp}>{BUTTON_NAMES.SEND_CODE}</Button>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                label={label}
                {...register('code', codeValidation)}
                error={errors.code?.message}
              />
              <div className={styles.btnRow}>
                <Button
                  type={BUTTON_TYPES.BUTTON}
                  variant={VARIANTS.OUTLINE}
                  onClick={() => router.push(ROUTES.LOGIN)}
                >
                  {BUTTON_NAMES.CANCEL}
                </Button>
                <Button type={BUTTON_TYPES.SUBMIT}>
                  {BUTTON_NAMES.SUBMIT}
                </Button>
              </div>
            </form>

            <TimerDisplay timerStore={timerStore} onResend={onResend} />
          </>
        )}
      </div>

      <OtherMethodsBox
        enabledMethods={enabledMethods}
        currentMethod={currentMethod}
        hasRecoveryCodes={hasRecoveryCodes}
      />
    </div>
  )
}
