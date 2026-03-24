'use client'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import { MobileIcon } from '@/assets/icons/MobileIcon'
import styles from './VerifyShared.module.scss'
import { BUTTON_TYPES } from '@/constant/Input&ButtonTypes'
import { ROUTES } from '@/constant/routes'
import { OtherMethodsBox } from '@/auth/mfa/OtherMethodsBox/OtherMethodsBox'
import { useVerifyAuthenticatorHook } from '@/auth/hooks/useVerifyAuthenticatorHook'
import { VARIANTS } from '@/constant/common'
import { codeValidation } from '@/validations/auth.validations'
import { LABELS } from '@/constant/labels'
import { BUTTON_NAMES } from '@/constant/buttonNames'
import { AUTH_TEXTS } from '@/auth/auth.constant'

export const VerifyAuthenticator = () => {
  const {
    router,
    register,
    handleSubmit,

    onSubmit,
    errors,
    user,
    hasRecoveryCodes,
  } = useVerifyAuthenticatorHook()

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.icon}>
            <MobileIcon />
          </span>
          <h4 className={styles.title}>{LABELS.MULTI_FACTOR_AUTHENTICATION}</h4>
          <p className={styles.subtitle}>
            {AUTH_TEXTS.VERIFY_AUTHENTICAOR.YOU_WILL_RECEIVE_THE_TOTP}{' '}
            <span className={styles.highlight}>
              {AUTH_TEXTS.VERIFY_AUTHENTICAOR.AUTHENTICATOR_APP}
            </span>
          </p>
        </div>

        <div className={styles.formBox}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Input
              label={LABELS.CODE_INPUT_LABEL}
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
              <Button type={BUTTON_TYPES.SUBMIT} className={styles.submitBtn}>
                {BUTTON_NAMES.SUBMIT}
              </Button>
            </div>
          </form>
        </div>

        <OtherMethodsBox
          enabledMethods={user?.mfaEnabled || []}
          currentMethod="authenticator"
          hasRecoveryCodes={hasRecoveryCodes}
        />
      </div>
    </div>
  )
}
