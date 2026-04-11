
import { BUTTON_TYPES } from '@/constant/Input&ButtonTypes'
import styles from './VerifyShared.module.scss'
import { VARIANTS } from '@/constant/common'
import { ROUTES } from '@/constant/routes'
import { Button } from '@/components/common/Button'
import { BUTTON_NAMES } from '@/constant/buttonNames'
import { TimerDisplay } from '../../TimerDisplay'
import { OtherMethodsBox } from '../OtherMethodsBox/OtherMethodsBox'
import { useEmailVerifyHook } from '@/auth/hooks/useEmailVerifyHook'
import { memo } from 'react'
import { VerifyForm } from './VerifyForm'

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

export const VerifyBase = memo(
  ({
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

              <VerifyForm
                label={label}
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                onSubmit={onSubmit}
                router={router}
              />


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
  },
)

VerifyBase.displayName = 'VerifyBase'
