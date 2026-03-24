'use client'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import styles from './VerifyShared.module.scss'
import { BUTTON_TYPES } from '@/constant/Input&ButtonTypes'
import { OtherMethodsBox } from '../OtherMethodsBox/OtherMethodsBox'
import { KeyIcon } from '@/assets/icons/KeyIcon'
import { useRecoveryCodeVerify } from '../../hooks/useRecoveryCodeverify'
import { VARIANTS } from '@/constant/common'
import { BUTTON_NAMES } from '@/constant/buttonNames'
import { recoveryCode } from '@/validations/auth.validations'
import { LABELS } from '@/constant/labels'
import { AUTH_TEXTS } from '../../auth.constant'

export const VerifyRecoveryCode = () => {
  const { register, handleSubmit, onSubmit, router, errors, user } =
    useRecoveryCodeVerify()

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.icon}>
            <KeyIcon />
          </span>
          <h4 className={styles.title}>{LABELS.MULTI_FACTOR_AUTHENTICATION}</h4>
          <p className={styles.subtitle}>
            {AUTH_TEXTS.VERIFY_RECOVERY_CODE.IF_YOU_ARE_UNABLE_TO_ACCESS}
          </p>
        </div>

        <div className={styles.formBox}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Input
              label={LABELS.CODE_INPUT_LABEL_RECOVERY_CODE}
              placeholder=""
              {...register('recoveryCode', recoveryCode)}
              error={errors.recoveryCode?.message}
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
        </div>

        <OtherMethodsBox
          enabledMethods={user?.mfaEnabled || []}
          currentMethod="recovery"
          hasRecoveryCodes={false}
        />
      </div>
    </div>
  )
}
