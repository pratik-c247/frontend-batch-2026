'use client'
import { useRouter } from 'next/navigation'
import styles from './MfaSetup.module.scss'
import { AuthenticatorIcon } from '@/assets/icons/AuthenticatorIcon'
import { EmailIcon } from '@/assets/icons/EmailIcon'
import { SmsIcon } from '@/assets/icons/SmsIcon'
import { ROUTES } from '@/constant/routes'
import { Button } from '@/components/common/Button'
import { VARIANTS } from '@/constant/common'
import { BUTTON_NAMES } from '@/constant/buttonNames'
import { AUTH_TEXTS } from '../auth.constant'

const mfaMethods = [
  {
    id: 'authenticator',
    icon: <AuthenticatorIcon />,
    label: 'Authenticator App',
    recommended: true,
    description: 'Use an authenticator app to generate a one-time code.',
    route: ROUTES.MFA.AUTHENTICATOR_SETUP,
  },
  {
    id: 'email',
    icon: <EmailIcon />,
    label: 'Email',
    recommended: false,
    description: 'Use email to generate a one-time code.',
    route: ROUTES.MFA.EMAIL_SETUP,
  },
  {
    id: 'sms',
    icon: <SmsIcon />,
    label: 'SMS/Text Message',
    recommended: false,
    description: 'Use a mobile number to generate a one-time code.',
    route: ROUTES.MFA.SMS_SETUP,
  },
]

export const MfaSetup = () => {
  const router = useRouter()

  return (
    <div>
      <Button
        variant={VARIANTS.GHOST}
        className={styles.goBack}
        onClick={() => router.back()}
      >
        {BUTTON_NAMES.GO_BACK}
      </Button>

      <div className={styles.mfaContainer}>
        <div className={styles.header}>
          <h4 className={styles.title}>{AUTH_TEXTS.SETUP_MFA.TITLE}</h4>
          <p className={styles.subtitle}>
            {AUTH_TEXTS.SETUP_MFA.WE_HIGHLY_RECOMMEND_ADDING}
          </p>
        </div>

        <div className={styles.alert}>
          {AUTH_TEXTS.SETUP_MFA.AT_LEAST_ONE_METHOD_REQUIRED}
        </div>

        <div className={styles.methodList}>
          {mfaMethods.map((method) => (
            <div key={method.id} className={styles.methodCard}>
              <div className={styles.methodLeft}>
                <span className={styles.methodIcon}>{method.icon}</span>
                <div className={styles.methodInfo}>
                  <div className={styles.methodLabelRow}>
                    <span className={styles.methodLabel}>{method.label}</span>
                    {method.recommended && (
                      <span className={styles.recommendedBadge}>
                        {AUTH_TEXTS.SETUP_MFA.RECOMMENDED}
                      </span>
                    )}
                  </div>
                  <p className={styles.methodDescription}>
                    {method.description}
                  </p>
                </div>
              </div>
              <Button
                variant={VARIANTS.OUTLINE}
                className={styles.setupButton}
                onClick={() => router.push(method.route)}
              >
                {BUTTON_NAMES.SETUP}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
