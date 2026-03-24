'use client'
import styles from './MfaActivated.module.scss'
import { Button } from '@/components/common/Button'
import { EmailIcon } from '@/assets/icons/EmailIcon'
import { AuthenticatorIcon } from '@/assets/icons/AuthenticatorIcon'
import { SmsIcon } from '@/assets/icons/SmsIcon'
import { ROUTES } from '@/constant/routes'
import type { User } from '@/types/auth.types'
import { ActivatedIcon } from '@/assets/icons/ActivatedIcon'
import { SetupOtherMethodsBox } from '../setupOtherMethodsBox/SetupOtherMethodBox'
import { useActivatedHook } from '@/auth/hooks/UseActivatedHook'
import { maskEmail } from '@/utils/maskEmail'
import { VARIANTS } from '@/constant/common'
import { BUTTON_TYPES } from '@/constant/Input&ButtonTypes'
import { AUTH_TEXTS } from '@/auth/auth.constant'


export const MfaActivated = () => {
  const { user, lastMethod, router, enabledMethods } = useActivatedHook()

  const TEXTS = AUTH_TEXTS.MFA.ACTIVATED

  const METHOD_CONFIG = {
    email: {
      icon: <EmailIcon />,
      label: TEXTS.METHODS.EMAIL.LABEL,
      getDetail: (user: User) =>
        TEXTS.METHODS.EMAIL.DETAIL(maskEmail(user?.email || '')),
    },
    authenticator: {
      icon: <AuthenticatorIcon />,
      label: TEXTS.METHODS.AUTHENTICATOR.LABEL,
      getDetail: () => TEXTS.METHODS.AUTHENTICATOR.DETAIL,
    },
    sms: {
      icon: <SmsIcon />,
      label: TEXTS.METHODS.SMS.LABEL,
      getDetail: (user: User) =>
        TEXTS.METHODS.SMS.DETAIL(user?.mfa?.sms?.phone || ''),
    },
  }

  const configuredMethod =
    METHOD_CONFIG[lastMethod as keyof typeof METHOD_CONFIG]

  return (
    <div className={styles.container}>
      <div className={styles.successIcon}>
        <ActivatedIcon />
      </div>

      <h4 className={styles.title}>{TEXTS.TITLE}</h4>

      <p className={styles.subtitle}>
        {TEXTS.SUBTITLE(configuredMethod?.label || '')}
      </p>

      {configuredMethod && (
        <div className={styles.configuredCard}>
          <div className={styles.configuredHeader}>
            <span className={styles.configuredIcon}>
              {configuredMethod.icon}
            </span>
            <span className={styles.configuredLabel}>
              {configuredMethod.label}
            </span>
            <span className={styles.configuredBadge}>
              {TEXTS.CONFIGURED_BADGE}
            </span>
          </div>
          <p className={styles.configuredDetail}>
            {configuredMethod.getDetail(user!)}
          </p>
        </div>
      )}

      <Button
        className={styles.portalBtn}
        fullWidth
        onClick={() => router.push(ROUTES.DASHBOARD.ROOT)}
      >
        {TEXTS.PORTAL_BUTTON}
      </Button>

      <SetupOtherMethodsBox
        currentMethod={lastMethod as 'email' | 'sms' | 'authenticator'}
        enabledMethods={enabledMethods}
        showRecovery={false}
      />

      <div className={styles.recoveryBox}>
        <p className={styles.recoveryText}>
          <Button
            variant={VARIANTS.GHOST}
            type={BUTTON_TYPES.BUTTON}
            className={styles.recoveryLink}
            onClick={() => router.push(ROUTES.MFA.RECOVERY_CODES)}
          >
            {TEXTS.RECOVERY.BUTTON}
          </Button>{' '}
          : {TEXTS.RECOVERY.DESCRIPTION}
        </p>
      </div>
    </div>
  )
}
